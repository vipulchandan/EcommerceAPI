import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import { 
    getOrderHistory, 
    placeOrder 
} from "../controllers/OrderController.js";

const router = Router();

router.post("/users/:userId/orders", auth, placeOrder);
router.get("/users/:userId/orders", auth, getOrderHistory);

export default router;