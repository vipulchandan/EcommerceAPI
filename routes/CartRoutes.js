import { Router } from "express";
import { 
    addToCart, 
    getCartSummary, 
    removeItemFromCart, 
    updateCart 
} from "../controllers/CartController.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

router.post("/users/:userId/cart", auth, addToCart);
router.get("/users/:userId/cart", auth, getCartSummary);
router.put("/users/:userId/cart", auth, updateCart);
router.delete("/users/:userId/cart", auth, removeItemFromCart);

export default router;