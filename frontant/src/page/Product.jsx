import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { StoreContext } from '../Context/Context';
import { motion } from 'framer-motion';

const Product = () => {
  const { id } = useParams();
  const { addtocart, categories } = useContext(StoreContext);

  if (!categories) {
    return (
      <div className="relative top-[100px] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-medium text-gray-600">Loading...</h2>
      </div>
    );
  }

  const product = categories.flatMap(cat => cat.products).find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="relative top-[100px] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-medium text-gray-600">Product not found</h2>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product) {
      addtocart(product);
      // Optional: Add some feedback for the user
      alert('Product added to cart!');
    }
  };

  return (
    <div className="relative top-[100px] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200"
        >
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-2xl font-medium text-gray-900 mb-6">{product.price}</p>
            <div className="prose prose-sm text-gray-500 mb-8">
              <p>Experience luxury and comfort with our premium collection. This piece combines 
              modern design with timeless elegance, perfect for any occasion.</p>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 
            transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add to Cart
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Product;
