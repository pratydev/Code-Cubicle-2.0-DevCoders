import { Router } from "express";
import { getPendingAssignments, getCompletedAssignments, submitAssignment, signInStudent, signUpStudent } from "../controllers/studentController";
import studentMiddleware from "../config/studentMiddleware";

const router = Router();

router.post('/sign-up', studentMiddleware, signUpStudent);

router.post('/sign-in', studentMiddleware, signInStudent);

router.get('/pending-assignments', studentMiddleware ,getPendingAssignments);

router.get('/completed-assignments', studentMiddleware, getCompletedAssignments);

router.post('/submit-assignment', studentMiddleware, submitAssignment);

export default router;