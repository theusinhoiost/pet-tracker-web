"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function PetImageUploader() {
  const [preview, setPreview] = useState<string | null>(null);

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      setPreview(null);
      return;
    }
    // Revoga URL anterior para não vazar memória
    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(file));
  }

  // Cleanup quando o componente desmontar
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div className="space-y-3">
      <FieldLabel htmlFor="pet-img">Foto do Pet</FieldLabel>

      <label
        htmlFor="pet-img"
        className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 text-center transition hover:bg-muted/50"
      >
        {preview ? (
          <div className="relative h-40 w-40 overflow-hidden rounded-lg">
            <Image
              src={preview}
              alt="Preview do pet"
              fill
              className="object-cover" // mantém proporção e cobre o espaço
            />
          </div>
        ) : (
          <>
            <p className="font-medium">Clique para selecionar uma foto</p>
            <p className="text-sm text-muted-foreground">
              PNG, JPG ou WEBP • Máx. 5MB
            </p>
          </>
        )}
      </label>

      <Input
        id="pet-img"
        name="pet-img"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />
    </div>
  );
}
