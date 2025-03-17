import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { StoreContext } from '../Context/Context';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import axios from 'axios';

const ProductDetails = ({ setLoginpop }) => {
  const { id } = useParams();
  const { url, addtocart, token } = useContext(StoreContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
        try {
            const response = await axios.get(`${url}/api/product/getAllProducts`);
            const foundProduct = response.data.products.find(p => p._id === id);
            console.log('All products:', response.data);
            
            if (foundProduct) {
                setProduct(foundProduct);
                setError(null);
            } else {
                setError('Product not found');
                setProduct(null);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching product:', error);
            setError('Failed to fetch product details');
            setProduct(null);
            setLoading(false);
        }
    };

    if (id) {
        console.log('Fetching product with ID:', id); // Debug log
        fetchProduct();
    } else {
        setError('Invalid product ID');
        setLoading(false);
        setProduct(null);
    }
  }, [id, url]);

  useEffect(() => {
    console.log('Current product state:', product);
  }, [product]);

  const handleAddToCart = () => {
    if (!token) {
      setLoginpop(true);
      return;
    }
    addtocart(product);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <h2 className="text-2xl font-medium text-red-600">{error}</h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <h2 className="text-2xl font-medium text-gray-600">Product not found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto rounded-2xl shadow-xl"
            />
          </div>

          <div className="space-y-6">
            <div>
              <span className="inline-block px-3 py-1 text-sm font-semibold bg-purple-100 text-purple-600 rounded-full">
                {product.category}
              </span>
              <h1 className="mt-4 text-3xl font-bold text-gray-900">{product.name}</h1>
              <p className="mt-4 text-xl font-bold text-purple-600">${product.price}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900">Description</h2>
              <p className="mt-2 text-gray-600">{product.description}</p>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity duration-300"
              >
                <FaShoppingCart className="mr-2" />
                Add to Cart
              </button>
              <button className="p-3 bg-white rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-300 shadow-md">
                <FaHeart size={20} />
              </button>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-lg font-semibold text-gray-900">Product Details</h2>
              <dl className="mt-4 space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Category</dt>
                  <dd className="mt-1 text-sm text-gray-900">{product.category}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Stock</dt>
                  <dd className="mt-1 text-sm text-gray-900">Available</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
