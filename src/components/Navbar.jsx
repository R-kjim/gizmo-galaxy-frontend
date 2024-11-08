
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const navigate=useNavigate()

  return (
    <nav className="bg-gray-800 text-white fixed top-0 left-0 right-0 z-50">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 justify-between">

        <div className="text-2xl font-bold text-white absolute left-8" onClick={()=>navigate('/')}>
            Gizmo-galaxy
          </div>

          <div className="hidden md:flex flex-grow justify-center items-center space-x-20">
            <Link to="/" className="hover:text-gray-400">Daily Deals</Link>
            <Link to="/client/product-listings" className="hover:text-gray-400">Products</Link>
            <Link to="/" className="hover:text-gray-400">Hot & New</Link>
            <Link to="/" className="hover:text-gray-400">Support</Link>
          </div>

          <div className="flex items-center space-x-10">
            <Link to="/" className="hover:text-gray-400 ">
              <FaSearch />
            </Link>
            <Link to="/cart" className="hover:text-gray-400">
              <FaShoppingCart />
            </Link>
            <Link to="/" className="hover:text-gray-400">
              <FaUser />
            </Link>
            <button className="md:hidden" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 text-center">
            <Link to="/" className="block py-2 hover:text-gray-400">Daily Deals</Link>
            <Link to="/client/product-listings" className="block py-2 hover:text-gray-400">Products</Link>
            <Link to="/" className="block py-2 hover:text-gray-400">Hot & New</Link>
            <Link to="/" className="block py-2 hover:text-gray-400">Support</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
