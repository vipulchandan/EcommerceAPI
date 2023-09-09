import { Router } from "express";
import { 
    createProduct, 
    getAllProducts 
} from "../controllers/ProductController.js";

const router = Router();

router.post("/create", createProduct);
router.get("/", getAllProducts);

export default router;