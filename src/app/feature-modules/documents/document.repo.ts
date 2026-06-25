import { Documents } from "./document.schema.js";
import type { Document } from "./document.types.js";

const add = (data: Omit<Document, "id">) => Documents.create(data);

export default{
    add
}