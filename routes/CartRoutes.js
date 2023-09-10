/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Shopping cart management
 */


import { Router } from "express";
import { 
    addToCart, 
    getCartSummary, 
    removeItemFromCart, 
    updateCart 
} from "../controllers/CartController.js";
import { auth } from "../middlewares/auth.js";

const router = Router();


/**
 * @swagger
 * /api/users/{userId}/cart:
 *   post:
 *     security:
 *       - BearerAuth: []  # Reference the security definition
 *     summary: Add a product to the user's shopping cart
 *     tags:
 *       - Cart
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *             required:
 *               - productId
 *               - quantity
 *     responses:
 *       201:
 *         description: Product added to cart successfully
 *       400:
 *         description: Bad request, missing or invalid data
 *       401:
 *         description: Unauthorized, token not provided
 *       403:
 *         description: Unauthorized access
 *       404:
 *         description: User or product not found
 *       500:
 *         description: Internal server error
 */
router.post("/users/:userId/cart", auth, addToCart);



/**
 * @swagger
 * /api/users/{userId}/cart:
 *   get:
 *     security:
 *       - BearerAuth: []  # Reference the security definition
 *     summary: Get cart summary for the user
 *     tags:
 *       - Cart
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: Cart summary fetched successfully
 *       401:
 *         description: Unauthorized, token not provided
 *       403:
 *         description: Unauthorized access
 *       404:
 *         description: User or cart not found
 *       500:
 *         description: Internal server error
 */
router.get("/users/:userId/cart", auth, getCartSummary);



/**
 * @swagger
 * /api/users/{userId}/cart:
 *   put:
 *     security:
 *       - BearerAuth: []  # Reference the security definition
 *     summary: Update cart quantities for a user
 *     tags:
 *       - Cart
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *             required:
 *               - productId
 *               - quantity
 *     responses:
 *       200:
 *         description: Cart updated successfully
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
router.put("/users/:userId/cart", auth, updateCart);



/**
 * @swagger
 * /api/users/{userId}/cart:
 *   delete:
 *     security:
 *       - BearerAuth: []  # Reference the security definition
 *     summary: Remove items from the user's cart
 *     tags:
 *       - Cart
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *             required:
 *               - productId
 *     responses:
 *       200:
 *         description: Item removed from cart successfully
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
router.delete("/users/:userId/cart", auth, removeItemFromCart);


export default router;