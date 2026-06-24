import z, { email } from "zod";

export const ZUserCreate = z.object({
  email: z.string().min(1),
  role: z.string().min(1),
  manager_id: z.string().min(1),
});

export const ZUser = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(5),
  role: z.string(),
  manager_id: z.string().min(1),
  password_version: z.number(),
  isActive: z.boolean(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  createdBy: z.string().optional(),
  updatedBy: z.string().optional(),
});

export type User = z.infer<typeof ZUser>;
