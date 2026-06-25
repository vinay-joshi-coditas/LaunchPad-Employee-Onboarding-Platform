import { Approvals } from "./approval.schema.js";
import type { Approval } from "./approval.types.js";

const add = (approval: Omit<Approval, "id">) =>
  Approvals.create(approval as any);

const findByTaskId = (taskId: string) =>
  Approvals.findOne({ where: { taskId } });

export default{
    add,
    findByTaskId
}