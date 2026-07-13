"use client";

import * as React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Field, FieldLabel } from "@/components/ui/field";

type BirthPickerProps = {
  defaultValue?: string;
};

export function BirthPicker({ defaultValue }: BirthPickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(() => {
    if (defaultValue) {
      const d = new Date(defaultValue);
      if (!isNaN(d.getTime())) return d;
    }
    return new Date();
  });

  return (
    <Field>
      <FieldLabel>Data de Nascimento</FieldLabel>

      <input
        type="hidden"
        name="birthDate"
        value={date ? date.toISOString().split("T")[0] : ""}
      />

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start text-left font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date
              ? format(date, "dd/MM/yyyy", { locale: ptBR })
              : "Selecione a data"}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            defaultMonth={date}
            disabled={(date) => date > new Date()} // ← Bloqueia datas futuras no picker
          />
        </PopoverContent>
      </Popover>
    </Field>
  );
}
