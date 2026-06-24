import { Users } from "./user.schema.js";
import type { User } from "./user.types.js";

const findOne = async (email: string) => await Users.findOne({ where: { email } });

const add = (user: Omit<User, "id">) => Users.create(user);

const update = (id: string, user: Omit<Partial<User>, "id">) => Users.update(user as any, { where: { id } });

const findAll = () => Users.findAll();

export default{
    findOne,
    add,
    update,
    findAll
}