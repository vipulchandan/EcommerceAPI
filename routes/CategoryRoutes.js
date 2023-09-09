import { Router } from "express";
import { createCategory } from "../controllers/CategoryController.js";

const router = Router();

router.post('/create', createCategory);

export default router;