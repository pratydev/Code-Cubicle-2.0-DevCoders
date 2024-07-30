import Student from "../models/Student";
import { Request, Response } from "express";
import { StudentBody, StudentSignInBody, studentSignInSchema, StudentSignUpBody, studentSignUpSchema, SubmissionBody, submissionSchema } from "../utils/types";
import Assignment from "../models/Assignment";
import Submission from "../models/Submission";
import Score from "../models/Score";
import bcrypt from "bcrypt";
import { generateStudentToken } from "../utils/utilFunctions";

async function signUpStudent(req: Request, res: Response) {
    try {
        const response = studentSignUpSchema.safeParse(req.body);

        if (!response.success) {
            return res.status(411).json({
                message: "Invalid student data"
            });
        }

        const signUpBody: StudentSignUpBody = req.body;

        const existingStudent = await Student.findOne({
            email: signUpBody.email
        });

        if (existingStudent) {
            return res.status(409).json({
                message: "Student already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(signUpBody.password, 10);

        const newStudent = await Student.create({
            name: signUpBody.name,
            email: signUpBody.email,
            password: hashedPassword,
            class: signUpBody.class
        });

        const returnData: StudentBody = {
            id: newStudent.id,
            name: newStudent.name,
            email: newStudent.email,
            class: newStudent.class,
        };

        return res.status(201).json({
            message: "Student created successfully",
            data: {
                student: returnData
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error while creating student",
        });
    }
}

async function signInStudent(req: Request, res: Response){
    try {
        const response = studentSignInSchema.safeParse(req.body);

        if (!response.success) {
            return res.status(411).json({
                message: "Invalid student credentials"
            });
        }

        const signInBody: StudentSignInBody = req.body;

        const existingStudent = await Student.findOne({
            email: signInBody.email
        });

        if (!existingStudent) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        const passwordMatch = await bcrypt.compare(signInBody.password, existingStudent.password);

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }

        const token = generateStudentToken({
            id: existingStudent.id,
            email: existingStudent.email,
            name: existingStudent.name,
            class: existingStudent.class
        });

        return res.status(200).json({
            message: "Student signed in successfully",
            token
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error while signing in student",
        });
    }
}

async function getPendingAssignments(req: Request, res: Response) {

    try {
        const studentId = req.query.studentId;  // Ideally get this from middleware

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
            pendingAssignments: student.completedAssignments
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

        const assignment = await Assignment.findById(submissionBody.assignmentId);

        if (!assignment) {
            return res.status(404).json({
                message: "Assignment not found"
            });
        }

        await assignment.populate('questions');


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

        const existingScore = await Score.findOne({
            student: studentId,
            'scores.assignment': submissionBody.assignmentId
        });

        if (existingScore) {
            // @ts-ignore
            const assignmentIndex = existingScore.scores.findIndex((score) => score.assignment.toString() === submissionBody.assignmentId);
            if (assignmentIndex !== -1) {
                // @ts-ignore
                existingScore.scores[assignmentIndex].score += question.marks;
            }
            existingScore.save();
        } else {
            const updatedScore = await Score.findOneAndUpdate({
                student: studentId
            }, {
                $addToSet: {
                    scores: {
                        assignment: submissionBody.assignmentId,
                        // @ts-ignore
                        score: question.marks
                    }
                }
            }, { new: true });
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

export { getPendingAssignments, getCompletedAssignments, submitAssignment, signInStudent, signUpStudent };