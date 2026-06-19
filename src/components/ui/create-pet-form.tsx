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
} from "./select";
import { BirthPicker } from "./birth-picker";
import PetImageUploader from "./petimageuploader";
import { Button } from "./button";
import { useActionState } from "react";
import { createPetAction } from "@/actions/create-pet-action";
import { PublicPetDto } from "@/types/zod/create-pet";

const initialState = {
  pet: {
    name: "",
    birthDate: "",
    race: "",
    species: "dog" as const,
    image: "Default",
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
                  defaultValue={state.pet?.name} // Mantém o valor caso falhe a validação
                />
              </Field>

              {/* CAMPO: ESPÉCIE */}
              <Field>
                <FieldLabel htmlFor="species">Espécie</FieldLabel>
                {/* Garantido o atributo name no Select para o FormData capturar o valor */}
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
                      <SelectItem value="others">Outro</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>

              {/* CAMPO: DATA DE NASCIMENTO */}
              <Field>
                <BirthPicker defaultValue={state.pet.birthDate} />
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
