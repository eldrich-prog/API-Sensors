import { AnyZodObject } from "zod";
import { Request, Response, NextFunction } from "express";

const safeParse = (schema: AnyZodObject) => {    
    return (req: Request, res: Response, next: NextFunction) => {
        const answer = schema.safeParse(req.body);
        if (answer.success) {
            req.body = answer.data;
            next();
        } else {
            res.status(400).json({ message: answer.error.errors });
        }
    };
}

export default safeParse;