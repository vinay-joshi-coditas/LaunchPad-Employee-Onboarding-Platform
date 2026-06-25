export const OnboardingJourneyResponse: Record<
  | "JOURNEY_CREATED"
  | "JOURNEY_UPDATED"
  | "JOURNEY_NOT_FOUND"
  | "JOURNEY_ALREADY_EXISTS"
  | "JOURNEY_COMPLETED",
  { statusCode: number; message: string }
> = {
  JOURNEY_CREATED: {
    statusCode: 201,
    message: "Onboarding journey created successfully",
  },
  JOURNEY_UPDATED: {
    statusCode: 200,
    message: "Onboarding journey updated successfully",
  },
  JOURNEY_NOT_FOUND: {
    statusCode: 404,
    message: "Onboarding journey not found",
  },
  JOURNEY_ALREADY_EXISTS: {
    statusCode: 400,
    message: "An onboarding journey already exists for this user",
  },
  JOURNEY_COMPLETED: {
    statusCode: 200,
    message: "Onboarding journey marked as completed",
  }
};
