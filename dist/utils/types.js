"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentSignUpSchema = exports.studentSignInSchema = exports.teacherSignUpSchema = exports.teacherSignInSchema = exports.assignmentSchema = exports.submissionSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.submissionSchema = zod_1.default.object({
    assignmentId: zod_1.default.string(),
    questionId: zod_1.default.string(),
    answer: zod_1.default.string()
});
exports.assignmentSchema = zod_1.default.object({
    title: zod_1.default.string().min(3, { message: "Title must be at least 3 characters long" }),
    description: zod_1.default.string().min(3, { message: "Description must be at least 3 characters long" }).optional(),
    subject: zod_1.default.string().min(3, { message: "Subject must be at least 3 characters long" }),
    totalMarks: zod_1.default.number(),
    totalQuestions: zod_1.default.number().min(1, { message: "Total Questions must be at least 1" }),
    questions: zod_1.default.array(zod_1.default.object({
        question: zod_1.default.string().min(3, { message: "Question must be at least 3 characters long" }),
        options: zod_1.default.array(zod_1.default.string().min(3, { message: "Option must be at least 3 characters long" })).min(2, { message: "At least 2 options are required" }),
        correctAnswer: zod_1.default.string().min(3, { message: "Correct Answer must be at least 3 characters long" }),
        marks: zod_1.default.number().min(1, { message: "Marks must be at least 1" })
    }))
});
exports.teacherSignInSchema = zod_1.default.object({
    email: zod_1.default.string().email({ message: "Invalid email" }),
    password: zod_1.default.string().min(8, { message: "Password must be at least 8 characters long" }),
});
exports.teacherSignUpSchema = zod_1.default.object({
    name: zod_1.default.string().min(3, { message: "Name must be at least 3 characters long" }).max(40, { message: "Name must be at most 40 characters long" }),
    email: zod_1.default.string().email({ message: "Invalid email" }),
    password: zod_1.default.string().min(8, { message: "Password must be at least 8 characters long" }),
    phoneNumber: zod_1.default.string().min(10, { message: "Phone number must be at least 10 characters long" }).max(13, { message: "Phone number must be at most 13 characters long" })
});
exports.studentSignInSchema = zod_1.default.object({
    email: zod_1.default.string().email({ message: "Invalid email" }),
    password: zod_1.default.string().min(8, { message: "Password must be at least 8 characters long" }),
});
exports.studentSignUpSchema = zod_1.default.object({
    name: zod_1.default.string().min(3, { message: "Name must be at least 3 characters long" }).max(40, { message: "Name must be at most 40 characters long" }),
    email: zod_1.default.string().email({ message: "Invalid email" }),
    password: zod_1.default.string().min(8, { message: "Password must be at least 8 characters long" }),
    class: zod_1.default.string()
});
