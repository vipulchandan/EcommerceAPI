/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */


import { Router } from "express";
import { 
    loginUser, 
    registerUser 
} from "../controllers/UserController.js";

const router = Router();


/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *               address:
 *                 type: object
 *                 properties:
 *                   shipping:
 *                     type: object
 *                     properties:
 *                       street:
 *                         type: string
 *                       city:
 *                         type: string
 *                       pincode:
 *                         type: string
 *                   billing:
 *                     type: object
 *                     properties:
 *                       street:
 *                         type: string
 *                       city:
 *                         type: string
 *                       pincode:
 *                         type: string
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       400:
 *         description: Invalid input or user already exists.
 *       500:
 *         description: Internal server error.
 */
router.post('/register', registerUser);


/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *       400:
 *         description: Invalid input or invalid email/password.
 *       401:
 *         description: User not found or invalid email/password.
 *       500:
 *         description: Internal server error.
 */
router.post('/login', loginUser);

export default router;