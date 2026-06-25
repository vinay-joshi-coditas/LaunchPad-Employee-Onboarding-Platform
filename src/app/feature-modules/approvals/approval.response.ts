export const ApprovalResponse: Record<
  | "APPROVAL_CREATED"
  | "APPROVAL_APPROVED"
  | "APPROVAL_REJECTED"
  | "APPROVAL_ALREADY_EXISTS",
  { statusCode: number; message: string }
> = {
  APPROVAL_CREATED: {
    statusCode: 201,
    message: "Approval request created successfully",
  },
  APPROVAL_APPROVED: {
    statusCode: 200,
    message: "Task approved successfully",
  },
  APPROVAL_REJECTED: {
    statusCode: 200,
    message: "Task rejected",
  },
    APPROVAL_ALREADY_EXISTS: {
    statusCode: 400,
    message: "An approval request already exists for this task",
  }
};
