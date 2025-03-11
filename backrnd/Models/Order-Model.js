import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
        name: String,
        image: String,
        quantity: Number,
        price: Number
    }], 
    totalAmount: {
        type: Number,
        required: true,
    },
    shippingAddress: {
        name: String,
        email: String,
        address: String,
        city: String,
        zipCode: String
    },
    paymentMethod: {
        type: String,
        enum: ['card', 'cod', 'upi', 'emi'],
        required: true,
    },  
    paymentDetails: {
        type: Object,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered'],
        default: 'pending'
    },  
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
