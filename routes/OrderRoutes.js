import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import { 
    getOrderDetails,
    getOrderHistory, 
    placeOrder 
} from "../controllers/OrderController.js";

const router = Router();

router.post("/users/:userId/orders", auth, placeOrder);
router.get("/users/:userId/orders", auth, getOrderHistory);
router.get("/users/:userId/orders/:orderId", auth, getOrderDetails);

export default router;