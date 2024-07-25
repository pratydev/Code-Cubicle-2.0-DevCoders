import { Router } from "express";

const router = Router();

router.get("/pending-assignments");

router.get("/completed-assignments");

router.post("/submit");

export default router;