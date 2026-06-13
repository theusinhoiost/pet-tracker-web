"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Calendar } from "./calendar";
import clsx from "clsx";

type BirthPickerProps = {
  defaultValue?: string;
};

export function BirthPicker({ defaultValue }: BirthPickerProps) {
  const [open, setOpen] = React.useState(false);

  const [date, setDate] = React.useState<Date | undefined>(() => {
    if (defaultValue) {
      const parsedDate = new Date(defaultValue);

      if (!isNaN(parsedDate.getTime())) {
        return parsedDate;
      }
    }

    return new Date();
  });

  return (
    <Field className="mx-auto w-44">
      <FieldLabel htmlFor="date">Data de nascimento</FieldLabel>

      <input
        type="hidden"
        name="birthDate"
        value={date ? date.toISOString() : ""}
      />

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className={clsx(
              "justify-start",
              !date && "text-muted-foreground hover:text-muted-foreground",
            )}
          >
            {date ? date.toLocaleDateString("pt-BR") : "Selecione uma data"}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            defaultMonth={date}
            captionLayout="dropdown"
            onSelect={(selectedDate) => {
              setDate(selectedDate);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </Field>
  );
}
