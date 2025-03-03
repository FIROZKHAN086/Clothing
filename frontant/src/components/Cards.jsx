import { useState , useContext } from 'react';
import { motion } from 'framer-motion';
import { StoreContext } from '../Context/Context';
import { Link, Links } from 'react-router-dom';

export default function Cards({setLoginpop}) {
  const { addtocart, categories, quantity, token } = useContext(StoreContext);
  const [selectedCategory, setSelectedCategory] = useState('trending');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Category Navigation */}
      <div className="flex space-x-4 mb-8 overflow-x-auto pb-4 
        [&::-webkit-scrollbar]:h-2
        [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-track]:bg-gray-100
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-indigo-600
        [&::-webkit-scrollbar-thumb]:hover:bg-gray-400">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category.id
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories
          .find((cat) => cat.id === selectedCategory)
          ?.products.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="group relative"
            >
              <Link to={`/Product/${product.id}`}>
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      {product.name}
                    </h3>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{product.price}</p>
                </div>
              </Link>
              
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {token ? (
                  <button 
                    onClick={() => addtocart(product)}
                    className="mt-2 w-full bg-indigo-600 text-white py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <button 
                    onClick={() => setLoginpop(true)}
                    className="mt-2 w-full bg-indigo-600 text-white py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Login to Add to Cart
                  </button>
                )}
              </motion.div>
            </motion.div>
          ))}
      </div>
    </div>
  );
}
