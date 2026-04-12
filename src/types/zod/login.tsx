import { z } from "zod";

const phoneRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;

export const loginSchema = z.object({
  login: z
    .string()
    .min(1, "Informe email ou telefone")
    .refine((value) => {
      const isEmail = z.email().safeParse(value).success;
      const isPhone = phoneRegex.test(value);
      return isEmail || isPhone;
    }, "Informe um email ou telefone válido"),

  password: z.string("Senha inválida"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
