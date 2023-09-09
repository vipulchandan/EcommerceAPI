import mongoose from "mongoose";
import CategoryModel from "../models/CategoryModel.js";


// Create Category
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


// Get All Categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await CategoryModel.find();

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


// Get Category
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