import mongoose from "mongoose";

const userSchma = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (email) => {
                const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
                return emailRegex.test(email);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (phone) => {
                const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
                return phoneRegex.test(phone);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    address: {
        shipping: {
            street: {
                type: String, 
                required: true,
            },
            city: {
                type: String, 
                required: true,
            },
            pincode: {
                type: Number, 
                required: true,
            }
        },
        billing: {
            street: {
                type: String,
                required: true, 
            },
            city: {
                type: String, 
                required: true,
            },
            pincode: {
                type: Number, 
                required: true,
            }
        }
    },
}, { timestamps: true });

export default mongoose.model("User", userSchma);