import { Documents } from "./document.schema.js";
import type { Document } from "./document.types.js";

const add = (data: Omit<Document, "id">) => Documents.create(data);

const findAll = () => Documents.findAll();

const findByUploadedBy = (uploadedBy: string) =>
  Documents.findAll({ where: { uploadedBy } });

const findById = (id: string) =>
  Documents.findOne({ where: { id } });


const findByTaskId = (taskId: string) =>
  Documents.findAll({ where: { taskId } });


const update = (id: string, data: Omit<Partial<Document>, "id">) =>
  Documents.update(data as any, { where: { id } });

export default{
    add,
    findAll,
    findByTaskId,
    findByUploadedBy,
    update,
    findById
}