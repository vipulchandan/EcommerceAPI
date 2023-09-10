/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management
 */


import { Router } from "express";
import { 
    createCategory, 
    getAllCategories, 
    getCategory
} from "../controllers/CategoryController.js";

const router = Router();


/**
 * @swagger
 * /api/categories/create:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Category name
 *               description:
 *                 type: string
 *                 description: Category description
 *             required:
 *               - name
 *               - description
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Bad request, missing or invalid data
 *       500:
 *         description: Internal server error
 */
router.post('/create', createCategory);



/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Retrieve a list of categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Successful response with a list of categories
 *       500:
 *         description: Internal server error
 */
router.get('/', getAllCategories);



/**
 * @swagger
 * /api/categories/{categoryId}:
 *   get:
 *     summary: Retrieve a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: string
 *         required: true
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Successful response with a category
 *       400:
 *         description: Bad request, invalid Category ID
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
router.get('/:categoryId', getCategory);

export default router;