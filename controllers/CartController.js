import CartModel from "../models/CartModel.js";
import UserModel from "../models/UserModel.js";
import ProductModel from "../models/ProductModel.js";
import mongoose from "mongoose";

/* 
- **Add to Cart

- **Endpoint:**         /api/users/:userId/cart
- **Method:**           POST
- **Description:**      Add a product to the user's cart.
- **Authentication:**   Bearer token required.
*/
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
        const user = await UserModel.findById(userId);
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

        // productId validation
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
        // quantity validation
        if (!quantity) {
            return res.status(400).json({
                status: false,
                message: "Quantity is required!"
            });
        }

        if (quantity <= 0) {
            return res.status(400).json({
                status: false,
                message: "Quantity must be greater than 0!"
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
                totalQuantity: 0
            })
        }

        // Check if the product is already in the cart
        const existingCartItem = cart.items.find((item) => item.productId.toString() === productId);
        if (existingCartItem) {
            // If the product already exists, update its quantity and total quantity
            existingCartItem.quantity += quantity;
            cart.totalQuantity += quantity;
        } else {
            // If it's a new product, add it to the cart and update total quantity
            cart.items.push({
                productId,
                quantity
            });
            cart.totalQuantity += quantity;
        }

        // Update total price and total items in the cart
        // cart.totalPrice = cart.items.reduce((total, item) => total + (item.productId.price * item.quantity), 0);
        cart.totalPrice += (product.price * quantity);
        cart.totalItems = cart.items.length;

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



/* 
- **Get cart summary details

- **Endpoint:**         /api/users/:userId/cart
- **Method:**           GET
- **Description:**      Get the summary of the user's cart.
- **Authentication:**   Bearer token required.
*/
const getCartSummary = async (req, res) => {
    try {
        const { userId } = req.params;
        const userIdFromToken = req.userId;

        // Check if userId is valid
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                status: false,
                message: "Invalid user id!"
            });
        }

        // Check if user exists
        const user = await UserModel.findById(userId);
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

        const cart = await CartModel.findOne({ userId }).populate("items.productId");

        res.status(200).json({
            status: true,
            message: "Cart summary fetched successfully!",
            data: cart
        });
    } catch(error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}


/* 
- **Update Cart quantities

- **Endpoint:**         /api/users/:userId/cart
- **Method:**           PUT
- **Description:**      Update the quantities of products in the user's cart.
- **Authentication:**   Bearer token required.
*/
const updateCart = async (req, res) => {
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
        const user = await UserModel.findById(userId);
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

        // check if cart exists
        const cart = await CartModel.findOne({ userId });
        if (!cart) {
            return res.status(404).json({
                status: false,
                message: "Cart not found!"
            });
        }

        // productId validation
        if (!productId) {
            return res.status(400).json({
                status: false,
                message: "Product id is required!"
            });
        }

        if (quantity <= 0) {
            return res.status(400).json({
                status: false,
                message: "Quantity must be greater than 0!"
            });
        }

        // check if productId is valid
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({
                status: false,
                message: "Invalid product id!"
            });
        }

        // check if product exists
        const product = await ProductModel.findOne({ _id: productId, availability: true, isDeleted: false });
        if (!product) {
            return res.status(404).json({
                status: false,
                message: "Product not found!"
            });
        }

        // Check if the Item exists
        const cartItem = cart.items.find((item) => item.productId.toString() === productId);
        if (!cartItem) {
            return res.status(404).json({
                status: false,
                message: "Item not found!"
            });
        }

        const oldQuantity = cartItem.quantity;
        cart.totalItems = cart.items.length;
        cart.totalPrice += (quantity - oldQuantity) * product.price;
        cart.totalQuantity += quantity - oldQuantity;

        cartItem.quantity = quantity;

        await cart.save();

        res.status(200).json({
            status: true,
            message: "Cart updated successfully!",
            data: cart
        });
    } catch(error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}



/* 
- **Remove items from cart

- **Endpoint:**         /api/users/:userId/cart
- **Method:**           DELETE
- **Description:**      Remove one or more items from the user's cart.
- **Authentication:**   Bearer token required.
*/
const removeItemFromCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const { productId } = req.body;
        const userIdFromToken = req.userId;

        // Check if userId is valid
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                status: false,
                message: "Invalid user id!"
            });
        }

        // Check if user exists
        const user = await UserModel.findById(userId);
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

        // productId validation
        if (!productId) {
            return res.status(400).json({
                status: false,
                message: "Product id is required!"
            });
        }

        // check if productId is valid
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({
                status: false,
                message: "Invalid product id!"
            });
        }

        // check if cart exists
        const cart = await CartModel.findOne({ userId });
        if (!cart) {
            return res.status(404).json({
                status: false,
                message: "Cart not found!"
            });
        }

        // check if product exists
        const product = await ProductModel.findOne({ _id: productId, availability: true, isDeleted: false });
        if (!product) {
            return res.status(404).json({
                status: false,
                message: "Product not found!"
            });
        }

        // Check if the Item exists
        const cartItem = cart.items.find((item) => item.productId.toString() === productId);
        if (!cartItem) {
            return res.status(404).json({
                status: false,
                message: "Item not found!"
            });
        }

        cart.totalPrice -= (cartItem.quantity * product.price);
        cart.totalQuantity -= cartItem.quantity;
        
        cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
        
        cart.totalItems = cart.items.length;

        await cart.save();

        res.status(200).json({
            status: true,
            message: "Item removed from cart successfully!",
            data: cart
        });

    } catch(error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

export {
    addToCart,
    getCartSummary,
    updateCart,
    removeItemFromCart
}