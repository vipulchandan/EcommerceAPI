/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 */


import { Router } from "express";
import { 
    createProduct, 
    getAllProducts, 
    getProduct
} from "../controllers/ProductController.js";

const router = Router();

/**
 * @swagger
 * /api/products/create:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Product title
 *               description:
 *                 type: string
 *                 description: Product description
 *               price:
 *                 type: number
 *                 description: Product price
 *               availability:
 *                 type: boolean
 *                 description: Product availability
 *               categoryId:
 *                 type: string
 *                 description: Category ID for the product
 *             required:
 *               - title
 *               - description
 *               - price
 *               - availability
 *               - categoryId
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Bad request, missing or invalid data
 *       500:
 *         description: Internal server error
 */
router.post("/create", createProduct);



/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Retrieve a list of products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Successful response with a list of products
 *       500:
 *         description: Internal server error
 */
router.get("/", getAllProducts);



/**
 * @swagger
 * /api/products/{productId}:
 *   get:
 *     summary: Retrieve a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Successful response with a product
 *       400:
 *         description: Bad request, invalid Product ID
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.get("/:productId", getProduct);

export default router;