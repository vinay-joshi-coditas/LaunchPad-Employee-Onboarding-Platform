import z from "zod";

export const ZOnboardingJourneyCreate = z.object({
  newHireId: z.string(),
  startDate: z.coerce.date().optional()
});

export const ZOnboardingJourneyUpdate = z.object({
  status: z.enum(["Pending", "InProgress", "Completed"]).optional(),
  startDate: z.coerce.date().optional(),
  completedAt: z.coerce.date().nullable().optional(),
  updatedBy: z.string().optional(),
});

export const ZOnboardingJourney = z.object({
  id: z.string().optional(),
  newHireId: z.string().uuid(),
  status: z.enum(["Pending", "InProgress", "Completed"]),
  startDate: z.coerce.date().optional(),
  completedAt: z.coerce.date().nullable().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  createdBy: z.string().optional(),
  updatedBy: z.string().uuid().optional(),
});

export type OnboardingJourney = z.infer<typeof ZOnboardingJourney>;
