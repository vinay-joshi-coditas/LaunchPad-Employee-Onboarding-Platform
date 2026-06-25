import taskRepo from "./task.repo.js";
import { TaskResponse } from "./task.response.js";
import type { Task } from "./task.types.js";

const create = async (data: Omit<Task, "id" | "status">, createdBy: string) => {
  try {
    await taskRepo.add({
      ...data,
      status: "PENDING",
      dueDate: new Date(),
      completedAt: null,
      createdBy,
      updatedBy: createdBy,
    });
    return TaskResponse.TASK_CREATED;
  } catch (error) {
    throw error;
  }
};

const findById = async (id: string) => {
  try {
    const task = await taskRepo.findById(id);
    if (!task) throw TaskResponse.TASK_NOT_FOUND;
    return task;
  } catch (error) {
    throw error;
  }
};

const findByJourneyId = async (journeyId: string) => {
  try {
    return await taskRepo.findByJourneyId(journeyId);
  } catch (error) {
    throw error;
  }
};

const findAll = () => taskRepo.findAll();

const update = async (
  id: string,
  data: Omit<Partial<Task>, "id">,
  updatedBy: string,
) => {
  try {
    const task = await taskRepo.findById(id);
    if (!task) throw TaskResponse.TASK_NOT_FOUND;

    await taskRepo.update(id, { ...data, updatedBy });
    return TaskResponse.TASK_UPDATED;
  } catch (error) {
    throw error;
  }
};

const updateStatus = async (
  id: string,
  status: Task["status"],
  updatedBy: string,
) => {
  try {
    const task = await taskRepo.findById(id);
    if (!task) throw TaskResponse.TASK_NOT_FOUND;

    const patch: Partial<Task> = { status, updatedBy };

    if (status === "COMPLETED") {
      patch.completedAt = new Date();
      await taskRepo.update(id, patch);
      return TaskResponse.TASK_COMPLETED;
    }

    if (status === "REJECTED") {
      await taskRepo.update(id, patch);
      return TaskResponse.TASK_REJECTED;
    }

    await taskRepo.update(id, patch);
    return TaskResponse.TASK_UPDATED;
  } catch (error) {
    throw error;
  }
};

const remove = async (id: string) => {
  try {
    const task = await taskRepo.findById(id);
    if (!task) throw TaskResponse.TASK_NOT_FOUND;

    await taskRepo.remove(id);
    return TaskResponse.TASK_DELETED;
  } catch (error) {
    throw error;
  }
};

export default {
  create,
  findById,
  findByJourneyId,
  findAll,
  update,
  updateStatus,
  remove,
};
