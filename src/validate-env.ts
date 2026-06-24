import z from "zod";

const envSchema = z.object({
    PORT: z.coerce.number({message: 'PORT must be a number'}),
    DB_NAME: z.string().min(1),  
    DB_USERNAME: z.string().min(1),  
    DB_PASSWORD: z.string().min(1),  
    });

export const env = envSchema.parse(process.env);