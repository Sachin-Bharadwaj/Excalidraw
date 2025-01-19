import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_USER_SECRET } from "@repo/backend-common/config";

//const JWT_USER_SECRET = "123123"
declare global {  
    namespace Express {  
      interface Request {  
        userId: string; // Extend the request object here  
      }  
    }  
  }

export function middleware(req: Request, res: Response, next: NextFunction){
    const token = req.headers["authorization"] ?? "";
    
    const decoded = jwt.verify(token, JWT_USER_SECRET) as jwt.JwtPayload;

    if(decoded && typeof decoded !== 'string') {
        req.userId = decoded.userId;
        next();

    } else {
        res.status(403).json({
            message: "Unauthorized"
        })

    }
    

}