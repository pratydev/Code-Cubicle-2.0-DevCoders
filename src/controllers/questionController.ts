import Question from "../models/Question";
import { Request, Response } from "express";

async function createQuestion(req: Request, res: Response) {
    try {
        const { question, options, correctAnswer } = req.body;

        const newQuestion = await Question.create({
            question,
            options,
            correctAnswer
        });

        return res.status(201).json({
            message: "Question created successfully",
            question: newQuestion
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error creating question",
        });
    }

}

export { createQuestion };