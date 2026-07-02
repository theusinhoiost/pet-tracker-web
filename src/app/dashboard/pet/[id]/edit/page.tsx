"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getPetByIdAction } from "@/actions/pets/get-pet-by-id-action";
import { toast } from "sonner";
import { updatePet } from "@/actions/pets/update-pet-action";
import { Textarea } from "@/components/ui/textarea";
interface PetForm {
  name: string;
  race: string;
  species: string;
  birthDate: string;
  notes: string;
}

const speciesOptions = [
  { value: "dog", label: "Cachorro" },
  { value: "cat", label: "Gato" },
  { value: "bird", label: "Pássaro" },
  { value: "fish", label: "Peixe" },
  { value: "rabbit", label: "Coelho" },
  { value: "other", label: "Outro" },
];

export default function EditPetPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<PetForm>({
    name: "",
    race: "",
    species: "",
    birthDate: "",
    notes: "",
  });

  // Carregar dados do pet
  useEffect(() => {
    async function loadPet() {
      if (!params.id) {
        router.push("/dashboard");
        return;
      }

      try {
        const data = await getPetByIdAction(params.id);

        setForm({
          name: data.name ?? "",
          race: data.race ?? "",
          species: data.species ?? "",
          birthDate: data.birthDate ? data.birthDate.split("T")[0] : "",
          notes: data.notes ?? "",
        });
      } catch (error) {
        console.error(error);
        toast.error("Erro ao carregar dados do pet");
        router.push("/dashboard");
      } finally {
        setLoading(false);
      }
    }

    loadPet();
  }, [params.id, router]);

  // Submissão do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await updatePet(params.id, form);
      toast.success("Pet atualizado com sucesso!");
      router.push(`/dashboard/pet/${params.id}`);
      // router.refresh() não é necessário após push em app router
    } catch (error) {
      console.error(error);
      toast.error("Erro ao atualizar o pet");
    } finally {
      setSaving(false);
    }
  };

  // Estado de carregamento
  if (loading) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Carregando dados do pet...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        className="flex items-center gap-2"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Editar Pet</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Nome */}
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                />
              </div>

              {/* Raça */}
              <div className="space-y-2">
                <Label htmlFor="race">Raça</Label>
                <Input
                  id="race"
                  value={form.race}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, race: e.target.value }))
                  }
                  required
                />
              </div>

              {/* Espécie */}
              <div className="space-y-2">
                <Label htmlFor="species">Espécie</Label>
                <select
                  id="species"
                  value={form.species}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, species: e.target.value }))
                  }
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  required
                >
                  <option value="">Selecione a espécie</option>
                  {speciesOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Data de Nascimento */}
              <div className="space-y-2">
                <Label htmlFor="birthDate">Data de Nascimento</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={form.birthDate}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, birthDate: e.target.value }))
                  }
                />
              </div>
            </div>

            {/* Observações */}
            <div className="space-y-2">
              <Label htmlFor="notes">Observações</Label>
              <Textarea
                id="notes"
                value={form.notes}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, notes: e.target.value }))
                }
                placeholder="Observações sobre o pet, vacinas, comportamentos, etc."
                rows={4}
              />
            </div>

            {/* Botões */}
            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => router.back()}
                disabled={saving}
              >
                Cancelar
              </Button>

              <Button type="submit" className="flex-1" disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Salvar Alterações
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
