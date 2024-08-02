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
exports.getPendingAssignments = getPendingAssignments;
exports.getCompletedAssignments = getCompletedAssignments;
exports.submitAssignment = submitAssignment;
exports.signInStudent = signInStudent;
exports.signUpStudent = signUpStudent;
const Student_1 = __importDefault(require("../models/Student"));
const types_1 = require("../utils/types");
const Assignment_1 = __importDefault(require("../models/Assignment"));
const Submission_1 = __importDefault(require("../models/Submission"));
const Score_1 = __importDefault(require("../models/Score"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const utilFunctions_1 = require("../utils/utilFunctions");
function signUpStudent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = types_1.studentSignUpSchema.safeParse(req.body);
            if (!response.success) {
                return res.status(411).json({
                    message: "Invalid student data"
                });
            }
            const signUpBody = req.body;
            const existingStudent = yield Student_1.default.findOne({
                email: signUpBody.email
            });
            if (existingStudent) {
                return res.status(409).json({
                    message: "Student already exists"
                });
            }
            const hashedPassword = yield bcrypt_1.default.hash(signUpBody.password, 10);
            const newStudent = yield Student_1.default.create({
                name: signUpBody.name,
                email: signUpBody.email,
                password: hashedPassword,
                class: signUpBody.class
            });
            const returnData = {
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
        }
        catch (error) {
            return res.status(500).json({
                message: "Internal Server Error while creating student",
            });
        }
    });
}
function signInStudent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = types_1.studentSignInSchema.safeParse(req.body);
            if (!response.success) {
                return res.status(411).json({
                    message: "Invalid student credentials"
                });
            }
            const signInBody = req.body;
            const existingStudent = yield Student_1.default.findOne({
                email: signInBody.email
            });
            if (!existingStudent) {
                return res.status(404).json({
                    message: "Student not found"
                });
            }
            const passwordMatch = yield bcrypt_1.default.compare(signInBody.password, existingStudent.password);
            if (!passwordMatch) {
                return res.status(401).json({
                    message: "Invalid password"
                });
            }
            const token = (0, utilFunctions_1.generateStudentToken)({
                id: existingStudent.id,
                email: existingStudent.email,
                name: existingStudent.name,
                class: existingStudent.class
            });
            return res.status(200).json({
                message: "Student signed in successfully",
                token
            });
        }
        catch (error) {
            return res.status(500).json({
                message: "Internal Server Error while signing in student",
            });
        }
    });
}
function getPendingAssignments(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const studentId = req.query.studentId;
            if (!studentId) {
                return res.status(411).json({
                    message: "Invalid student ID"
                });
            }
            const student = yield Student_1.default.findById(studentId);
            if (!student) {
                return res.status(404).json({
                    message: "Student not found"
                });
            }
            return res.status(200).json({
                message: "Pending Assignments fetched successfully",
                pendingAssignments: student.pendingAssignments
            });
        }
        catch (error) {
            return res.status(500).json({
                message: "Internal Server Error while fetching pending assignments",
            });
        }
    });
}
function getCompletedAssignments(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const studentId = req.query.studentId;
            if (!studentId) {
                return res.status(411).json({
                    message: "Invalid student ID"
                });
            }
            const student = yield Student_1.default.findById(studentId);
            if (!student) {
                return res.status(404).json({
                    message: "Student not found"
                });
            }
            return res.status(200).json({
                message: "Pending Assignments fetched successfully",
                pendingAssignments: student.completedAssignments
            });
        }
        catch (error) {
            return res.status(500).json({
                message: "Internal Server Error while fetching pending assignments",
            });
        }
    });
}
function submitAssignment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const studentId = "645236452364523645236452";
            const response = types_1.submissionSchema.safeParse(req.body);
            if (!response.success) {
                return res.status(411).json({
                    message: "Invalid submission data"
                });
            }
            const submissionBody = req.body;
            const assignment = yield Assignment_1.default.findById(submissionBody.assignmentId);
            if (!assignment) {
                return res.status(404).json({
                    message: "Assignment not found"
                });
            }
            yield assignment.populate('questions');
            const question = assignment.questions.find((question) => question._id.toString() === submissionBody.questionId);
            if (!question) {
                return res.status(404).json({
                    message: "Question not found"
                });
            }
            const student = assignment.teacher.students.find((student) => student === studentId);
            if (!student) {
                return res.status(403).json({
                    message: "You cannot submit this assignment"
                });
            }
            const existingSubmission = yield Submission_1.default.findOne({
                student: studentId,
                question: submissionBody.questionId,
                assignment: submissionBody.assignmentId
            });
            if (existingSubmission) {
                return res.status(409).json({
                    message: "You have already submitted this assignment"
                });
            }
            const existingScore = yield Score_1.default.findOne({
                student: studentId,
                'scores.assignment': submissionBody.assignmentId
            });
            if (existingScore) {
                const assignmentIndex = existingScore.scores.findIndex((score) => score.assignment.toString() === submissionBody.assignmentId);
                if (assignmentIndex !== -1) {
                    existingScore.scores[assignmentIndex].score += question.marks;
                }
                existingScore.save();
            }
            else {
                const updatedScore = yield Score_1.default.findOneAndUpdate({
                    student: studentId
                }, {
                    $addToSet: {
                        scores: {
                            assignment: submissionBody.assignmentId,
                            score: question.marks
                        }
                    }
                }, { new: true });
            }
            const submission = yield Submission_1.default.create({
                student: studentId,
                question: submissionBody.questionId,
                assignment: submissionBody.assignmentId,
                answer: submissionBody.answer,
                correctAnswer: question.correctAnswer
            });
            const result = submissionBody.answer === question.correctAnswer;
            return res.status(200).json({
                message: "Assignment submitted successfully",
                result: result
            });
        }
        catch (error) {
            return res.status(500).json({
                message: "Internal Server Error while submitting assignment",
            });
        }
    });
}
