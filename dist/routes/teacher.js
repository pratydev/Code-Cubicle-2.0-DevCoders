"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const teacherController_1 = require("../controllers/teacherController");
const teacherMiddleware_1 = __importDefault(require("../config/teacherMiddleware"));
const router = (0, express_1.Router)();
router.post('/sign-up', teacherMiddleware_1.default, teacherController_1.signUpTeacher);
router.post('sign-in', teacherMiddleware_1.default, teacherController_1.signInTeacher);
router.get('/assignments', teacherMiddleware_1.default, teacherController_1.getAssignments);
router.get('/students', teacherMiddleware_1.default, teacherController_1.getStudents);
router.post('/create-assignment', teacherMiddleware_1.default, teacherController_1.createAssignment);
exports.default = router;
