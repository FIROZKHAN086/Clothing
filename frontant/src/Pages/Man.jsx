import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { StoreContext } from '../Context/Context';
import { FaShoppingCart, FaHeart, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Man = ({ setLoginpop }) => {
  const { url, addtocart, token } = useContext(StoreContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${url}/api/product/getAllProducts`);
      setProducts(response.data.products);
      const uniqueCategories = [...new Set(response.data.products.map(p => p.category))];
      setCategories(uniqueCategories);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    if (!token) {
      setLoginpop(true);
      return;
    }
    addtocart(product);
  };

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mt-10 mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-red-500">
          Discover Our Collection
        </h1>
        
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-2.5 rounded-full transition-all duration-300 transform hover:scale-105 ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg'
                : 'bg-white shadow-md hover:shadow-xl'
            }`}
          >
            All Products
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2.5 rounded-full transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg'
                  : 'bg-white shadow-md hover:shadow-xl'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="group relative"
              onMouseEnter={() => setHoveredProduct(product._id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:scale-105">
                <div className="aspect-w-3 aspect-h-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  />
                  {hoveredProduct === product._id && (
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center space-x-4 transition-opacity duration-300">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="p-3 bg-white rounded-full text-purple-600 hover:bg-purple-600 hover:text-white transition-colors duration-300"
                      >
                        <FaShoppingCart size={20} />
                      </button>
                      <button className="p-3 bg-white rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-300">
                        <FaHeart size={20} />
                      </button>
                      <Link to={`/Product/${product._id}`}><button className="p-3 bg-white rounded-full text-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-300">
                        <FaSearch size={20} />
                      </button></Link>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <span className="inline-block px-3 py-1 text-xs font-semibold bg-purple-100 text-purple-600 rounded-full mb-3">
                    {product.category}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-purple-600">${product.price}</span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity duration-300"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Man;
