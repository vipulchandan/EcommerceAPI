import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
    try {
        const { name, email, phone, password, address } = req.body;

        // name validation
        if (!name) {
            return res.status(400).json({
                status: false,
                message: "Name is required!"
            });
        }

        // email validation
        if (!email) {
            return res.status(400).json({
                status: false,
                message: "Email is required!"
            });
        }

        // check if email already exists
        const userWithSameEmail = await UserModel.findOne({ email });
        if (userWithSameEmail) {
            return res.status(400).json({
                status: false,
                message: "Email already exists!"
            });
        }

        // check email is valid
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                status: false,
                message: "Invalid email address!"
            });
        }

        // phone validation
        if (!phone) {
            return res.status(400).json({
                status: false,
                message: "Phone is required!"
            });
        }

        // check if phone number already exists
        const userWithSamePhone = await UserModel.findOne({ phone });
        if (userWithSamePhone) {
            return res.status(400).json({
                status: false,
                message: "Phone number already exists!"
            })
        }

        // check if phone number is valid
        const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/im;
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({
                status: false,
                message: "Invalid phone number!"
            });
        }

        // address validation
        if (!address) {
            return res.status(400).json({
                status: false,
                message: "Address is required!"
            });
        }
        if (!address.shipping) {
            return res.status(400).json({
                status: false,
                message: "Shipping address is required!"
            });
        }
        if (!address.billing) {
            return res.status(400).json({
                status: false,
                message: "Billing address is required!"
            });
        }
        if (!address.shipping.street) {
            return res.status(400).json({
                status: false,
                message: "Shipping street is required!"
            });
        }
        if (!address.shipping.city) {
            return res.status(400).json({
                status: false,
                message: "Shipping city is required!"
            });
        }
        if (!address.shipping.pincode) {
            return res.status(400).json({
                status: false,
                message: "Shipping pincode is required!"
            });
        }
        if (!address.billing.street) {
            return res.status(400).json({
                status: false,
                message: "Billing street is required!"
            });
        }
        if (!address.billing.city) {
            return res.status(400).json({
                status: false,
                message: "Billing city is required!"
            });
        }
        if (!address.billing.pincode) {
            return res.status(400).json({
                status: false,
                message: "Billing pincode is required!"
            });
        }

        // password validation
        if (!password) {
            return res.status(400).json({
                status: false,
                message: "Password is required!"
            });
        }

        // check if password is valid
        if (password.length < 8 || password.length > 15) {
            return res.status(400).json({
                status: false,
                message: "Password must be between 8 and 15 characters!"
            });
        }

        // check if password is valid
        const validPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        if (!validPassword.test(password)) {
            return res.status(400).json({
                status: false,
                message: "Password must contain at least one uppercase, one lowercase, one number and one special character!"
            });
        }

        // hash password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user
        const newUser = await UserModel.create({
            name,
            email,
            phone,
            password: hashedPassword,
            address
        });

        res.status(201).json({
            status: true,
            message: "User created successfully!",
            data: newUser
        });

    } catch(error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
};


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // email validation
        if (!email) {
            return res.status(400).json({
                status: false,
                message: "Email is required!"
            });
        }
        // check if email is valid
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                status: false,
                message: "Invalid email address!"
            });
        }

        // password validation
        if (!password) {
            return res.status(400).json({
                status: false,
                message: "Password is required!"
            });
        }
        // check if password is valid
        const validPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        if (!validPassword.test(password)) {
            return res.status(400).json({
                status: false,
                message: "Password must contain at least one uppercase, one lowercase, one number and one special character!"
            });
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({
                status: false,
                message: "Invalid email or password!"
            });
        }

        // check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({
                status: false,
                message: "Invalid email or password!"
            });
        }

        // generate token
        const token = jwt.sign(
            { 
                userId: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.status(200).json({
            status: true,
            message: "User logged in successfully!",
            data: {
                userId: user._id,
                token
            }
        });

    } catch(error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
};


export {
    registerUser,
    loginUser
}