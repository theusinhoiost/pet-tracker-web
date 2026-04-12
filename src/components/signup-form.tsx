import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signupSchema } from "@/types/zod/signup";
import z from "zod";

type FormData = z.infer<typeof signupSchema>;

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signupSchema),
  });

  function onSubmit(data: FormData) {
    console.log(data);
  }

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Crie sua conta</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Preencha os campos abaixo para criar sua conta
          </p>
        </div>
        <Field>
          <FieldLabel>Nome completo</FieldLabel>
          <Input {...register("name")} />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </Field>
        <Field>
          <FieldLabel>Celular</FieldLabel>
          <Input {...register("phone")} placeholder="(11) 91234-5678" />
          {errors.phone && (
            <p className="text-red-500">{errors.phone.message}</p>
          )}
        </Field>
        <Field>
          <FieldLabel>Email</FieldLabel>
          <Input {...register("email")} type="email" />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </Field>
        <Field>
          <FieldLabel>Senha</FieldLabel>
          <Input {...register("password")} type="password" />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </Field>

        <Field>
          <FieldLabel>Confirmar Senha</FieldLabel>
          <Input {...register("confirmPassword")} type="password" />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
        </Field>

        <Field>
          <Button type="submit">Criar Conta</Button>
        </Field>
        <FieldSeparator>Ou continue com</FieldSeparator>
        <Field>
          <Button variant="outline" type="button">
            <svg viewBox="0 0 48 48">
              <path
                fill="#FFC107"
                d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C33.9 6.1 29.2 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c10 0 19-7.3 19-20 0-1.3-.1-2.3-.4-3.5z"
              />
              <path
                fill="#FF3D00"
                d="M6.3 14.7l6.6 4.8C14.7 16.1 19 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C33.9 6.1 29.2 4 24 4c-7.7 0-14.4 4.4-17.7 10.7z"
              />
              <path
                fill="#4CAF50"
                d="M24 44c5.2 0 9.9-2 13.5-5.2l-6.2-5.1C29.2 35.7 26.7 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.6 5.1C9.6 39.5 16.3 44 24 44z"
              />
              <path
                fill="#1976D2"
                d="M43.6 20.5H42V20H24v8h11.3c-1 2.7-3 4.9-5.7 6.3l6.2 5.1C39.6 36.2 43 30.7 43 24c0-1.3-.1-2.3-.4-3.5z"
              />
            </svg>
            Registar-se com Google
          </Button>
          <FieldDescription className="px-6 text-center">
            Já tem uma conta? <a href="/login">Login</a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
