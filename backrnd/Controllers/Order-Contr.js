import Order from "../Models/Order-Model.js";
import User from "../Models/User-Model.js";

export const createOrder = async (req, res) => {
    try {
        const { items, totalAmount, shippingAddress, paymentMethod, paymentDetails } = req.body;
        const userId = req.user._id;

        // Validate user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Create order with all necessary details
        const order = new Order({
            userId,
            items: items.map(item => ({
                productId: item.productId,
                name: item.name,
                image: item.image,
                quantity: item.quantity,
                price: item.price
            })),
            totalAmount,
            shippingAddress,
            paymentMethod,
            paymentDetails,
            status: 'pending'
        });

        await order.save();
        res.status(201).json({ 
            success: true, 
            message: "Order created successfully",
            order 
        });
    } catch (error) {
        console.error('Order creation error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getUserOrders = async (req, res) => {
    try {
        const userId = req.user._id;
        const orders = await Order.find({ userId })
            .sort({ createdAt: -1 });
        res.status(200).json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getOrder = async (req, res) => {
    const Order = await Order.find();
    res.status(200).json(Order);
}

export default { createOrder, getUserOrders, getOrder };