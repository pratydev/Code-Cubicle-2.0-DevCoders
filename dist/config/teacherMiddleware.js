"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function teacherMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).send("Unauthorized");
        }
        const token = authHeader.split(" ")[1];
        const teacherSecret = process.env.CODEIAL_TEACHER_JWT_SECRET;
        if (!teacherSecret) {
            return res.status(500).send("Internal Server Error: Token Not Found");
        }
        const decoded = jsonwebtoken_1.default.verify(token, teacherSecret);
        req.teacher = decoded;
        next();
    }
    catch (error) {
        return res.status(401).send("Invalid Credentials");
    }
}
exports.default = teacherMiddleware;
