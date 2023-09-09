import { Router } from "express";
import { 
    createCategory, 
    getAllCategories, 
    getCategory
} from "../controllers/CategoryController.js";

const router = Router();

router.post('/create', createCategory);
router.get('/', getAllCategories);
router.get('/:categoryId', getCategory);

export default router;