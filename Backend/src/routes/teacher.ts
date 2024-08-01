import { Router } from "express";
import { getAssignments, createAssignment, getStudents, signInTeacher, signUpTeacher } from "../controllers/teacherController";
import teacherMiddleware from "../config/teacherMiddleware";

const router = Router();

router.post('/sign-up', teacherMiddleware, signUpTeacher);

router.post('sign-in', teacherMiddleware, signInTeacher);

router.get('/assignments', teacherMiddleware, getAssignments);

router.get('/students', teacherMiddleware, getStudents);

router.post('/create-assignment', teacherMiddleware, createAssignment);


export default router;