import { z } from "zod";

export const NotificationSchema = z.object({
  id: z.uuid(),
  userId: z.string().uuid(),
  petId: z.string().uuid().nullable(),
  type: z.string(),
  title: z.string(),
  message: z.string(),
  referenceId: z.string().uuid().nullable(),
  read: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type NotificationDto = z.infer<typeof NotificationSchema>;
