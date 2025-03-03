import React, { useContext, useEffect, useState , } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { StoreContext } from '../../Context/Context';
import gsap from 'gsap';



const Man = () => {
    const { token } = useContext(StoreContext);
  const { addtocart } = useContext(StoreContext);
  const [sortBy, setSortBy] = useState('default');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [hoveredProduct, setHoveredProduct] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // GSAP animation for page load
    gsap.from('.category-filters', {
      duration: 1,
      y: -50,
      opacity: 0,
      ease: 'power3.out'
    });
    
    gsap.from('.product-grid', {
      duration: 1,
      y: 100,
      opacity: 0,
      stagger: 0.1,
      ease: 'power3.out',
      delay: 0.5
    });
  }, []);

  const products = [
    {
      id: 1,
      name: "Premium Cotton T-Shirt",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
      hoverImage: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80",
      category: "T-Shirts",
      rating: 4.5,
      reviews: 128,
      badge: "New Arrival"
    },
    {
      id: 2,
      name: "Designer Slim Fit Jeans",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d",
      hoverImage: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80",
      category: "Jeans",
      rating: 4.8,
      reviews: 95,
      badge: "Trending"
    },
    // Add more products with similar structure...
  ];

  const categories = ['All Categories', 'T-Shirts', 'Shirts', 'Jeans', 'Shoes', 'Outerwear'];

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

  return (
    <div className="relative z-10 top-[100px] min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
            Men's Collection
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our latest styles crafted for the modern gentleman
          </p>
        </motion.div>

        {/* Filters Section */}
        <div className="category-filters bg-white rounded-xl shadow-lg p-6 mb-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-wrap gap-3">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-indigo-600 text-white shadow-lg transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <select 
              className="px-4 py-2 rounded-lg border-2 border-indigo-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Sort by</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviewed</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="product-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {displayProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <Link to={`/product/${product.id}`}>
                <div className="relative h-80 overflow-hidden">
                  <motion.img 
                    src={hoveredProduct === product.id ? product.hoverImage : product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    initial={false}
                    animate={{ scale: hoveredProduct === product.id ? 1.1 : 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  {product.badge && (
                    <div className="absolute top-4 left-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {product.badge}
                    </div>
                  )}
                </div>
              </Link>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">({product.reviews})</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-indigo-600">${product.price.toFixed(2)}</span>
                 {token? <button 
                    onClick={() => addtocart(product)}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transform hover:scale-105 transition-all duration-300 focus:ring-4 focus:ring-indigo-200"
                  >
                    Add to Cart
                  </button>:<></>}
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


