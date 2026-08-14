import { z } from "zod";

export const LoginBaseSchema = z.object({
  email: z.email("Email inválido"),
  password: z.string(),
});

export const CreateLoginSchema = LoginBaseSchema;

export const PublicLoginSchema = z.object({
  email: z.email().default(""),
  password: z.string().default(""),
});

export const LoginResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  user: z.object({
    id: z.string(),
    name: z.string(),
    email: z.email(),
  }),
});

export type CreateLoginDto = z.infer<typeof CreateLoginSchema>;
export type PublicLoginDto = z.infer<typeof PublicLoginSchema>;
export type LoginResponseDto = z.infer<typeof LoginResponseSchema>;
