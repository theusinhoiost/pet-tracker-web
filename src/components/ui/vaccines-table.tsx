"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Syringe,
  Trash2,
} from "lucide-react";
import { AddVaccineDialog } from "./add-vaccine-dialog";

export interface Vaccine {
  id: string; // ← id da vacina, não petId
  name: string;
  applicationDate: Date;
  nextDueDate?: Date;
  status: "APPLIED" | "PENDING" | "OVERDUE";
}

interface VaccinesTableProps {
  petId: string;
  vaccines: Vaccine[];
  onDelete?: (id: string) => void;
}

function formatDate(date?: Date | string | null) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function VaccinesTable({
  petId,
  vaccines,
  onDelete,
}: VaccinesTableProps) {
  const getStatusBadge = (status: Vaccine["status"]) => {
    switch (status) {
      case "APPLIED":
        return (
          <Badge className="bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/25 border-emerald-500/30 gap-1">
            <CheckCircle2 className="h-3.5 w-3.5" /> Aplicada
          </Badge>
        );
      case "PENDING":
        return (
          <Badge className="bg-amber-500/15 text-amber-600 hover:bg-amber-500/25 border-amber-500/30 gap-1">
            <Clock className="h-3.5 w-3.5" /> Agendada
          </Badge>
        );
      case "OVERDUE":
        return (
          <Badge className="bg-rose-500/15 text-rose-600 hover:bg-rose-500/25 border-rose-500/30 gap-1">
            <AlertCircle className="h-3.5 w-3.5" /> Atrasada
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-3">
      {/* Header com título + botão */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          Histórico de Vacinas
        </h3>
        <AddVaccineDialog petId={petId} />
      </div>

      {!vaccines || vaccines.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 rounded-xl border border-dashed border-border/60 text-center bg-muted/10">
          <Syringe className="h-10 w-10 text-muted-foreground/50 mb-2" />
          <p className="text-sm text-muted-foreground font-medium">
            Nenhuma vacina registrada para este pet ainda.
          </p>
        </div>
      ) : (
        <div className="rounded-xl border border-border/50 bg-card overflow-hidden shadow-sm">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="w-50">Vacina / Dose</TableHead>
                <TableHead>Data de Aplicação</TableHead>
                <TableHead>Próxima Dose</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vaccines.map((vaccine) => (
                <TableRow key={vaccine.id}>
                  <TableCell className="font-semibold text-foreground flex items-center gap-2">
                    <Syringe className="h-4 w-4 text-primary" />
                    {vaccine.name}
                  </TableCell>
                  <TableCell>{formatDate(vaccine.applicationDate)}</TableCell>
                  <TableCell className="font-mono text-xs">
                    {formatDate(vaccine.nextDueDate)}
                  </TableCell>
                  <TableCell>{getStatusBadge(vaccine.status)}</TableCell>
                  <TableCell className="text-right">
                    {onDelete && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => onDelete(vaccine.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
