import type { Transaction } from "sequelize";
import { Tasks } from "./task.schema.js";
import type { Task } from "./task.types.js";

const add = (task: Omit<Task, "id">, transaction?: Transaction) =>
  Tasks.create(task, transaction ? { transaction } : {});

const findById = (id: string) => Tasks.findOne({ where: { id } });

const findByJourneyId = (journeyId: string) =>
  Tasks.findAll({ where: { journeyId } });

const findAll = () => Tasks.findAll();

const update = (id: string, data: Omit<Partial<Task>, "id">) =>
  Tasks.update(data as any, { where: { id } });

const remove = (id: string) => Tasks.destroy({ where: { id } });

export default {
  add,
  findById,
  findByJourneyId,
  findAll,
  update,
  remove,
};
