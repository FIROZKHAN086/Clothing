import React, { useState, useContext, useEffect } from 'react';
import { StoreContext } from '../Context/Context';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaTrash, FaCreditCard, FaMoneyBill, FaMobileAlt, FaClock, FaLock } from 'react-icons/fa';

const Checkout = () => {
  const { cart, removeFromCart, url, token } = useContext(StoreContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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
      navigate('/');
    }
    window.scrollTo(0, 0);
  }, [token, navigate]);

  const total = cart.reduce((sum, item) => {
    let price;
    if (typeof item.price === 'string') {
      price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
    } else {
      price = parseFloat(item.price);
    }
    if (isNaN(price)) {
      price = 0;
    }
    const quantity = item.quantity || 1;
    return sum + (price * quantity);
  }, 0);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calculateEMI = (amount, months) => {
    const interest = 0.15;
    const monthlyInterest = interest / 12;
    const emi = (amount * monthlyInterest * Math.pow(1 + monthlyInterest, months)) / 
               (Math.pow(1 + monthlyInterest, months) - 1);
    return emi.toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert(`Order placed successfully with ${paymentMethod} payment method!`);
      // Clear the cart completely after successful checkout
      cart.splice(0, cart.length);
      localStorage.removeItem('cart');
      navigate('/');
    } catch (error) {
      alert('Payment failed. Please try again.');
    }
    setLoading(false);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
        <div className="text-center bg-white p-12 rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
          <FaShoppingCart className="mx-auto text-7xl text-indigo-600 mb-6 animate-bounce" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some items to proceed with checkout</p>
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-center mb-12">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Secure Checkout
          </h1>
          <FaLock className="ml-4 text-indigo-600 text-2xl" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Order Summary */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-[1.02] transition-transform duration-300">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
              <FaShoppingCart className="mr-4 text-indigo-600" />
              Order Summary
            </h2>
            <div className="space-y-6">
              {cart.map((item) => {
                const itemPrice = typeof item.price === 'string' ? 
                  parseFloat(item.price.replace(/[^0-9.-]+/g, '')) : 
                  item.price;

                return (
                  <div key={item._id} className="flex items-center justify-between p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center space-x-6">
                      <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl shadow-md" />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                        <p className="text-gray-600 mt-1">Quantity: {item.quantity}</p>
                        <p className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mt-2">
                          ${itemPrice.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item)}
                      className="text-red-500 hover:text-red-600 transition-colors p-3 hover:bg-red-50 rounded-full"
                    >
                      <FaTrash className="text-xl" />
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 pt-6 border-t-2 border-indigo-100">
              <div className="flex justify-between items-center text-2xl font-bold">
                <span className="text-gray-800">Total:</span>
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-[1.02] transition-transform duration-300">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
              <FaCreditCard className="mr-4 text-indigo-600" />
              Payment Details
            </h2>
            
            {/* Payment Method Selection */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-6">Select Payment Method</h3>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { id: 'card', icon: FaCreditCard, label: 'Card Payment' },
                  { id: 'cod', icon: FaMoneyBill, label: 'Cash on Delivery' },
                  { id: 'upi', icon: FaMobileAlt, label: 'UPI Payment' },
                  { id: 'emi', icon: FaClock, label: 'EMI' }
                ].map(({ id, icon: Icon, label }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setPaymentMethod(id)}
                    className={`p-6 rounded-2xl border-2 flex flex-col items-center justify-center gap-4 transition-all duration-200 ${
                      paymentMethod === id 
                        ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-500 shadow-md' 
                        : 'hover:bg-gray-50 border-gray-200'
                    }`}
                  >
                    <Icon className={`text-3xl ${paymentMethod === id ? 'text-indigo-600' : 'text-gray-600'}`} />
                    <span className={`font-medium ${paymentMethod === id ? 'text-indigo-600' : 'text-gray-600'}`}>
                      {label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Form fields remain the same but with enhanced styling */}
              {/* Basic Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-200"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-200"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">ZIP Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-200"
                    required
                  />
                </div>
              </div>

              {/* Payment Method Specific Fields */}
              {paymentMethod === 'card' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-200"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Expiry Date</label>
                      <input
                        type="text"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-200"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-200"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'upi' && (
                <div>
                  <label className="block text-gray-700 font-medium mb-2">UPI ID</label>
                  <input
                    type="text"
                    name="upiId"
                    value={formData.upiId}
                    onChange={handleInputChange}
                    placeholder="username@upi"
                    className="w-full px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-200"
                    required
                  />
                </div>
              )}

              {paymentMethod === 'emi' && (
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Select EMI Duration</label>
                  <select
                    name="emiMonths"
                    value={formData.emiMonths}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-200"
                  >
                    <option value="3">3 Months (EMI: ${calculateEMI(total, 3)}/month)</option>
                    <option value="6">6 Months (EMI: ${calculateEMI(total, 6)}/month)</option>
                    <option value="12">12 Months (EMI: ${calculateEMI(total, 12)}/month)</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                onClick={handleSubmit}
                className="w-full mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center space-x-3 text-lg font-semibold"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
                ) : (
                  <>
                    {paymentMethod === 'card' && <FaCreditCard className="text-xl" />}
                    {paymentMethod === 'cod' && <FaMoneyBill className="text-xl" />}
                    {paymentMethod === 'upi' && <FaMobileAlt className="text-xl" />}
                    {paymentMethod === 'emi' && <FaClock className="text-xl" />}
                    <span>
                      {paymentMethod === 'cod' ? 'Place Order' : `Pay $${total.toFixed(2)}`}
                      {paymentMethod === 'emi' && ` (${formData.emiMonths} monthly payments)`}
                    </span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
