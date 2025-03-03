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
      <div className={`relative z-40 lg:hidden ${showMobileMenu ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black/25" onClick={toggleMobileMenu} />

        <div className="fixed inset-0 z-40 flex">
          <div className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
            <div className="flex px-4 pb-2 pt-5">
              <button
                type="button"
                onClick={toggleMobileMenu}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <FaTimes className="size-6" />
              </button>
            </div>

            {/* Links */}
            <div className="mt-2">
              <div className="border-b border-gray-200">
                <div className="-mb-px flex space-x-8 px-4">
                  {navigation.categories.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => toggleDropdown(category)}
                      className="flex items-center flex-1 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-base font-medium text-gray-900"
                    >
                      {category.name}
                      <FaChevronDown className={`ml-2 transition-transform ${selectedCategory === category ? 'rotate-180' : ''}`} />
                    </button>
                  ))}
                </div>
              </div>

              {navigation.categories.map((category) => (
                <div 
                  key={category.name} 
                  className={`space-y-10 px-4 pb-8 pt-10 ${selectedCategory === category ? 'block' : 'hidden'}`}
                >
                  {/* Category content */}
                  <div className="grid grid-cols-2 gap-x-4">
                    {category.featured.map((item) => (
                      <div key={item.name} className="group relative text-sm">
                        <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                          <img src={item.imageSrc} alt={item.imageAlt} className="object-cover object-center" />
                        </div>
                        <a href={item.href} className="mt-6 block font-medium text-gray-900">
                          <span className="absolute inset-0 z-10" aria-hidden="true" />
                          {item.name}
                        </a>
                        <p aria-hidden="true" className="mt-1">Shop now</p>
                      </div>
                    ))}
                  </div>
                  {category.sections.map((section) => (
                    <div key={section.name}>
                      <p className="font-medium text-gray-900">{section.name}</p>
                      <ul role="list" className="mt-6 flex flex-col space-y-6">
                        {section.items.map((item) => (
                          <li key={item.name} className="flow-root">
                            <a href={item.href} className="-m-2 block p-2 text-gray-500">
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {navigation.pages.map((page) => (
                <div key={page.name} className="flow-root">
                  <a href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                    {page.name}
                  </a>
                </div>
              ))}
            </div>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              <div className="flow-root">
                {token ? (
                  <button 
                    onClick={() => {
                      localStorage.removeItem("token");
                      setToken(null);
                    }}
                    className="text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    onClick={() => setLoginpop(true)}
                    className="text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    Sign in
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <header className="fixed z-10 w-screen bg-white">
        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center justify-between">
              <button
                type="button"
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={toggleMobileMenu}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <FaBars className="size-6" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <a href="#">
                  <h1 className="h-8 w-auto font-bold text-2xl">KING'S FASHION</h1>
                </a>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center lg:space-x-6">
                {navigation.categories.map((category) => (
                  <div key={category.name} className="relative">
                    <button
                      onClick={() => toggleDropdown(category)}
                      className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {category.name}
                      <FaChevronDown className={`transition-transform ${selectedCategory === category ? 'rotate-180' : ''}`} />
                    </button>

                    {selectedCategory === category && (
                      <div className="absolute left-0 mt-2 w-screen max-w-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="p-4">
                          {category.sections.map((section) => (
                            <div key={section.name} className="mb-4">
                              <p className="text-sm font-medium text-gray-900">{section.name}</p>
                              <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2">
                                {section.items.map((item) => (
                                  <a
                                    key={item.name}
                                    href={item.href}
                                    className="text-sm text-gray-500 hover:text-gray-700"
                                  >
                                    {item.name}
                                  </a>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {navigation.pages.map((page) => (
                  <a
                    key={page.name}
                    href={page.href}
                    className="text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    {page.name}
                  </a>
                ))}
              </div>

              {/* Right side icons */}
              <div className="flex items-center">
                {token === "67c624c401a956f0d06313ec" && (
                  <Link to="/admin" className="text-sm font-medium text-gray-700 hover:text-gray-800 mr-4">
                    Admin
                  </Link>
                )}

                {token ? (
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => {
                        localStorage.removeItem("token");
                        setToken(null);
                      }}
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Logout
                    </button>
                    <Link to="/Cart" className="flex items-center space-x-2">
                      <FaShoppingBag className="size-6 text-gray-400 hover:text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">{cart.length}</span>
                    </Link>
                  </div>
                ) : (
                  <button
                    onClick={() => setLoginpop(true)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-gray-800"
                  >
                    <FaUserAlt className="size-6" />
                    <span className="text-sm font-medium">Sign in</span>
                  </button>
                )}

                <a href="#" className="ml-4 p-2 text-gray-400 hover:text-gray-500">
                  <FaSearch className="size-6" />
                </a>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}
