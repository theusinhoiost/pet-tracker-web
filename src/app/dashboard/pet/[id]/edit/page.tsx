"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { updatePet } from "@/actions/pets/update-pet-action";

interface PetForm {
  name: string;
  photo: string;
}

export default function EditPetPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [pet, setPet] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<PetForm>({
    name: "",
    photo: "",
  });

  // Carregar dados do pet
  useEffect(() => {
    async function loadPet() {
      try {
        const data = await getPetById(params.id);
        setPet(data);
        setForm({
          name: data.name || "",
          race: data.race || "",
          species: data.species || "",
          birthDate: data.birthDate ? data.birthDate.split("T")[0] : "",
          notes: data.notes || "",
        });
      } catch (error) {
        toast.error("Erro ao carregar dados do pet");
        router.push("/dashboard");
      } finally {
        setLoading(false);
      }
    }
    loadPet();
  }, [params.id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await updatePet(params.id, form);
      toast.success("Pet atualizado com sucesso!");
      router.push(`/dashboard/pet/${params.id}`);
      router.refresh();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Erro ao atualizar o pet");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-100">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <Button
        variant="ghost"
        className="mb-6 flex items-center gap-2"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-3">
            Editar Pet
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nome do Pet</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="race">Raça</Label>
                <Input
                  id="race"
                  value={form.race}
                  onChange={(e) => setForm({ ...form, race: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => router.back()}
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
