import { Request, Response } from "express";
import Teacher from "../models/Teacher";
import { AssignmentBody, assignmentSchema } from "../config/types";
import Assignment from "../models/Assignment";
import Question from "../models/Question";

async function getAssignments(req: Request, res: Response) {
    try {
        const teacherId = req.query.teacherId;  // ideally get this from middleware
        if (!teacherId) {
            return res.status(411).json({
                message: "Invalid teacher ID"
            });
        }

        const teacher = await Teacher.findById(teacherId);   // can skip this when middleware is in place
        if (!teacher) {
            return res.status(404).json({
                message: "Teacher not found"
            });
        }

        await teacher.populate('assignments');

        return res.status(200).json({
            message: "Assignments fetched successfully",
            assignments: teacher.assignments
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error while fetching assignments",
        });
    }
}

async function getStudents(req: Request, res: Response) {
    try {
        const teacherId = req.query.teacherId;  // ideally get this from middleware
        if (!teacherId) {
            return res.status(411).json({
                message: "Invalid teacher ID"
            });
        }

        const teacher = await Teacher.findById(teacherId);   // can skip this when middleware is in place
        if (!teacher) {
            return res.status(404).json({
                message: "Teacher not found"
            });
        }

        await teacher.populate('students');

        return res.status(200).json({
            message: "Assignments fetched successfully",
            assignments: teacher.students
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error while fetching assignments",
        });
    }
}


async function createAssignment(req: Request, res: Response) {
    try {
        const teacherId = req.query.teacherId;  // ideally get this from middleware
        if (!teacherId) {
            return res.status(411).json({
                message: "Invalid teacher ID"
            });
        }

        const teacher = await Teacher.findById(teacherId);   // can skip this when middleware is in place
        if (!teacher) {
            return res.status(404).json({
                message: "Teacher not found"
            });
        }

        const response = assignmentSchema.safeParse(req.body);
        if(!response.success){
            return res.status(411).json({
                message: "Invalid assignment data"
            });
        }

        const assignmentBody: AssignmentBody = req.body;

        const assignment = await Assignment.create({
            title: assignmentBody.title,
            description: assignmentBody.description,
            subject: assignmentBody.subject,
            teacher: teacher._id,
            totalMarks: assignmentBody.totalMarks,
            totalQuestions: assignmentBody.totalQuestions,
            questions: assignmentBody.questions,
        });

        teacher.assignments.push(assignment._id);
        await teacher.save();

        assignmentBody.questions.map( async(question)=>{
            await Question.create({
                question: question.question,
                options: question.options,
                correctAnswer: question.correctAnswer,
                marks: question.marks,
                assignment: assignment._id
            })
        } );

        return res.status(200).json({
            message: "Assignment created successfully",
        });

        
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error while creating assignment",
        });
    }
}

export { getAssignments, createAssignment, getStudents };