import { z } from "zod";

export const UserBaseSchema = z.object({
  name: z
    .string()
    .min(3, "Nome deve ter pelo menos 3 letras")
    .max(100, "Nome muito longo")
    .trim(),

  phone: z
    .string()
    .min(10, "Telefone inválido")
    .max(15, "Telefone inválido")
    .regex(
      /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/,
      "Formato de telefone inválido. Ex: (11) 91234-5678",
    )
    .trim(),

  email: z.email("Email inválido"),

  password: z
    .string()
    .min(6, "Senha deve ter no mínimo 6 letras")
    .max(32, "Senha deve ter no máximo 32 letras")
    .regex(/[A-Z]/, "Senha precisa de uma letra maiúscula")
    .regex(/[0-9]/, "Senha precisa de um número")
    .regex(/[^A-Za-z0-9]/, "Senha precisa de um símbolo especial"),

  confirmPassword: z.string(),
});

export const CreateUserSchema = UserBaseSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "As senhas não conferem",
    path: ["confirmPassword"],
  },
).transform(({ email, phone, name, password }) => ({
  name,
  email,
  phone,
  password,
}));

export const PublicUserSchema = z.object({
  name: z.string().default(""),
  phone: z.string().default(""),
  email: z.string().default(""),
});

export const UpdatePasswordSchema = z
  .object({
    currentPassword: z.string().trim(),
    newPassword: z
      .string()
      .trim()
      .min(6, "Nova senha precisa ter um mínimo de 6 letras")
      .max(32, "Senha deve ter no máximo 32 letras")
      .regex(/[A-Z]/, "Senha precisa de uma letra maiúscula")
      .regex(/[0-9]/, "Senha precisa de um número")
      .regex(/[^A-Za-z0-9]/, "Senha precisa de um símbolo especial"),
    confirmPassword: z
      .string()
      .trim()
      .min(6, "Nova senha precisa ter um mínimo de 6 letras")
      .max(32, "Senha deve ter no máximo 32 letras")
      .regex(/[A-Z]/, "Senha precisa de uma letra maiúscula")
      .regex(/[0-9]/, "Senha precisa de um número")
      .regex(/[^A-Za-z0-9]/, "Senha precisa de um símbolo especial"),
  })
  .refine(
    (data) => {
      return data.newPassword === data.confirmPassword;
    },
    {
      path: ["confirmPassword"],
      message: "As senhas não conferem",
    },
  )
  .transform(({ currentPassword, newPassword }) => {
    return {
      currentPassword,
      newPassword,
    };
  });

export const UpdateUserSchema = UserBaseSchema.omit({
  password: true,
  confirmPassword: true,
}).extend({});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
export type PublicUserDto = z.infer<typeof PublicUserSchema>;
export type UpdatePasswordDto = z.infer<typeof UpdatePasswordSchema>;
