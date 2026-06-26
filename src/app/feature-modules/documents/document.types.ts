import z from "zod";

export const ZDocument = z.object({
  id: z.string().optional(),
  taskId: z.string(),
  uploadedBy: z.string(),
  fileName: z.string().min(1).max(255),
  mimeType: z.string().min(1).max(100).optional(),
  fileSize: z.number().int().positive().optional(),
  s3Key: z.string().min(1).max(500),
  status: z.enum(["PENDING", "APPROVED", "REJECTED"]).optional(),
  reviewedBy: z.string().nullable().optional(),
  reviewedAt: z.date().nullable().optional(),
  rejectionReason: z.string().nullable().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  createdBy: z.string().optional(),
  updatedBy: z.string().optional(),
});

export const ZDocumentUpload = z.object({
  taskId: z.string(),
  mimeType: z.string().min(1).max(100),
});


export const ZDocumentReview = z.object({
  status: z.enum(["APPROVED", "REJECTED"]),
  rejectionReason: z.string().min(1).max(2000).optional(),
})

export type Document = z.infer<typeof ZDocument>;