"use client";

import { useTransition, useState } from "react";
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
import { LuPlus, LuScale } from "react-icons/lu";
import { toast } from "sonner";
import { createWeightAction } from "@/actions/weight/weight";
import { useRouter } from "next/navigation";
export function AddWeightDialog({ petId }: { petId: string }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      formData.append("petId", petId);

      const result = await createWeightAction(formData);

      if (!result.success) {
        toast.error(result.errors?.[0] || "Erro ao registrar peso");
        return;
      }

      toast.success("Peso registrado com sucesso! ⚖️");
      router.refresh();
      setOpen(false);
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2">
          <LuPlus className="h-4 w-4" />
          Registrar Peso
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <LuScale className="h-5 w-5 text-primary" />
            Novo Peso
          </DialogTitle>
        </DialogHeader>

        <form action={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="value">Peso (kg)</Label>
            <Input
              id="value"
              name="value"
              type="number"
              min={0.1}
              step="0.1"
              placeholder="Ex.: 12.5"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="measurementDay">Data da pesagem</Label>
            <Input
              id="measurementDay"
              name="measurementDay"
              type="date"
              defaultValue={new Date().toISOString().split("T")[0]}
              required
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
