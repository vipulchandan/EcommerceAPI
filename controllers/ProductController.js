import mongoose from "mongoose";
import ProductModel from "../models/ProductModel.js";
import CategoryModel from "../models/CategoryModel.js";

// Create Product
const createProduct = async (req, res) => {
    try {
        const { title, price, description, availability, categoryId } = req.body;

        // title validation
        if (!title) {
            return res.status(400).json({
                status: false,
                message: "Title is required!"
            });
        }

        // check for existing product
        const existingProduct = await ProductModel.findOne({ title });
        if (existingProduct) {
            return res.status(400).json({
                status: false,
                message: "Product already exists!"
            });
        }

        // price validation
        if (!price) {
            return res.status(400).json({
                status: false,
                message: "Price is required!"
            });
        }
        // check if price is valid
        if (price <= 0) {
            return res.status(400).json({
                status: false,
                message: "Price must be greater than 0!"
            });
        }
        if (price === undefined || isNaN(price) || !isFinite(price)) {
            return res.status(400).json({
                status: false,
                message: "Price must be a valid number or decimal."
            });
        }    

        // description validation
        if (!description) {
            return res.status(400).json({
                status: false,
                message: "Description is required!"
            });
        }

        // check if availability is valid boolean true/false
        if (availability) {
            if (availability !== true && availability !== false) {
                return res.status(400).json({
                    status: false,
                    message: "Availability must be true or false!"
                });
            }
        }

        // category validation
        if (!categoryId) {
            return res.status(400).json({
                status: false,
                message: "Category is required!"
            });
        }
        // check if category is valid
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({
                status: false,
                message: "Invalid Category ID!"
            });
        }
        // check if category exists
        const category = await CategoryModel.findOne({ _id: categoryId, isDeleted: false });
        if (!category) {
            return res.status(404).json({
                status: false,
                message: "Category not found!"
            });
        }

        // const newProduct = await ProductModel.create({
        //     title,
        //     price,
        //     description,
        //     availability,
        //     categoryId
        // });

        const newProduct = new ProductModel({
            title,
            price,
            description,
            availability,
            categoryId
        });

        const savedProduct = await newProduct.save();

        await savedProduct.populate("categoryId");

        res.status(201).json({
            status: true,
            message: "Product created successfully!",
            data: savedProduct
        })
    } catch(error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}


// Get All Products
const getAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.find({ isDeleted: false }).populate("categoryId");

        res.status(200).json({
            status: true,
            message: "Products fetched successfully!",
            data: products
        });

    } catch(error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}


// Get specific product by id
const getProduct =  async (req, res) => {
    try {
        const { productId } = req.params;

        // check if product id is valid
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({
                status: false,
                message: "Invalid Product ID!"
            });
        }

        const product = await ProductModel.findOne({ _id: productId, isDeleted: false }).populate("categoryId");
        if (!product) {
            return res.status(404).json({
                status: false,
                message: "Product not found!"
            });
        }

        res.status(200).json({
            status: true,
            message: "Product fetched successfully!",
            data: product
        })
    } catch(error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}


export {
    createProduct,
    getAllProducts,
    getProduct
}