import { Router, Request, Response } from "express";
import studentRouter from "./student";
import teacherRouter from "./teacher";
import { createQuestion } from "../controllers/questionController";
import { createStory } from "../controllers/storyController";

const router = Router();

router.use('/student', studentRouter);

router.use('/teacher', teacherRouter);

router.post('/create-question', createQuestion);

router.post('/create-story', createStory);

export default router; 