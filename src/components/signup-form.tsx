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
import { useActionState } from "react";
import { createUserAction } from "@/actions/create-user-action";

export function SignupForm() {
  const [state, action, isPending] = useActionState(createUserAction, {
    user: {
      name: "",
      email: "",
      phone: "",
    },
    errors: [],
    success: false,
  });
  return (
    <form action={action} className="flex flex-col gap-6">
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Crie sua conta</h1>
          <p className="text-sm text-muted-foreground">
            Preencha os campos abaixo para criar sua conta
          </p>
        </div>
        {state.errors.length > 0 && (
          <div className="text-red-500 text-sm">
            {state.errors.map((err, i) => (
              <p key={i}>{err}</p>
            ))}
          </div>
        )}
        <Field>
          <FieldLabel>Nome completo</FieldLabel>
          <Input
            type="text"
            name="name"
            placeholder="Seu nome"
            disabled={isPending}
            defaultValue={state.user?.name}
            required
          />
        </Field>

        <Field>
          <FieldLabel>Celular</FieldLabel>
          <Input
            name="phone"
            placeholder="(11) 91234-5678"
            disabled={isPending}
            defaultValue={state.user?.phone}
            required
          />
        </Field>

        <Field>
          <FieldLabel>Email</FieldLabel>
          <Input
            name="email"
            type="email"
            disabled={isPending}
            defaultValue={state.user?.email}
            required
          />
        </Field>

        <Field>
          <FieldLabel>Senha</FieldLabel>
          <Input
            name="password"
            type="password"
            disabled={isPending}
            required
          />
        </Field>

        <Field>
          <FieldLabel>Confirmar Senha</FieldLabel>
          <Input
            name="confirmPassword"
            type="password"
            disabled={isPending}
            required
          />
        </Field>

        <Field>
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
