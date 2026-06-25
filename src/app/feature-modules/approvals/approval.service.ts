import approvalRepo from "./approval.repo.js";
import { ApprovalResponse } from "./approval.response.js";
import type { Approval } from "./approval.types.js";

const create = async (
  data: Pick<Approval, "taskId" | "approverId">,
  createdBy: string,
) => {
  try {
    const existing = await approvalRepo.findByTaskId(data.taskId);
    if (existing) throw ApprovalResponse.APPROVAL_ALREADY_EXISTS;

    await approvalRepo.add({
      ...data,
      status: "PENDING",
      comments: null,
      actionAt: null,
      createdBy,
      updatedBy: createdBy,
    });

    return ApprovalResponse.APPROVAL_CREATED;
  } catch (error) {
    throw error;
  }
};


export default{
    create
}