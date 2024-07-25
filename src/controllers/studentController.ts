import Student from "../models/Student";
import { Request, Response } from "express";
import { SubmissionBody, submissionSchema } from "../config/types";
import Assignment from "../models/Assignment";
import Submission from "../models/Submission";
async function getPendingAssignments(req: Request, res: Response) {

    try {
        const studentId = req.query.studentId;

        if (!studentId) {
            return res.status(411).json({
                message: "Invalid student ID"
            });
        }

        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        return res.status(200).json({
            message: "Pending Assignments fetched successfully",
            pendingAssignments: student.pendingAssignments
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error while fetching pending assignments",
        });

    }
}

async function getCompletedAssignments(req: Request, res: Response) {
    try {
        const studentId = req.query.studentId;

        if (!studentId) {
            return res.status(411).json({
                message: "Invalid student ID"
            });
        }

        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        return res.status(200).json({
            message: "Pending Assignments fetched successfully",
            pendingAssignments: student.pendingAssignments
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error while fetching pending assignments",
        });
    }
}

async function submitAssignment(req: Request, res: Response) {
    try {
        const studentId = "645236452364523645236452";
        const response = submissionSchema.safeParse(req.body);
        if (!response.success) {
            return res.status(411).json({
                message: "Invalid submission data"
            });
        }

        const submissionBody: SubmissionBody = req.body;

        const assignment = await Assignment.findById(submissionBody.assignmentId).populate('teacher');

        if (!assignment) {
            return res.status(404).json({
                message: "Assignment not found"
            });
        }

        const question = assignment.questions.find((question) => question._id.toString() === submissionBody.questionId);
        if (!question) {
            return res.status(404).json({
                message: "Question not found"
            });
        }

        // @ts-ignore
        const student = assignment.teacher.students.find((student: string) => student === studentId);
        if (!student) {
            return res.status(403).json({
                message: "You cannot submit this assignment"
            });
        }

        const existingSubmission = await Submission.findOne(
            {
                student: studentId,
                question: submissionBody.questionId,
                assignment: submissionBody.assignmentId
            }
        );

        if (existingSubmission) {
            return res.status(409).json({
                message: "You have already submitted this assignment"
            });
        }

        const submission = await Submission.create({
            student: studentId,
            question: submissionBody.questionId,
            assignment: submissionBody.assignmentId,
            answer: submissionBody.answer,
            // @ts-ignore
            correctAnswer: question.correctAnswer
        });

        // @ts-ignore
        const result: boolean = submissionBody.answer === question.correctAnswer;

        return res.status(200).json({
            message: "Assignment submitted successfully",
            result: result
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error while submitting assignment",
        });
    }
}

export { getPendingAssignments, getCompletedAssignments, submitAssignment };