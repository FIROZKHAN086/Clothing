import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FaBox, FaUsers, FaChartBar, FaCog, FaBars, FaTimes, FaHouseDamage, FaHouseUser } from 'react-icons/fa';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navItems = [
    { path: '/admin/dashboard', icon: FaChartBar, label: 'Dashboard' },
    { path: '/admin/products', icon: FaBox, label: 'Products' },
    { path: '/admin/users', icon: FaUsers, label: 'Users' },
    { path: '/admin/settings', icon: FaCog, label: 'Settings' },
    { path: '/', icon: FaHouseUser, label: 'Home' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Mobile Sidebar Toggle */}
      <button
        className="fixed top-4 left-4 z-50 lg:hidden bg-indigo-600 text-white p-2 rounded-lg shadow-lg"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full bg-white shadow-2xl transition-transform duration-300 z-40 
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 w-64`}>
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Admin Portal
          </h2>
        </div>
        
        <nav className="p-4 mt-4">
          <ul className="space-y-3">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center p-3 rounded-xl transition-all duration-200 group
                      ${isActive 
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                        : 'hover:bg-indigo-50 text-gray-700'}`}
                  >
                    <item.icon className={`mr-3 text-xl ${isActive ? 'text-white' : 'text-indigo-600'}`} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'ml-0'}`}>
        <div className="min-h-screen p-4 lg:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;