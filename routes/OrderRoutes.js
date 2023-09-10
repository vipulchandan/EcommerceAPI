import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import { placeOrder } from "../controllers/OrderController.js";

const router = Router();

router.post("/users/:userId/order", auth, placeOrder);

export default router;