import React, { useState, useEffect, useContext } from 'react';
import { StoreContext } from '../Context/Context';
import { useNavigate } from 'react-router-dom';
import { FaShoppingBag, FaCalendar, FaMoneyBill, FaTruck, FaBox, FaMapMarkerAlt, FaCreditCard } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Order = () => {
    const url = "http://localhost:3000";
    const { token } = useContext(StoreContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            toast.error('Please login to view orders');
            navigate('/');
            return;
        }

        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${url}/api/orders/user`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                
                if (response.data.success) {
                    setOrders(response.data.orders);
                } else {
                    toast.error('Failed to fetch orders');
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
                toast.error('Error loading orders');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [token, url, navigate]);

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'processing':
                return 'bg-blue-100 text-blue-800';
            case 'shipped':
                return 'bg-purple-100 text-purple-800';
            case 'delivered':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending':
                return <FaBox className="mr-2" />;
            case 'processing':
                return <FaTruck className="mr-2 animate-bounce" />;
            case 'shipped':
                return <FaTruck className="mr-2" />;
            case 'delivered':
                return <FaMapMarkerAlt className="mr-2" />;
            default:
                return <FaBox className="mr-2" />;
        }
    };

    const formatDate = (dateString) => {
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (error) {
            return 'Invalid Date';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading your orders...</p>
                </div>
            </div>
        );
    }

    if (!orders || orders.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-4">
                <div className="text-center bg-white p-8 md:p-12 rounded-3xl shadow-2xl max-w-md w-full">
                    <FaShoppingBag className="mx-auto text-6xl md:text-7xl text-indigo-600 mb-6 animate-bounce" />
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">No Orders Yet</h2>
                    <p className="text-gray-600 mb-8">Start shopping to create your first order!</p>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full 
                          hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 w-full md:w-auto"
                    >
                        Start Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-8 md:py-16">
            <div className="container mx-auto px-4 max-w-7xl">
                <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Your Orders
                </h1>

                <div className="space-y-6 md:space-y-8">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white rounded-3xl shadow-xl p-4 md:p-6 hover:shadow-2xl transition-all duration-300">
                            {/* Order Header */}
                            <div className="flex flex-wrap gap-4 justify-between items-center mb-6 pb-4 border-b border-gray-100">
                                <div className="flex items-center space-x-4">
                                    <FaCalendar className="text-indigo-600 text-xl" />
                                    <div>
                                        <p className="text-sm text-gray-500">Order Date</p>
                                        <p className="font-medium text-gray-800">
                                            {formatDate(order.createdAt)}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <FaCreditCard className="text-indigo-600 text-xl" />
                                    <div>
                                        <p className="text-sm text-gray-500">Payment Method</p>
                                        <p className="font-medium text-gray-800 capitalize">{order.paymentMethod}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <FaMoneyBill className="text-green-600 text-xl" />
                                    <div>
                                        <p className="text-sm text-gray-500">Total Amount</p>
                                        <p className="text-xl font-bold text-green-600">
                                            ${order.totalAmount?.toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-6">
                                {order.items?.map((item) => (
                                    <div key={item._id} className="flex space-x-4 bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl">
                                        <img 
                                            src={item.image} 
                                            alt={item.name}
                                            className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg shadow-md"
                                        />
                                        <div className="flex flex-col justify-between">
                                            <div>
                                                <h3 className="font-semibold text-gray-800 mb-1">{item.name}</h3>
                                                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                            </div>
                                            <p className="text-indigo-600 font-bold">${item.price?.toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Order Status */}
                            <div className="flex flex-wrap items-center justify-between pt-4 border-t border-gray-100">
                                <div className="flex items-center space-x-2">
                                    <span className="text-gray-600">Shipping Address:</span>
                                    <span className="font-medium text-gray-800">
                                        {order.shippingAddress?.address}, {order.shippingAddress?.city}
                                    </span>
                                </div>
                                <div className={`flex items-center px-4 py-2 rounded-full ${getStatusColor(order.status)}`}>
                                    {getStatusIcon(order.status)}
                                    <span className="font-medium capitalize">{order.status}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Order;
