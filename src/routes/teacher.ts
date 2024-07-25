import { Router } from "express";

const router = Router();

router.get('/assignments');

router.get("/students");

router.post("/create-assignment");


export default router;