import z from "zod";

export const ZApproval = z.object({
  id: z.string().uuid().optional(),
  taskId: z.string().uuid(),
  approverId: z.string().uuid(),
  status: z.enum(["PENDING", "APPROVED", "REJECTED"]),
  comments: z.string().nullable().optional(),
  actionAt: z.date().nullable().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  createdBy: z.string().uuid().optional(),
  updatedBy: z.string().uuid().optional(),
});


export const ZApprovalCreate = z.object({
  taskId: z.string().uuid(),
  approverId: z.string().uuid(),
});


export type Approval = z.infer<typeof ZApproval>;
