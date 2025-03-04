import { Fragment, useState, useEffect, useContext } from 'react'
import gsap from 'gsap'
import { motion } from 'framer-motion';

import { StoreContext } from '../Context/Context';

import { Link } from 'react-router-dom'
import { 
  FaUserAlt, 
  FaUserAltSlash, 
  FaBars, 
  FaSearch, 
  FaShoppingBag, 
  FaTimes,
  FaAngleDown,
  FaCaretDown,
  FaChevronDown,
  FaWindowClose,
  FaTimesCircle,
  FaRegWindowClose
} from 'react-icons/fa';

const navigation = {
  categories: [
    {
      id: 'women',
      name: 'Women',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Basic Tees',
          href: '#',
          imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', href: '#' },
            { name: 'Dresses', href: '#' },
            { name: 'Pants', href: '#' },
            { name: 'Denim', href: '#' },
            { name: 'Sweaters', href: '#' },
            { name: 'T-Shirts', href: '#' },
            { name: 'Jackets', href: '#' },
            { name: 'Activewear', href: '#' },
            { name: 'Browse All', href: '#' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', href: '#' },
            { name: 'Wallets', href: '#' },
            { name: 'Bags', href: '#' },
            { name: 'Sunglasses', href: '#' },
            { name: 'Hats', href: '#' },
            { name: 'Belts', href: '#' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Full Nelson', href: '#' },
            { name: 'My Way', href: '#' },
            { name: 'Re-Arranged', href: '#' },
            { name: 'Counterfeit', href: '#' },
            { name: 'Significant Other', href: '#' },
          ],
        },
      ],
    },
    {
      id: 'men',
      name: 'Men',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
          imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
        },
        {
          name: 'Artwork Tees',
          href: '#',
          imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-02-image-card-06.jpg',
          imageAlt:
            'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', href: '#' },
            { name: 'Pants', href: '#' },
            { name: 'Sweaters', href: '#' },
            { name: 'T-Shirts', href: '#' },
            { name: 'Jackets', href: '#' },
            { name: 'Activewear', href: '#' },
            { name: 'Browse All', href: '#' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', href: '#' },
            { name: 'Wallets', href: '#' },
            { name: 'Bags', href: '#' },
            { name: 'Sunglasses', href: '#' },
            { name: 'Hats', href: '#' },
            { name: 'Belts', href: '#' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Re-Arranged', href: '#' },
            { name: 'Counterfeit', href: '#' },
            { name: 'Full Nelson', href: '#' },
            { name: 'My Way', href: '#' },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: 'Company', href: '#' },
    { name: 'Stores', href: '#' },
  ],
}

export default function Navbar({setLoginpop}) {
  const { cart, token, setToken } = useContext(StoreContext);
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const toggleDropdown = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="bg-white relative z-20 top-0">
      {/* Mobile menu */}
      <div className={`fixed inset-0 z-50 lg:hidden ${showMobileMenu ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={toggleMobileMenu} />

        <div className="fixed inset-y-0 left-0 w-full max-w-sm bg-white shadow-xl overflow-y-auto">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-bold">Menu</h2>
            <button onClick={toggleMobileMenu}>
              <FaTimes className="h-6 w-6" />
            </button>
          </div>

          <div className="p-4">
            {navigation.categories.map((category) => (
              <div key={category.name} className="mb-4">
                <button
                  onClick={() => toggleDropdown(category)}
                  className="flex items-center justify-between w-full py-2"
                >
                  <span className="text-lg font-medium">{category.name}</span>
                  <FaChevronDown className={`transform transition-transform ${selectedCategory === category ? 'rotate-180' : ''}`} />
                </button>

                {selectedCategory === category && (
                  <div className="mt-2 ml-4 space-y-2">
                    {category.sections.map((section) => (
                      <div key={section.name} className="mb-4">
                        <h3 className="font-medium mb-2">{section.name}</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {section.items.map((item) => (
                            <a key={item.name} href={item.href} className="text-gray-600 hover:text-gray-900">
                              {item.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop header */}
      <header className="fixed w-full bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2"
              onClick={toggleMobileMenu}
            >
              <FaBars className="h-6 w-6" />
            </button>

            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold">KING'S FASHION</Link>
            </div>

            {/* Desktop navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigation.categories.map((category) => (
                <div key={category.name} className="relative group">
                  <button className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
                    <span>{category.name}</span>
                    <FaChevronDown className="h-4 w-4" />
                  </button>

                  <div className="absolute top-full left-0 w-screen max-w-md p-4 bg-white shadow-lg rounded-lg hidden group-hover:block">
                    {category.sections.map((section) => (
                      <div key={section.name} className="mb-4">
                        <h3 className="font-medium mb-2">{section.name}</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {section.items.map((item) => (
                            <a key={item.name} href={item.href} className="text-gray-600 hover:text-gray-900">
                              {item.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              {token === "67c624c401a956f0d06313ec" && (
                <Link to="/admin" className="hidden sm:block text-sm font-medium">
                  Admin
                </Link>
              )}

              {token ? (
                <>
                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      setToken(null);
                    }}
                    className="text-sm font-medium"
                  >
                    Logout
                  </button>
                  <Link to="/Cart" className="flex items-center">
                    <FaShoppingBag className="h-6 w-6" />
                    <span className="ml-1">{cart.length}</span>
                  </Link>
                </>
              ) : (
                <button
                  onClick={() => setLoginpop(true)}
                  className="flex items-center space-x-2"
                >
                  <FaUserAlt className="h-6 w-6" />
                  <span className="hidden sm:inline">Sign in</span>
                </button>
              )}

              <button className="p-2">
                <FaSearch className="h-6 w-6" />
              </button>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}
