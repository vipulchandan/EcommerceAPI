import { Router } from "express";
import { addToCart, getCartSummary } from "../controllers/CartController.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

router.post("/users/:userId/cart", auth, addToCart);
router.get("/users/:userId/cart", auth, getCartSummary);

export default router;