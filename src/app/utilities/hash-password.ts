import { genSalt, hash } from "bcryptjs"

export const hashPassword = async(password: string) => {
    try {
        const salt = await genSalt(5);
        const hashedPassword = await hash(password, salt)
        return hashedPassword;
    } catch (error) {
        throw 'could not hash'
    }
}