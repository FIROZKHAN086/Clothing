import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../../Context/Context';

const ProductsList = () => {
  const { url } = useContext(StoreContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${url}/api/product/getAllProducts`);
      setProducts(response.data.products);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
          await axios.delete(`${url}/api/product/deleteProduct/${id}`);
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4 mt-10 md:p-6 lg:p-8">
      <div className="flex  flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-xl md:text-2xl font-semibold">Products Management</h2>
        <Link 
          to="/admin/products/add" 
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center w-full sm:w-auto justify-center"
        >
          <FaPlus className="mr-2" /> Add Product
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th className="hidden md:table-cell px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="px-4 md:px-6 py-4">
                  <img src={product.image} alt={product.name} className="h-10 w-10 md:h-12 md:w-12 object-cover rounded" />
                </td>
                <td className="px-4 md:px-6 py-4 text-sm md:text-base">{product.name}</td>
                <td className="px-4 md:px-6 py-4 text-sm md:text-base">${product.price}</td>
                <td className="hidden md:table-cell px-4 md:px-6 py-4 text-sm md:text-base">{product.category}</td>
                <td className="px-4 md:px-6 py-4">
                  <div className="flex space-x-3">
                    <Link 
                      to={`/admin/products/edit/${product._id}`}
                      className="text-blue-500 hover:text-blue-700 text-lg"
                    >
                      <FaEdit />
                    </Link>
                    <button 
                      onClick={() => handleDelete(product._id)}
                      className="text-red-500 hover:text-red-700 text-lg"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsList;