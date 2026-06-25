export const TaskResponse: Record<
  | "TASK_CREATED"
  | "TASK_UPDATED"
  | "TASK_NOT_FOUND"
  | "TASK_COMPLETED"
  | "TASK_REJECTED"
  | "TASK_DELETED",
  { statusCode: number; message: string }
> = {
  TASK_CREATED: {
    statusCode: 201,
    message: "Task created successfully",
  },
  TASK_UPDATED: {
    statusCode: 200,
    message: "Task updated successfully",
  },
  TASK_NOT_FOUND: {
    statusCode: 404,
    message: "Task not found",
  },
  TASK_COMPLETED: {
    statusCode: 200,
    message: "Task marked as completed",
  },
  TASK_REJECTED: {
    statusCode: 200,
    message: "Task rejected",
  },
  TASK_DELETED: {
    statusCode: 200,
    message: "Task deleted successfully",
  },
};
