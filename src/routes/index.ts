import { Router, Request, Response } from "express";
import studentRouter from "./student";
import teacherRouter from "./teacher";

const router = Router();

router.use('/student', studentRouter);

router.use('/teacher', teacherRouter);

router.get("/", (req:Request, res:Response) => {
  return res.send("Welcome to the CodeCubicle API!");
}); 

export default router; 