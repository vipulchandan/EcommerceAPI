/**
 * @swagger
 * tags:
 *   name: Order
 *   description: Order management
 */

import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import { 
    getOrderDetails,
    getOrderHistory, 
    placeOrder 
} from "../controllers/OrderController.js";

const router = Router();



/**
 * @swagger
 * /api/users/{userId}/orders:
 *   post:
 *     security:
 *       - BearerAuth: []
 *     summary: Place an order
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *       - in: body
 *         name: body
 *         description: Cart ID
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             cartId:
 *               type: string
 *           required:
 *             - cartId
 *     responses:
 *       201:
 *         description: Order placed successfully
 *       400:
 *         description: Bad request, missing or invalid data
 *       401:
 *         description: Unauthorized, token not provided
 *       403:
 *         description: Unauthorized access
 *       404:
 *         description: User, cart, or product not found
 *       500:
 *         description: Internal server error
 */
router.post("/users/:userId/orders", auth, placeOrder);



/**
 * @swagger
 * /api/users/{userId}/orders:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     summary: Get order history
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: Order history fetched successfully
 *       401:
 *         description: Unauthorized, token not provided
 *       403:
 *         description: Unauthorized access
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get("/users/:userId/orders", auth, getOrderHistory);



/**
 * @swagger
 * /api/users/{userId}/orders/{orderId}:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     summary: Get order details by order ID
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: string
 *         required: true
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order details fetched successfully
 *       401:
 *         description: Unauthorized, token not provided
 *       403:
 *         description: Unauthorized access
 *       404:
 *         description: User or order not found
 *       500:
 *         description: Internal server error
 */
router.get("/users/:userId/orders/:orderId", auth, getOrderDetails);

export default router;