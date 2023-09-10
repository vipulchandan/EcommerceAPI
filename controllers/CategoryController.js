import mongoose from "mongoose";
import CategoryModel from "../models/CategoryModel.js";


/* 
- **Endpoint:**         /api/categories/create
- **Method:**           POST
- **Description:**      Create a new product category.
- **Authentication:**   Not required.
*/
const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        // name validation
        if (!name) {
            return res.status(400).json({
                status: false,
                message: "Category Name is required!"
            });
        }

        // check for existing category
        const existingCategory = await CategoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({
                status: false,
                message: "Category already exists!"
            });
        }

        // description validation
        if (!description) {
            return res.status(400).json({
                status: false,
                message: "Category Description is required!"
            });
        }

        const newCategory = new CategoryModel({
            name,
            description
        });

        await newCategory.save();

        res.status(201).json({
            status: true,
            data: newCategory
        })
    } catch(error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}



/* 
- **Endpoint:**         /api/categories
- **Method:**           GET
- **Description:**      Get a list of product categories.
- **Authentication:**   Not required.
*/
const getAllCategories = async (req, res) => {
    try {
        const categories = await CategoryModel.find({ isDeleted: false });

        res.status(200).json({
            status: true,
            message: "Categories fetched successfully!",
            data: categories
        });
    } catch(error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}



/* 
- **Endpoint:**         /api/categories/:categoryId
- **Method:**           GET
- **Description:**      Get category details by ID.
- **Authentication:**   Not required.
*/
const getCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({
                status: false,
                message: "Invalid Category ID!"
            });
        }

        const category = await CategoryModel.findOne({ _id: categoryId, isDeleted: false });
        if (!category) {
            return res.status(404).json({
                status: false,
                message: "Category not found!"
            });
        }

        res.status(200).json({
            status: true,
            message: "Category fetched successfully!",
            data: category
        });
    } catch(error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

export {
    createCategory,
    getAllCategories,
    getCategory,
}