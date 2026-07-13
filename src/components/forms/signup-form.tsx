"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import { useActionState, useEffect, useState } from "react";
import { createUserAction } from "@/actions/user/create-user-action";
import { EyeOff, Eye } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { redirect } from "next/navigation";
const initialState = {
  user: {
    name: "",
    email: "",
    phone: "",
  },
  errors: [],
  success: false,
};
export function SignupForm() {
  const [state, action, isPending] = useActionState(
    createUserAction,
    initialState,
  );
  useEffect(() => {
    if (state.success) {
      redirect("/dashboard");
    }
  }, [state.success]);
  const [showPassword, setShowPassword] = useState(false);
  return (
    <form action={action} className="flex flex-col gap-6">
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Crie sua conta</h1>
          <p className="text-sm text-muted-foreground">
            Preencha os campos abaixo para criar sua conta
          </p>
        </div>

        <Field>
          <FieldLabel>Nome completo</FieldLabel>
          <Input
            type="text"
            name="name"
            placeholder="Seu nome"
            disabled={isPending}
            defaultValue={state.user?.name}
          />
        </Field>

        <Field>
          <FieldLabel>Celular</FieldLabel>
          <Input
            name="phone"
            placeholder="(11) 91234-5678"
            disabled={isPending}
            defaultValue={state.user?.phone}
            onChange={(e) => {
              let value = e.target.value.replace(/\D/g, "");

              if (value.length > 11) value = value.slice(0, 11);

              if (value.length > 6) {
                value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
              } else if (value.length > 2) {
                value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
              }

              e.target.value = value;
            }}
          />
        </Field>

        <Field>
          <FieldLabel>Email</FieldLabel>
          <Input
            name="email"
            type="email"
            disabled={isPending}
            defaultValue={state.user?.email}
          />
        </Field>

        <Field>
          <FieldLabel>Senha</FieldLabel>
          <div className="relative">
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              className="pr-12"
              disabled={isPending}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </Field>

        <Field>
          <FieldLabel>Confirmar Senha</FieldLabel>
          <Input
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            disabled={isPending}
          />
        </Field>

        <Field>
          {state.errors.length > 0 && (
            <Card>
              <CardContent>
                {state.errors.map((err, i) => (
                  <p key={i} className="pb-2 text-destructive">
                    {err}.
                  </p>
                ))}
              </CardContent>
            </Card>
          )}
          <Button type="submit" disabled={isPending}>
            {isPending ? "Criando..." : "Criar Conta"}
          </Button>
        </Field>

        <FieldSeparator>Ou continue com</FieldSeparator>

        <Field>
          <Button variant="outline" type="button">
            Registrar-se com Google
            <FcGoogle />
          </Button>

          <FieldDescription className="px-6 text-center">
            Já tem uma conta? <a href="/login">Login</a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
