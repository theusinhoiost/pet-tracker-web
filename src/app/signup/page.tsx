"use client";

import { SignupForm } from "@/components/signup-form";
import { PawPrint } from "lucide-react";
import Image from "next/image";

export default function SignupPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <PawPrint className="size-4" />
            </div>
            PetTracker
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
          src="/signupdog.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.5]"
          width={300}
          height={300}
        />
      </div>
    </div>
  );
}
