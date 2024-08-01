import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

function teacherMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).send("Unauthorized");
        }

        const token = authHeader.split(" ")[1];

        const teacherSecret = process.env.CODEIAL_TEACHER_JWT_SECRET;

        if(!teacherSecret) {
            return res.status(500).send("Internal Server Error: Token Not Found");
        }

        const decoded = jwt.verify(token, teacherSecret);
       
        // @ts-ignore
        req.teacher = decoded;

        next();
    } catch (error) {
        return res.status(401).send("Invalid Credentials");
    }
}

export default teacherMiddleware;