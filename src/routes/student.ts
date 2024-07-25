import { Router } from "express";
import { getPendingAssignments, getCompletedAssignments, submitAssignment } from "../controllers/studentController";

const router = Router();

// TODO: Add a student middleware

router.get("/pending-assignments", getPendingAssignments);

router.get("/completed-assignments", getCompletedAssignments);

router.post("/submit", submitAssignment);

export default router;