import { Router } from "express";
import { 
    createProduct, 
    getAllProducts, 
    getProduct
} from "../controllers/ProductController.js";

const router = Router();

router.post("/create", createProduct);
router.get("/", getAllProducts);
router.get("/:productId", getProduct);

export default router;