"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
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
import { createVaccineAction } from "@/actions/vaccines/vaccines-action";

export function AddVaccineDialog({ petId }: { petId: string }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      formData.append("petId", petId);

      const result = await createVaccineAction(formData);

      if (!result.success) {
        toast.error(result.errors?.[0] || "Erro ao registrar vacina");
        return;
      }

      toast.success("Vacina registrada com sucesso! 💉");
      router.refresh();
      setOpen(false);
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2">
          <LuPlus className="h-4 w-4" />
          Adicionar Vacina
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <LuSyringe className="h-5 w-5 text-primary" />
            Nova Vacina
          </DialogTitle>
        </DialogHeader>

        <form action={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="name">Nome da Vacina</Label>
            <Input
              id="vaccineName"
              name="vaccineName"
              placeholder="Ex: V10, Antirrábica, Gripe..."
              required
              disabled={isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="applicationDate">Data de Aplicação</Label>
            <Input
              id="applicationDate"
              name="applicationDate"
              type="date"
              defaultValue={new Date().toISOString().split("T")[0]}
              required
              disabled={isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nextDueDate">Próxima Dose (opcional)</Label>
            <Input
              id="nextDueDate"
              name="nextDueDate"
              type="date"
              disabled={isPending}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Salvando..." : "Salvar registro"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
