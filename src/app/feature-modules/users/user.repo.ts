import { Users } from "./user.schema.js";
import type { User } from "./user.types.js";

const findOne = async (email: string) => await Users.findOne({ where: { email } });

const add = (user: Omit<User, "id">) => Users.create(user);

export default{
    findOne,
    add
}