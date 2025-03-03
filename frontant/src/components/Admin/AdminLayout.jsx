import React, { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaBox, FaUsers, FaChartBar, FaCog } from 'react-icons/fa';

const AdminLayout = () => {
  useEffect(() => {
    window.scrollTo(0, 0);  
  }, []);
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Admin Dashboard</h2>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link to="/admin/dashboard" className="flex items-center p-2 hover:bg-gray-100 rounded">
                <FaChartBar className="mr-3" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/admin/products" className="flex items-center p-2 hover:bg-gray-100 rounded">
                <FaBox className="mr-3" />
                Products
              </Link>
            </li>
            <li>
              <Link to="/admin/users" className="flex items-center p-2 hover:bg-gray-100 rounded">
                <FaUsers className="mr-3" />
                Users
              </Link>
            </li>
            <li>
              <Link to="/admin/settings" className="flex items-center p-2 hover:bg-gray-100 rounded">
                <FaCog className="mr-3" />
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;