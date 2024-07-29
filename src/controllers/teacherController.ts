import { Request, Response } from "express";
import Teacher from "../models/Teacher";
import { AssignmentBody, assignmentSchema, teacherSignInSchema, TeacherSignInBody, TeacherSignUpBody, teacherSignUpSchema, TeacherBody } from "../utils/types";
import Assignment from "../models/Assignment";
import Question from "../models/Question";
import bcrypt from "bcrypt";
import { generateTeacherToken } from "../utils/utilFunctions";

async function signInTeacher(req: Request, res: Response) {
    try {
        const response = teacherSignInSchema.safeParse(req.body);
        if (!response.success) {
            return res.status(411).json({
                message: "Invalid teacher credentials",
                errors: response.error.errors[0].message
            });
        }

        const signInBody: TeacherSignInBody = req.body;

        const teacher = await Teacher.findOne({ email: signInBody.email });

        if (!teacher) {
            return res.status(404).json({
                message: "Teacher not found"
            });
        }

        const passwordMatch = await bcrypt.compare(signInBody.password, teacher.password);

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }

        const token = generateTeacherToken({
            id: teacher.id,
            email: teacher.email,
            name: teacher.name,
            phoneNumber: teacher.phoneNumber,
        });

        return res.status(200).json({
            message: "Teacher signed in successfully",
            token
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error while signing in teacher",
        });
    }

}

async function signUpTeacher(req: Request, res: Response) {
    try {
        const response = teacherSignUpSchema.safeParse(req.body);

        if (!response.success) {
            return res.status(411).json({
                message: "Invalid teacher credentials",
                errors: response.error.errors[0].message
            });
        }

        const signUpBody: TeacherSignUpBody = req.body;

        const teacher = await Teacher.findOne({
            $or: [
                { email: signUpBody.email },
                { phoneNumber: signUpBody.phoneNumber }
            ]
        });

        if (teacher) {
            return res.status(409).json({
                message: "Teacher already exists. Please sign in"
            });
        }

        const hashedPassword = await bcrypt.hash(signUpBody.password, 10);

        const newTeacher = await Teacher.create({
            name: signUpBody.name,
            email: signUpBody.email,
            phoneNumber: signUpBody.phoneNumber,
            password: hashedPassword
        });

        const returnData: TeacherBody = {
            id: newTeacher.id,
            name: newTeacher.name,
            email: newTeacher.email,
            phoneNumber: newTeacher.phoneNumber,
        };

        return res.status(201).json({
            message: "Teacher signed up successfully",
            data: {
                newTeacher: returnData
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error while signing up teacher",
        });
    }

}

async function getAssignments(req: Request, res: Response) {
    try {
        const teacherId = req.query.teacherId as string | undefined;

        if (!teacherId) {
            return res.status(411).json({
                message: "Invalid teacher ID"
            });
        }

        //@ts-ignore
        if (!req.teacher || req.teacher.id != teacherId) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }


        const teacher = await Teacher.findById(teacherId);
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
        if (!response.success) {
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

        assignmentBody.questions.map(async (question) => {
            await Question.create({
                question: question.question,
                options: question.options,
                correctAnswer: question.correctAnswer,
                marks: question.marks,
                assignment: assignment._id
            })
        });

        return res.status(200).json({
            message: "Assignment created successfully",
        });


    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error while creating assignment",
        });
    }
}

export { getAssignments, createAssignment, getStudents, signInTeacher, signUpTeacher };