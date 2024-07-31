import Story from "../models/Story";
import { Request, Response } from "express";

async function createStory(req:Request, res:Response) {
   try {
    console.log('Heeeee')
    const {title, images, audio, text, questions} = req.body;

    const newStory = await Story.create({
        title,
        images,
        audio,
        text,
        questions
    });

    return res.status(201).json({
        message: "Story created successfully",
        story: newStory
    });
   } catch (error) {
    console.log(error);
       return res.status(500).json({
           message: "Error creating story",
       });
   }
}

export { createStory };