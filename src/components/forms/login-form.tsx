"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import { useActionState, useState } from "react";
import { loginAction } from "@/actions/auth/auth-action";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

const initialState = {
  user: null,
  errors: [],
  success: false,
};

export function LoginForm() {
  const [state, action, isPending] = useActionState(loginAction, initialState);

  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Bem-vindo de volta</CardTitle>

          <CardDescription>Entre na sua conta</CardDescription>
        </CardHeader>

        <CardContent>
          <form action={action}>
            <FieldGroup>
              <Field>
                <Button
                  variant="outline"
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={isPending}
                  className="w-full"
                >
                  <FcGoogle />
                  Entrar com Google
                </Button>
              </Field>

              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Ou entrar com
              </FieldSeparator>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>

                <Input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  disabled={isPending}
                  defaultValue={state.user?.email ?? ""}
                />
              </Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Senha</FieldLabel>

                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Esqueceu a sua senha?
                  </a>
                </div>

                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="pr-12"
                    disabled={isPending}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
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
                  {isPending ? "Logando..." : "Login"}
                </Button>

                <FieldDescription className="text-center">
                  Não tem conta? <a href="/signup">Crie uma</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center">
        Ao criar a conta você concorda com nosso{" "}
        <a href="#">Termo de Serviço</a> e{" "}
        <a href="#">Política de privacidade</a>.
      </FieldDescription>
    </div>
  );
}
