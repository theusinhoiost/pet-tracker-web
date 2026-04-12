import { z } from "zod";

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(3, "Nome deve ter pelo menos 3 caracteres")
      .max(100, "Nome muito longo"),

    phone: z
      .string()
      .min(10, "Telefone inválido")
      .max(15, "Telefone inválido")
      .regex(
        /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/,
        "Formato inválido. Ex: (11) 91234-5678",
      ),

    email: z.email("Email inválido"),

    password: z
      .string()
      .min(6, "Senha deve ter no mínimo 6 caracteres")
      .max(32, "Senha deve ter no máximo 32 caracteres")
      .regex(/[A-Z]/, "Precisa de uma letra maiúscula")
      .regex(/[0-9]/, "Precisa de um número")
      .regex(/[^A-Za-z0-9]/, "Precisa de um símbolo especial"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type SignupSchema = z.infer<typeof signupSchema>;
