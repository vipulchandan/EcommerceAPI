import mongoose from "mongoose";
import OrderModel from "../models/OrderModel.js";
import CartModel from "../models/CartModel.js";
import UserModel from "../models/UserModel.js";


/* 
- Order Placement: Create an endpoint to handle order placement, allowing users to place an order with products from their cart.

- **Endpoint:**         /api/users/:userId/orders
- **Method:**           POST
- **Description:**      Place an order with products from the user's cart.
- **Authentication:**   Bearer token required
*/
const placeOrder = async (req, res) => {
    try {
        const { userId } = req.params;
        const { cartId } = req.body;
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
                message: "Unauthorized access! You are not allowed to place Order!"
            });
        }

        // cartId validation
        if (!cartId) {
            return res.status(400).json({
                status: false,
                message: "Cart id is required!"
            });
        }

        // check if cartId is valid
        if (!mongoose.Types.ObjectId.isValid(cartId)) {
            return res.status(400).json({
                status: false,
                message: "Invalid cart id!"
            });
        }

        // Check if cart exists
        const cart = await CartModel.findById(cartId);
        if (!cart) {
            return res.status(404).json({
                status: false,
                message: "Cart not found!"
            });
        }

        // check if cart belongs to user
        if (cart.userId.toString() !== userId) {
            return res.status(403).json({
                status: false,
                message: "Unauthorized access! You are not the owner of this cart!"
            });
        }

        // check if cart is empty
        if (cart.items.length === 0) {
            return res.status(400).json({
                status: false,
                message: "Cart is empty! Please add items to your cart!"
            });
        }

        // place new order
        const order = new OrderModel({
            userId,
            items: cart.items,
            totalPrice: cart.totalPrice,
            totalItems: cart.totalItems,
            totalQuantity: cart.totalQuantity,
        });
        await order.save();

        // Clear the cart after placing the order
        cart.items = [];
        cart.totalPrice = 0;
        cart.totalItems = 0;
        cart.totalQuantity = 0;
        await cart.save();

        res.status(201).json({
            status: true,
            message: "Order placed successfully!",
            data: order
        });

    } catch(error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
};



/* 
- Order History: Implement an endpoint to fetch the order history for authenticated users

- **Endpoint:**         /api/users/:userId/orders
- **Method:**           GET
- **Description:**      Get the order history for an authenticated user.
- **Authentication:**   Bearer token required.
*/
const getOrderHistory = async (req, res) => {
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
                message: "Unauthorized access! You are not allowed to view order history!"
            });
        }

        // find all orders for the user
        const orders = await OrderModel.find({ userId, isDeleted: false }).populate("items.productId").populate("userId");   

        res.status(200).json({
            status: true,
            message: "Order history fetched successfully!",
            data: orders
        })
    } catch(error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}


/* 
- Order Details: Create an endpoint that retrieves the detailed information of a specific order by its ID

- **Endpoint:**         /api/users/:userId/orders/:orderId
- **Method:**           GET
- **Description:**      Get detailed information about a specific order by ID.
- **Authentication:**   Bearer token required.
*/
const getOrderDetails = async (req, res) => {
    try {
        const { userId, orderId } = req.params;
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
                message: "Unauthorized access! You are not allowed to view the order details!"
            });
        }

        // Check if orderId is valid
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).json({
                status: false,
                message: "Invalid order id!"
            });
        }

        const order = await OrderModel.findOne({ _id: orderId, userId, isDeleted: false }).populate("items.productId").populate("userId");
        if (!order) {
            return res.status(404).json({
                status: false,
                message: "Order not found!"
            });
        }

        res.status(200).json({
            status: true,
            message: "Order details fetched successfully!",
            data: order
        });

    } catch(error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}



export {
    placeOrder,
    getOrderHistory,
    getOrderDetails
}