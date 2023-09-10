import CartModel from "../models/CartModel.js";
import UserModel from "../models/UserModel.js";
import ProductModel from "../models/ProductModel.js";
import mongoose from "mongoose";

// Add to Cart
const addToCart =  async (req, res) => {
    try {
        const { userId } = req.params;
        const { productId, quantity } = req.body;
        const userIdFromToken = req.userId;

        // Check if userId is valid
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                status: false,
                message: "Invalid user id!"
            });
        }
        // Check if user exists
        const user = await UserModel.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User not found!"
            });
        }
        // Check if the userId from params matches the userId from token
        if (user._id.toString() !== userIdFromToken) {
            return res.status(403).json({
                status: false,
                message: "Unauthorized access! You are not the owner of this cart!"
            });
        }

        

        if (!productId) {
            return res.status(400).json({
                status: false,
                message: "Product id is required!"
            });
        }
        // Check if productId is valid
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({
                status: false,
                message: "Invalid product id!"
            });
        }
        if (!quantity) {
            return res.status(400).json({
                status: false,
                message: "Quantity is required!"
            });
        }

        // Check if product exists
        const product = await ProductModel.findOne({ _id: productId, availability: true, isDeleted: false });
        if (!product) {
            return res.status(404).json({
                status: false,
                message: "Product not found!"
            });
        }

        // Find the user's cart or create one if it doesn't exist
        let cart = await CartModel.findOne({ userId });
        if (!cart) {
            cart = new CartModel({
                userId,
                items: [],
                totalPrice: 0,
                totalItems: 0,
            })
        }

        // Check if the product is already in the cart
        const existingCartItem = cart.items.find((item) => item.productId.toString() === productId);
        if (existingCartItem) {
            // If the product already exists, update its quantity
            existingCartItem.quantity += quantity;
        } else {
            // If it's a new product, add it to the cart
            cart.items.push({
                productId,
                quantity
            });
        }

        // Update total price and total items in the cart
        // cart.totalPrice = cart.items.reduce((total, item) => total + (item.productId.price * item.quantity), 0);
        cart.totalPrice += (product.price * quantity);
        cart.totalItems += quantity;

        await cart.save();

        res.status(201).json({
            status: true,
            message: "Product added to cart successfully!",
            data: cart
        })

    } catch(error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
};



export {
    addToCart
}