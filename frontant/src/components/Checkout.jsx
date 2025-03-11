import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../Context/Context';
import { FaCreditCard, FaMoneyBill, FaMobileAlt, FaClock } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Checkout = () => {
    const url = "http://localhost:3000";
    const { cart, token, clearfromcart } = useContext(StoreContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        zipCode: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        upiId: '',
        emiMonths: '3'
    });

    useEffect(() => {
        if (!token) {
            toast.error('Please login to continue');
            navigate('/');
            return;
        }
        if (cart.length === 0) {
            toast.error('Your cart is empty');
            navigate('/');
        }
    }, [token, cart, navigate]);

    const total = cart.reduce((sum, item) => {
        const price = typeof item.price === 'string' ? 
            parseFloat(item.price.replace(/[^0-9.-]+/g, '')) : 
            item.price;
        return sum + (price * (item.quantity || 1));
    }, 0);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const calculateEMI = (amount, months) => {
        const interest = 0.15;
        const monthlyInterest = interest / 12;
        const emi = (amount * monthlyInterest * Math.pow(1 + monthlyInterest, months)) / 
                   (Math.pow(1 + monthlyInterest, months) - 1);
        return emi.toFixed(2);
    };

    const validateForm = () => {
        const requiredFields = ['name', 'email', 'address', 'city', 'zipCode'];
        
        if (paymentMethod === 'card') {
            requiredFields.push('cardNumber', 'expiryDate', 'cvv');
        } else if (paymentMethod === 'upi') {
            requiredFields.push('upiId');
        }

        for (let field of requiredFields) {
            if (!formData[field]) {
                toast.error(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
                return false;
            }
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        
        setLoading(true);
        try {
            const orderData = {
                items: cart.map(item => ({
                    productId: item._id,
                    name: item.name,
                    image: item.image,
                    quantity: item.quantity || 1,
                    price: typeof item.price === 'string' ? 
                        parseFloat(item.price.replace(/[^0-9.-]+/g, '')) : 
                        item.price
                })),
                totalAmount: total,
                shippingAddress: {
                    name: formData.name,
                    email: formData.email,
                    address: formData.address,
                    city: formData.city,
                    zipCode: formData.zipCode
                },
                paymentMethod,
                paymentDetails: paymentMethod === 'card' ? {
                    cardNumber: formData.cardNumber.replace(/\D/g, '').slice(-4),
                    expiryDate: formData.expiryDate,
                } : paymentMethod === 'upi' ? {
                    upiId: formData.upiId
                } : paymentMethod === 'emi' ? {
                    months: formData.emiMonths,
                    monthlyAmount: calculateEMI(total, parseInt(formData.emiMonths))
                } : { type: 'cod' }
            };

            const response = await axios.post(`${url}/api/orders/create`, orderData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.success) {
                clearfromcart();
                toast.success('Order placed successfully!');
                navigate('/orders');
            }
        } catch (error) {
            console.error('Order creation failed:', error);
            toast.error(error.response?.data?.message || 'Failed to place order');
        } finally {
            setLoading(false);
        }
    };

    // ... rest of your JSX code ...
};

export default Checkout; 