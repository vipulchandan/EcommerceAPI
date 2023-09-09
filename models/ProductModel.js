import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        validate: {
            validator: (price) => {
                return price > 0 && !isNaN(price) && isFinite(price);
            },
            message: props => `${props.value} is not a valid price!`
        }
    },
    description: {
        type: String,
        required: true
    },
    availability: {
        type: Boolean,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, { timestamps: true });

export default mongoose.model("Product", productSchema);