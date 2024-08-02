"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTeacherToken = generateTeacherToken;
exports.generateStudentToken = generateStudentToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateTeacherToken(payload) {
    const teacherSecret = process.env.CODEIAL_TEACHER_JWT_SECRET;
    if (!teacherSecret) {
        throw new Error("Teacher Token Not Set");
    }
    return jsonwebtoken_1.default.sign(payload, teacherSecret, {
        expiresIn: "1h"
    });
}
function generateStudentToken(payload) {
    const studentSecret = process.env.CODEIAL_JWT_SECRET;
    if (!studentSecret) {
        throw new Error("Teacher Token Not Set");
    }
    return jsonwebtoken_1.default.sign(payload, studentSecret, {
        expiresIn: "1h"
    });
}
