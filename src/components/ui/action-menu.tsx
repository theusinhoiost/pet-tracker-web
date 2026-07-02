"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, Pencil, Trash2Icon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";

interface ActionsMenuProps {
  onEdit: () => void;
  onDelete?: () => void;
  itemName?: string;
}

export function ActionsMenu({
  onEdit,
  onDelete,
  itemName = "pet",
}: ActionsMenuProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            <EllipsisVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem onClick={onEdit} className="cursor-pointer">
            <Pencil className="mr-2 h-4 w-4" />
            Editar
          </DropdownMenuItem>
          {onDelete && (
            <DropdownMenuItem
              onClick={() => setShowDeleteDialog(true)}
              className="cursor-pointer text-destructive focus:text-destructive"
              variant="destructive"
            >
              <Trash2Icon className="mr-2 h-4 w-4 " />
              Excluir
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {onDelete && (
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar exclusão</DialogTitle>
              <DialogDescription>
                Apaga o {itemName} selecionado.
              </DialogDescription>
              <DialogDescription>
                Tem certeza que deseja excluir este {itemName}? Esta ação não
                pode ser desfeita.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowDeleteDialog(false)}
              >
                Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  onDelete();
                  setShowDeleteDialog(false);
                }}
              >
                Sim, excluir
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
