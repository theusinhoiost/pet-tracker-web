"use client";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LuSyringe, LuPawPrint, LuEye } from "react-icons/lu";
import clsx from "clsx";
import { ActionsMenu } from "./ui/action-menu";

interface PetCardProps {
  id: string;
  name: string;
  breed: string;
  nextVaccineDate: string;
  showButton?: boolean; // Opcional
  imageUrl?: string; // Opcional
}

export function PetCard({
  id,
  name,
  breed,
  nextVaccineDate,
  imageUrl,
  showButton = true,
}: PetCardProps) {
  const initials = name.substring(0, 2).toUpperCase();

  return (
    <Card className="bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-300 border-border/50 group overflow-hidden">
      <CardHeader className="p-5 flex flex-row items-center gap-4 space-y-0 border-b border-border/50 bg-muted/20">
        <Avatar className="h-12 w-12 border-2 border-primary/20 group-hover:border-primary transition-colors">
          {imageUrl && (
            <AvatarImage src={imageUrl} alt={name} className="object-cover" />
          )}
          <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <CardTitle className="text-xl font-bold tracking-tight truncate group-hover:text-primary transition-colors">
            {name}
          </CardTitle>
          <p className="text-sm text-muted-foreground truncate flex items-center gap-1.5">
            <LuPawPrint className="h-3.5 w-3.5" />
            {breed}
          </p>
        </div>

        <ActionsMenu
          onEdit={() => console.log("Editar")}
          onDelete={() => console.log("Excluindo...")}
          itemName="animal"
        />
      </CardHeader>

      <CardContent className="p-5">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-2 p-3 rounded-lg bg-muted dark:bg-muted/50 border border-border/50">
            <div className="flex items-center gap-2.5 text-sm text-foreground/90 font-medium">
              <LuSyringe className="h-5 w-5 text-primary" />
              <span>Próxima Vacina:</span>
            </div>
            <Badge
              variant="outline"
              className={clsx(
                "font-mono text-md bg-primary text-primary-foreground",
                "hover:text-foreground hover:transform hover:bg-primary/30",
              )}
            >
              {nextVaccineDate}
            </Badge>
          </div>
          {showButton && (
            <Button
              size="sm"
              variant="outline"
              className="w-full gap-2 group-hover:border-primary/50 group-hover:bg-primary/5 transition-all"
              asChild
            >
              <Link href={`/dashboard/pet/${id}`}>
                <LuEye className="h-4 w-4 text-primary" />
                Ver Ficha Completa
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
