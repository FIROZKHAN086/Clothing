import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { StoreContext } from '../../Context/Context';
import gsap from 'gsap';
import axios from 'axios';

const Man = () => {
    const { token, url, addtocart } = useContext(StoreContext);
    const [sortBy, setSortBy] = useState('default');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [hoveredProduct, setHoveredProduct] = useState(null);
    const [categories, setCategories] = useState(['All Categories']);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${url}/api/product/getAllProducts`);
            if (response.data.success) {
                setProducts(response.data.products);
                const uniqueCategories = ['All Categories', ...new Set(response.data.products.map(p => p.category))];
                setCategories(uniqueCategories);
            } else {
                setError('Failed to fetch products');
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
        gsap.from('.hero-section', {
            duration: 1.5,
            y: -100,
            opacity: 0,
            ease: 'power4.out'
        });
        
        gsap.from('.category-filters', {
            duration: 1,
            x: -100,
            opacity: 0,
            ease: 'back.out(1.7)',
            delay: 0.5
        });
        
        gsap.from('.product-card', {
            duration: 1,
            scale: 0.8,
            opacity: 0,
            stagger: 0.2,
            ease: 'elastic.out(1, 0.8)',
            delay: 1
        });
    }, []);

    const sortProducts = (products) => {
        let sortedProducts = [...products];
        switch (sortBy) {
            case 'price-low-high':
                return sortedProducts.sort((a, b) => a.price - b.price);
            case 'price-high-low':
                return sortedProducts.sort((a, b) => b.price - a.price);
            case 'rating':
                return sortedProducts.sort((a, b) => b.rating - a.rating);
            case 'reviews':
                return sortedProducts.sort((a, b) => b.reviews - a.reviews);
            default:
                return sortedProducts;
        }
    };

    const filterProducts = (products) => {
        if (selectedCategory === 'All Categories') return products;
        return products.filter(product => product.category === selectedCategory);
    };

    const displayProducts = sortProducts(filterProducts(products));

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-900 to-slate-800">
                <div className="w-20 h-20 border-4 border-teal-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-900 to-slate-800">
                <div className="text-red-400 text-2xl font-bold">{error}</div>
            </div>
        );
    }

    return (
        <div className="relative z-10 min-h-screen bg-gradient-to-r from-slate-900 to-slate-800 text-white pt-[100px]">
            <div className="max-w-8xl mx-auto px-6 lg:px-12">
                {/* Hero Section */}
                <motion.div 
                    className="hero-section text-center mb-20 py-16 bg-gradient-to-r from-teal-500/10 to-purple-500/10 rounded-3xl backdrop-blur-sm"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-6xl font-black mb-6 bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent">
                        Luxury Men's Collection
                    </h1>
                    <p className="text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                        Elevate your style with our curated selection of premium menswear
                    </p>
                </motion.div>

                {/* Filters Section */}
                <div className="category-filters backdrop-blur-md bg-white/5 rounded-2xl p-8 mb-16">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
                        <div className="flex flex-wrap gap-4">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-8 py-3 rounded-xl transition-all duration-500 text-lg font-medium ${
                                        selectedCategory === category
                                            ? 'bg-gradient-to-r from-teal-400 to-purple-500 text-white shadow-lg shadow-teal-500/20 transform scale-105'
                                            : 'bg-white/10 text-slate-300 hover:bg-white/20'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                        <select 
                            className="px-6 py-3 rounded-xl bg-white/10 text-slate-300 border-2 border-white/20 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 transition-all duration-300 text-lg"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="default" className="bg-slate-800">Sort by</option>
                            <option value="price-low-high" className="bg-slate-800">Price: Low to High</option>
                            <option value="price-high-low" className="bg-slate-800">Price: High to Low</option>
                            <option value="rating" className="bg-slate-800">Highest Rated</option>
                            <option value="reviews" className="bg-slate-800">Most Reviewed</option>
                        </select>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10">
                    {displayProducts.map((product) => (
                        <motion.div
                            key={product._id}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="product-card group relative bg-gradient-to-b from-white/10 to-white/5 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-teal-500/20 transition-all duration-500 transform hover:-translate-y-2"
                            onMouseEnter={() => setHoveredProduct(product._id)}
                            onMouseLeave={() => setHoveredProduct(null)}
                        >
                            <Link to={`/ProductDetails/${product._id}`}>
                                <div className="relative h-96 overflow-hidden">
                                    <motion.img 
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                        initial={false}
                                        animate={{ 
                                            scale: hoveredProduct === product._id ? 1.1 : 1,
                                            filter: hoveredProduct === product._id ? 'brightness(1.2)' : 'brightness(1)'
                                        }}
                                        transition={{ duration: 0.5 }}
                                    />
                                    {product.badge && (
                                        <div className="absolute top-6 left-6 bg-gradient-to-r from-teal-400 to-purple-500 text-white px-4 py-2 rounded-xl text-sm font-bold">
                                            {product.badge}
                                        </div>
                                    )}
                                </div>
                            </Link>
                            
                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-white mb-4">{product.name}</h3>
                                <div className="flex items-center mb-6">
                                    <div className="flex text-teal-400">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className={`w-6 h-6 ${i < Math.floor(product.rating || 0) ? 'fill-current' : 'text-slate-600'}`} viewBox="0 0 20 20">
                                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="ml-3 text-slate-400">({product.reviews || 0} reviews)</span>
                                </div>
                                
                                <div className="flex justify-between items-center">
                                    <span className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent">
                                        ${product.price?.toFixed(2) || '0.00'}
                                    </span>
                                    {token && (
                                       <Link to={`/ProductDetails/${product._id}`}><button 
                                            // onClick={() => addtocart(product)}
                                            className=" cursor-pointer z-10 bg-gradient-to-r from-teal-400 to-purple-500 text-white px-8 py-4 rounded-xl font-medium hover:shadow-lg hover:shadow-teal-500/30 transform hover:scale-105 transition-all duration-300 focus:ring-4 focus:ring-teal-400/20"
                                        >
                                            Add to Cart
                                        </button></Link>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Man;