import { cn } from "@/lib/utils";

import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { BirthPicker } from "../ui/birth-picker";
import { Button } from "../ui/button";
import { useActionState, useEffect } from "react";
import { createPetAction } from "@/actions/pets/create-pet-action";
import { PublicPetDto } from "@/types/zod/pets";
import { PetImageUploader } from "../ui/petImageUploader";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { Textarea } from "../ui/textarea";

const initialState = {
  pet: {
    name: "",
    birthDate: "",
    race: "",
    species: "dog" as const,
    imageUrl: null,
    notes: "",
  } as PublicPetDto,
  errors: [],
  success: false,
};

export function CreatePetForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [state, formAction, isPending] = useActionState(
    createPetAction,
    initialState,
  );
  useEffect(() => {
    if (state.success) {
      toast.dismiss();
      toast.success("Pet adicionado com sucesso", {
        position: "bottom-center",
      });
      redirect("/dashboard");
    }
  }, [state.success]);
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardContent>
          <form action={formAction} className="pt-6">
            <FieldGroup>
              {/* CAMPO: NOME */}
              <Field>
                <FieldLabel htmlFor="name">Nome</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Bob Junior"
                  defaultValue={state.pet?.name}
                />
              </Field>
              {/* CAMPO: ESPÉCIE */}
              <Field>
                <FieldLabel htmlFor="species">Espécie</FieldLabel>
                <Select
                  name="species"
                  defaultValue={state.pet?.species || "dog"}
                >
                  <SelectTrigger className="w-45">
                    <SelectValue placeholder="Espécie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Espécie:</SelectLabel>
                      <SelectItem value="dog">Cachorro</SelectItem>
                      <SelectItem value="cat">Gato</SelectItem>
                      <SelectItem value="bird">Pássaro</SelectItem>
                      <SelectItem value="fish">Peixe</SelectItem>
                      <SelectItem value="rabbit">Coelho</SelectItem>
                      <SelectItem value="other">Outro</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>

              {/* CAMPO: DATA DE NASCIMENTO */}
              <Field>
                <BirthPicker defaultValue={state.pet?.birthDate ?? ""} />
              </Field>

              {/* CAMPO: RAÇA */}
              <Field>
                <FieldLabel htmlFor="race">Raça</FieldLabel>
                <Input
                  id="race"
                  name="race"
                  type="text"
                  placeholder="Labrador"
                  defaultValue={state.pet?.race}
                />
              </Field>
              {/* CAMPO: NOTAS */}
              <Field>
                <FieldLabel htmlFor="notes">Observações</FieldLabel>
                <Textarea
                  id="observations"
                  name="observations"
                  placeholder="Observações sobre o pet (comportamento, vacinas, alergias, histórico, etc...)"
                  defaultValue={state.pet?.notes || ""}
                  rows={4}
                  className="resize-y min-h-25"
                />
              </Field>
              {/* CAMPO: UPLOAD DE IMAGEM */}
              <Field>
                <PetImageUploader />
              </Field>

              {state.errors.length > 0 && (
                <Card>
                  <CardContent>
                    {state.errors.map((err, i) => (
                      <p key={i} className="pb-2 text-destructive">
                        {err}.
                      </p>
                    ))}
                  </CardContent>
                </Card>
              )}

              <Button type="submit" disabled={isPending}>
                {isPending ? "Criando..." : "Criar o pet"}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
