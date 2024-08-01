import Story from "../models/Story";
import { Request, Response } from "express";

async function createStory(req:Request, res:Response) {
   try {
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

async function fetchStory(req: Request, res: Response){
    try {
        const {title} = req.query;

        const story = await Story.findOne({title});

        story?.populate("questions");

        return res.status(200).json({
            message: "Story fetched successfully",
            story
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error fetching story",
        });
    }
}

export { createStory, fetchStory };