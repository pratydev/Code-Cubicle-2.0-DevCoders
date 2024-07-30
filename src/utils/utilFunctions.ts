import jwt from "jsonwebtoken";
import { StudentBody, TeacherBody } from "./types";

function generateTeacherToken(payload: TeacherBody): string {
    const teacherSecret = process.env.CODEIAL_TEACHER_JWT_SECRET;
    if(!teacherSecret){
        throw new Error("Teacher Token Not Set");
    }
    return jwt.sign(payload, teacherSecret, {
        expiresIn: "1h"
    });
}

function generateStudentToken(payload: StudentBody): string {
    const studentSecret = process.env.CODEIAL_JWT_SECRET;
    if(!studentSecret){
        throw new Error("Teacher Token Not Set");
    }
    return jwt.sign(payload, studentSecret, {
        expiresIn: "1h"
    });
}

export { generateTeacherToken, generateStudentToken };