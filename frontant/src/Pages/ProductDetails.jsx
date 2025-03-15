import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import { StoreContext } from '../Context/Context';

const ProductDetails = () => {
    const { url , addtocart, token } = useContext(StoreContext);
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${url}/api/product/getProductById/${id}`);
                if (response.data.success) {
                    setProduct(response.data.product);
                } else {
                    setError('Product not found');
                }
            } catch (error) {
                console.error('Error fetching product:', error);
                setError('Failed to load product details. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        
        fetchProduct();
    }, [id, url]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-900 to-slate-800">
                <div className="w-20 h-20 border-4 border-teal-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-slate-900 to-slate-800">
                <div className="text-red-400 text-2xl font-bold mb-4">{error}</div>
                <Link 
                    to="/Man" 
                    className="text-teal-400 hover:text-teal-300 transition-colors"
                >
                    ← Back to Products
                </Link>
            </div>
        );
    }

    return (
        <div className="relative z-10 min-h-screen bg-gradient-to-r from-slate-900 to-slate-800 text-white pt-[100px]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link 
                    to="/Man" 
                    className="inline-block mb-8 text-teal-400 hover:text-teal-300 transition-colors"
                >
                    ← Back to Products
                </Link>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 p-8 bg-white/5 rounded-3xl backdrop-blur-sm">
                    {/* Product Image */}
                    <div className="relative h-[500px] overflow-hidden rounded-2xl">
                        <motion.img 
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                        />
                        {product.badge && (
                            <div className="absolute top-4 left-4 bg-gradient-to-r from-teal-400 to-purple-500 text-white px-4 py-2 rounded-xl text-sm font-bold">
                                {product.badge}
                            </div>
                        )}
                    </div>

                    {/* Product Details */}
                    <div className="space-y-8"> 
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent">
                            {product.name}
                        </h1>
                        
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-4">
                                <div className="flex text-teal-400">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar 
                                            key={i} 
                                            className={`w-6 h-6 ${i < Math.floor(product.rating || 0) ? 'fill-current' : 'text-slate-600'}`} 
                                        />
                                    ))}
                                </div>
                                <span className="text-slate-400">
                                    ({product.reviews || 0} reviews)
                                </span>
                            </div>
                            
                            <span className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent">
                                ${product.price?.toFixed(2) || '0.00'}
                            </span>
                        </div>

                        <div className="bg-white/5 p-6 rounded-xl">
                            <h2 className="text-xl font-semibold mb-4">Description</h2>
                            <p className="text-slate-300 text-lg leading-relaxed">
                                {product.description}
                            </p>
                        </div>
                        
                        {token && (
                            <div className="flex items-center gap-4 pt-6">
                                <button 
                                    onClick={() => addtocart(product)}
                                    className="w-full bg-gradient-to-r from-teal-400 to-purple-500 text-white px-8 py-4 rounded-xl font-medium hover:shadow-lg hover:shadow-teal-500/30 transform hover:scale-105 transition-all duration-300 focus:ring-4 focus:ring-teal-400/20"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
