import React, { useState } from "react";
import { FaShoppingCart, FaCreditCard, FaBoxOpen, FaList } from "react-icons/fa";
import Cart from "./Cart";
import Checkout from "./Checkout";
import ProductCard from "./ProductCard";
import ProductListing from "./ProductListing";

const Dashboard = () => {

  const [activeSection, setActiveSection] = useState("cart");

  const renderSection = () => {
    switch (activeSection) {
      case "cart":
        return <Cart />;
      case "checkout":
        return <Checkout />;
      case "productCard":
        return <ProductCard />;
      case "productListing":
        return <ProductListing />;
      default:
        return <Cart />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-1/4 bg-white shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Dashboard Menu</h2>
        <ul className="space-y-4">
          <li>
            <button
              className={`flex items-center w-full text-left py-2 px-4 rounded transition-colors duration-200 ${
                activeSection === "cart" ? "bg-gray-200 font-semibold text-blue-600" : "hover:bg-gray-100 text-gray-600"
              }`}
              onClick={() => setActiveSection("cart")}
            >
              <FaShoppingCart className="mr-3" />
              Cart
            </button>
          </li>
          <li>
            <button
              className={`flex items-center w-full text-left py-2 px-4 rounded transition-colors duration-200 ${
                activeSection === "checkout" ? "bg-gray-200 font-semibold text-blue-600" : "hover:bg-gray-100 text-gray-600"
              }`}
              onClick={() => setActiveSection("checkout")}
            >
              <FaCreditCard className="mr-3" />
              Checkout
            </button>
          </li>
          <li>
            <button
              className={`flex items-center w-full text-left py-2 px-4 rounded transition-colors duration-200 ${
                activeSection === "productCard" ? "bg-gray-200 font-semibold text-blue-600" : "hover:bg-gray-100 text-gray-600"
              }`}
              onClick={() => setActiveSection("productCard")}
            >
              <FaBoxOpen className="mr-3" />
              Product Card
            </button>
          </li>
          <li>
            <button
              className={`flex items-center w-full text-left py-2 px-4 rounded transition-colors duration-200 ${
                activeSection === "productListing" ? "bg-gray-200 font-semibold text-blue-600" : "hover:bg-gray-100 text-gray-600"
              }`}
              onClick={() => setActiveSection("productListing")}
            >
              <FaList className="mr-3" />
              Product Listing
            </button>
          </li>
        </ul>
      </aside>

      <main className="w-3/4 p-8">
        {renderSection()}
      </main>
    </div>
  );
};

export default Dashboard;
