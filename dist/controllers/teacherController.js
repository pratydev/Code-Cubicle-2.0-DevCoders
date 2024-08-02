"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAssignments = getAssignments;
exports.createAssignment = createAssignment;
exports.getStudents = getStudents;
exports.signInTeacher = signInTeacher;
exports.signUpTeacher = signUpTeacher;
const Teacher_1 = __importDefault(require("../models/Teacher"));
const types_1 = require("../utils/types");
const Assignment_1 = __importDefault(require("../models/Assignment"));
const Question_1 = __importDefault(require("../models/Question"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const utilFunctions_1 = require("../utils/utilFunctions");
function signInTeacher(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = types_1.teacherSignInSchema.safeParse(req.body);
            if (!response.success) {
                return res.status(411).json({
                    message: "Invalid teacher credentials",
                    errors: response.error.errors[0].message
                });
            }
            const signInBody = req.body;
            const teacher = yield Teacher_1.default.findOne({ email: signInBody.email });
            if (!teacher) {
                return res.status(404).json({
                    message: "Teacher not found"
                });
            }
            const passwordMatch = yield bcrypt_1.default.compare(signInBody.password, teacher.password);
            if (!passwordMatch) {
                return res.status(401).json({
                    message: "Invalid password"
                });
            }
            const token = (0, utilFunctions_1.generateTeacherToken)({
                id: teacher.id,
                email: teacher.email,
                name: teacher.name,
                phoneNumber: teacher.phoneNumber,
            });
            return res.status(200).json({
                message: "Teacher signed in successfully",
                token
            });
        }
        catch (error) {
            return res.status(500).json({
                message: "Internal Server Error while signing in teacher",
            });
        }
    });
}
function signUpTeacher(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = types_1.teacherSignUpSchema.safeParse(req.body);
            if (!response.success) {
                return res.status(411).json({
                    message: "Invalid teacher credentials",
                    errors: response.error.errors[0].message
                });
            }
            const signUpBody = req.body;
            const existingTeacher = yield Teacher_1.default.findOne({
                $or: [
                    { email: signUpBody.email },
                    { phoneNumber: signUpBody.phoneNumber }
                ]
            });
            if (existingTeacher) {
                return res.status(409).json({
                    message: "Teacher already exists. Please sign in"
                });
            }
            const hashedPassword = yield bcrypt_1.default.hash(signUpBody.password, 10);
            const newTeacher = yield Teacher_1.default.create({
                name: signUpBody.name,
                email: signUpBody.email,
                phoneNumber: signUpBody.phoneNumber,
                password: hashedPassword
            });
            const returnData = {
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
        }
        catch (error) {
            return res.status(500).json({
                message: "Internal Server Error while signing up teacher",
            });
        }
    });
}
function getAssignments(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const teacherId = req.query.teacherId;
            if (!teacherId) {
                return res.status(411).json({
                    message: "Invalid teacher ID"
                });
            }
            if (!req.teacher || req.teacher.id != teacherId) {
                return res.status(401).json({
                    message: "Unauthorized"
                });
            }
            const teacher = yield Teacher_1.default.findById(teacherId);
            if (!teacher) {
                return res.status(404).json({
                    message: "Teacher not found"
                });
            }
            yield teacher.populate('assignments');
            return res.status(200).json({
                message: "Assignments fetched successfully",
                assignments: teacher.assignments
            });
        }
        catch (error) {
            return res.status(500).json({
                message: "Internal Server Error while fetching assignments",
            });
        }
    });
}
function getStudents(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const teacherId = req.query.teacherId;
            if (!teacherId) {
                return res.status(411).json({
                    message: "Invalid teacher ID"
                });
            }
            const teacher = yield Teacher_1.default.findById(teacherId);
            if (!teacher) {
                return res.status(404).json({
                    message: "Teacher not found"
                });
            }
            yield teacher.populate('students');
            return res.status(200).json({
                message: "Assignments fetched successfully",
                assignments: teacher.students
            });
        }
        catch (error) {
            return res.status(500).json({
                message: "Internal Server Error while fetching assignments",
            });
        }
    });
}
function createAssignment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const teacherId = req.query.teacherId;
            if (!teacherId) {
                return res.status(411).json({
                    message: "Invalid teacher ID"
                });
            }
            const teacher = yield Teacher_1.default.findById(teacherId);
            if (!teacher) {
                return res.status(404).json({
                    message: "Teacher not found"
                });
            }
            const response = types_1.assignmentSchema.safeParse(req.body);
            if (!response.success) {
                return res.status(411).json({
                    message: "Invalid assignment data"
                });
            }
            const assignmentBody = req.body;
            const assignment = yield Assignment_1.default.create({
                title: assignmentBody.title,
                description: assignmentBody.description,
                subject: assignmentBody.subject,
                teacher: teacher._id,
                totalMarks: assignmentBody.totalMarks,
                totalQuestions: assignmentBody.totalQuestions,
                questions: assignmentBody.questions,
            });
            teacher.assignments.push(assignment._id);
            yield teacher.save();
            assignmentBody.questions.map((question) => __awaiter(this, void 0, void 0, function* () {
                yield Question_1.default.create({
                    question: question.question,
                    options: question.options,
                    correctAnswer: question.correctAnswer,
                    marks: question.marks,
                    assignment: assignment._id
                });
            }));
            return res.status(200).json({
                message: "Assignment created successfully",
            });
        }
        catch (error) {
            return res.status(500).json({
                message: "Internal Server Error while creating assignment",
            });
        }
    });
}
