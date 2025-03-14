import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Category = () => {
  const categories = [
    {
      id: 1,
      name: "Men's Collection",
      image: "https://images.unsplash.com/photo-1617137968427-85924c800a22",
      path: "/Man",
      description: "Sophisticated styles for modern men"
    },
    {
      id: 2,
      name: "Women's Collection", 
      image: "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95",
      path: "/woman",
      description: "Elegant fashion for contemporary women"
    },
    {
      id: 3,
      name: "Kids Fashion",
      image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8",
      path: "/kids",
      description: "Playful and comfortable clothing for children"
    },
    {
      id: 4,
      name: "Accessories",
      image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49",
      path: "/accessories",
      description: "Complete your look with trendy accessories"
    },
    {
      id: 5,
      name: "Teen Fashion",
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
      path: "/teen",
      description: "Cool and trendy styles for teenagers"
    },
    {
      id: 6,
      name: "Sports & Active Wear",
      image: "https://images.unsplash.com/photo-1576678927484-cc907957088c",
      path: "/sports",
      description: "Performance wear for active lifestyles"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Explore Our Collections
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover fashion that speaks to your style across all our categories
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link 
                to={category.path}
                className="block group"
              >
                <div className="relative overflow-hidden rounded-2xl shadow-xl">
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                        {category.name}
                      </h3>
                      <p className="text-gray-200 text-sm sm:text-base opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-20"
        >
          <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Shopping Made Better
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 hover:bg-gray-50 rounded-xl transition-colors duration-300">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
                <p className="text-gray-600">Curated selection of the finest fashion items</p>
              </div>
              <div className="text-center p-6 hover:bg-gray-50 rounded-xl transition-colors duration-300">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
                <p className="text-gray-600">Quick and reliable shipping worldwide</p>
              </div>
              <div className="text-center p-6 hover:bg-gray-50 rounded-xl transition-colors duration-300">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
                <p className="text-gray-600">Competitive prices on all products</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Category;

