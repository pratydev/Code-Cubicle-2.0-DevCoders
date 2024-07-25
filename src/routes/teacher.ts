import { Router } from "express";
import { getAssignments, createAssignment, getStudents } from "../controllers/teacherController";

const router = Router();

router.get('/assignments', getAssignments);

router.get("/students", getStudents);

router.post("/create-assignment", createAssignment);


export default router;