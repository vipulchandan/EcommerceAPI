import { Router } from "express";
import { addToCart } from "../controllers/CartController.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

router.post("/users/:userId/cart", auth, addToCart);

export default router;