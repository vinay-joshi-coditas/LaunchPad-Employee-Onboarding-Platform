import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../../utilities/jwt.js";


export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("inside auth...");
        
        const authHeader = req.headers.authorization;

        const token = authHeader?.split(" ")[1] || req.cookies.accessToken;
        
        console.log(token);
        

        if (!token) {
            return res.status(401).json({
                message: "JWT token missing..."
            });
        }

        const decoded = verifyToken(token);

        req.user = {
            id: decoded.userId,
            role: decoded.role,
        }
        console.log(req.user);
        next();
  
    } catch (error) {
        next(error);
    }
};



export default {
    authenticate
}