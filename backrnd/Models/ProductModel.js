import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide product name"],
        trim: true,
        maxLength: [100, "Name cannot exceed 100 characters"]
    },
    price: {
        type: Number,
        required: [true, "Please provide product price"],
        min: [0, "Price cannot be negative"]
    },
    description: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        required: [true, "Please provide product category"],
        trim: true
    },
    image: {
        type: String,
        required: [true, "Please provide product image"]
    },
    rating: {
        type: Number,
        required: true,
        default: 0,
        min: [0, "Rating cannot be below 0"],
        max: [5, "Rating cannot exceed 5"]
    },
    reviews: {
        type: Number,
        required: true,
        default: 0,
        min: [0, "Reviews cannot be negative"]
    },
    badge: {
        type: String,
        required: true,
        enum: ["new", "sale", "featured", "none"]  // Add valid badge types
    }
}, {
    timestamps: true
});

const Product =  mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
