"use client";

import Link from "next/link";
import { LuPawPrint } from "react-icons/lu";
import { CreatePetForm } from "@/components/forms/create-pet-form";
import Footer from "@/components/ui/footer";

export default function PetAddPage() {
  return (
    <div className="flex justify-center ">
      {/* LEFT */}
      <div className="flex flex-col justify-between p-6 md:p-10 gap-3">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <LuPawPrint className="size-5" />
            </div>
            <span className="text-lg font-semibold">PetTracker</span>
          </Link>

          <Link
            href="/dashboard"
            className="text-sm text-muted-foreground hover:underline"
          >
            Voltar
          </Link>
        </div>

        {/* CONTENT */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm space-y-6">
            <div className="space-y-2 text-center md:text-left">
              <h1 className="text-2xl font-bold">Cadastrar novo pet</h1>
              <p className="text-sm text-muted-foreground">
                Adicione as informações do seu pet para começar o monitoramento.
              </p>
            </div>

            <CreatePetForm />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
