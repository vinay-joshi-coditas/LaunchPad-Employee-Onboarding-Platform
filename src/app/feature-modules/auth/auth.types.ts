import { ZUser } from "../users/user.types.js";

export const ZUserLogin = ZUser.pick({email: true , password: true});