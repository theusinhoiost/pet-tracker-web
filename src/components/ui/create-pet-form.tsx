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

export function CreatePetForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Nome</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="Bob Junior"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="name">Espécie</FieldLabel>
                <Select>
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
              <Field>
                <BirthPicker></BirthPicker>
              </Field>
              <Field>
                <FieldLabel htmlFor="name">Raça</FieldLabel>
                <Input id="race" type="text" placeholder="Labrador" required />
              </Field>
              <Field>
                <PetImageUploader />
              </Field>
              <Button>Criar o pet</Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
