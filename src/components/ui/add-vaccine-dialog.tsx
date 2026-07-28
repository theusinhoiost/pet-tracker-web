"use client";

import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LuPlus, LuSyringe } from "react-icons/lu";
import { toast } from "sonner";

interface AddVaccineDialogProps {
  petId: string;
  onSuccess?: () => void;
}

export function AddVaccineDialog({ petId, onSuccess }: AddVaccineDialogProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      // Exemplo de chamada para sua Server Action:
      // const result = await addVaccineAction(petId, formData);

      // Simulação de sucesso (remova isso quando implementar a action real)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const result = { success: true };

      if (!result.success) {
        // toast.error(result.errors[0] || "Erro ao registrar vacina.");
        toast.error("Erro ao registrar vacina (Simulação).");
        return;
      }

      toast.success("Vacina registrada com sucesso! 💉");
      setOpen(false); // Fecha o modal após salvar
      if (onSuccess) onSuccess(); // Chama o callback de sucesso, se fornecido
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2">
          <LuPlus className="h-4 w-4" /> Nova Vacina
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <LuSyringe className="h-5 w-5 text-primary" /> Registrar Nova Vacina
          </DialogTitle>
        </DialogHeader>

        <form action={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="vaccineName">Nome da Vacina / Dose</Label>
            <Input
              id="vaccineName"
              name="vaccineName"
              type="text"
              placeholder="Ex: Raiva - Dose 1"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="applicationDate">Data de Aplicação</Label>
              <Input
                id="applicationDate"
                name="applicationDate"
                type="date"
                defaultValue={new Date().toISOString().split("T")[0]}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nextDueDate">Próxima Dose (Opcional)</Label>
              <Input id="nextDueDate" name="nextDueDate" type="date" />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Salvando..." : "Salvar Vacina"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
