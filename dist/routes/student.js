"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const studentController_1 = require("../controllers/studentController");
const studentMiddleware_1 = __importDefault(require("../config/studentMiddleware"));
const router = (0, express_1.Router)();
router.post('/sign-up', studentMiddleware_1.default, studentController_1.signUpStudent);
router.post('/sign-in', studentMiddleware_1.default, studentController_1.signInStudent);
router.get('/pending-assignments', studentMiddleware_1.default, studentController_1.getPendingAssignments);
router.get('/completed-assignments', studentMiddleware_1.default, studentController_1.getCompletedAssignments);
router.post('/submit-assignment', studentMiddleware_1.default, studentController_1.submitAssignment);
exports.default = router;
