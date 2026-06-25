import z from "zod";

export const ZTaskCreate = z.object({
  journeyId: z.string(),
  title: z.string().min(1).max(255),
  description: z.string().optional(),
  taskType: z.enum(["DOCUMENT_UPLOAD", "FORM", "ACKNOWLEDGEMENT", "REQUEST"]),
  requiresDocument: z.boolean().default(false),
  requiresApproval: z.boolean().default(false),
  // assignedBy: z.string().optional(),
});

export const ZTaskUpdate = z.object({
  title: z.string().min(1).max(255).optional(),
  description: z.string().optional(),
  taskType: z.enum(["DOCUMENT_UPLOAD", "FORM", "ACKNOWLEDGEMENT", "REQUEST"]).optional(),
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED", "REJECTED"]).optional(),
  requiresApproval: z.boolean().optional(),
  dueDate: z.coerce.date().optional(),
  completedAt: z.coerce.date().nullable().optional(),
});

export const ZTaskStatusUpdate = z.object({
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED", "REJECTED"]),
});

export const ZTask = z.object({
  id: z.string().optional(),
  journeyId: z.string(),
  title: z.string().min(1).max(255),
  description: z.string().optional(),
  taskType: z.enum(["DOCUMENT_UPLOAD", "FORM", "ACKNOWLEDGEMENT", "REQUEST"]),
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED", "REJECTED"]),
  requiresDocument: z.boolean().default(false),
  requiresApproval: z.boolean(),
  dueDate: z.coerce.date().optional(),
  completedAt: z.coerce.date().nullable().optional(),
  assignedBy: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  createdBy: z.string().uuid().optional(),
  updatedBy: z.string().uuid().optional(),
});

export type Task = z.infer<typeof ZTask>;
