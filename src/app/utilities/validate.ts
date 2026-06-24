import type { Request, Response, NextFunction } from "express"
import type { ZodObject } from "zod"



export const check = (type: 'body' | 'params' | 'query') => {
    return (schema: ZodObject) => {
        return (req: Request, res: Response, next: NextFunction) => {
            try{
                console.log(req.body);
                
                req[type] = schema.parse(req[type]);
            next();
        }
        catch(err){
            next({statusCode: 400, message: 'BAD REQUEST', error: err})
        }
        }
    }
}

export const body = check("body");
