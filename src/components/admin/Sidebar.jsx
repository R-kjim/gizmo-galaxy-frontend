import React, { useState } from "react";
import { 
  FaBox, FaUser, FaUsers, FaChartBar, FaClipboardList, FaTags, 
  FaFileInvoiceDollar
} from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <aside
      className={`h-screen ${
        isCollapsed ? "w-16 items-center" : "w-64"
      } bg-gray-800 text-white fixed transition-all duration-300 shadow-md flex flex-col`}
    >
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
        <h2 className={`text-xl font-semibold ${isCollapsed ? "hidden" : ""}`}>
          Admin Dashboard
        </h2>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-400 hover:text-white focus:outline-none"
        >
          {isCollapsed ? "☰" : "✕"}
        </button>
      </div>
      <nav className={`flex-grow p-4 overflow-y-auto ${isCollapsed ? "flex flex-col items-center" : ""}`}>
        <ul className={`${isCollapsed ? "space-y-8" : "space-y-2"}`}>
          {/* Products */}
          <li className={`${isCollapsed ? "flex justify-center" : ""}`}>
            <div
              className={`flex items-center ${
                isCollapsed ? "justify-center" : "justify-between"
              } hover:bg-gray-700 p-3 rounded cursor-pointer transition duration-200 w-full`}
              onClick={() => toggleSection("products")}
            >
              <div className={`flex items-center ${isCollapsed ? "justify-center" : ""} gap-2`}>
                <FaBox className="text-xl" />
                {!isCollapsed && <span>Products</span>}
              </div>
              {!isCollapsed &&
                (openSections.products ? (
                  <IoIosArrowDown />
                ) : (
                  <IoIosArrowForward />
                ))}
            </div>
            {openSections.products && !isCollapsed && (
              <ul className="mt-2 space-y-1">
                <li className="hover:text-gray-300 text-gray-400 text-sm">
                  <a href="/admin/products" className="block p-2 hover:bg-gray-700 rounded">View Products</a>
                </li>
                <li className="hover:text-gray-300 text-gray-400 text-sm">
                  <a href="/admin/add-product" className="block p-2 hover:bg-gray-700 rounded">Add Product</a>
                </li>
              </ul>
            )}
          </li>

          {/* Users */}
          <li className={`${isCollapsed ? "flex justify-center" : ""}`}>
            <div
              className={`flex items-center ${
                isCollapsed ? "justify-center" : "justify-between"
              } hover:bg-gray-700 p-3 rounded cursor-pointer transition duration-200 w-full`}
              onClick={() => toggleSection("users")}
            >
              <div className={`flex items-center ${isCollapsed ? "justify-center" : ""} gap-2`}>
                <FaUsers className="text-xl" />
                {!isCollapsed && <span>Users</span>}
              </div>
              {!isCollapsed &&
                (openSections.users ? (
                  <IoIosArrowDown />
                ) : (
                  <IoIosArrowForward />
                ))}
            </div>
            {openSections.users && !isCollapsed && (
              <ul className="ml-6 mt-2 space-y-1">
                <li className="hover:text-gray-300 text-gray-400 text-sm">
                  <a href="/admin/users" className="block p-2 hover:bg-gray-700 rounded">View Users</a>
                </li>
                <li className="hover:text-gray-300 text-gray-400 text-sm">
                  <a href="/admin/add-user" className="block p-2 hover:bg-gray-700 rounded">Add User</a>
                </li>
              </ul>
            )}
          </li>

          {/* Categories */}
          <li className={`${isCollapsed ? "flex justify-center" : ""} flex items-center gap-2 hover:bg-gray-700 p-3 rounded transition duration-200`}>
          <FaTags className="text-xl" />
          {!isCollapsed && <Link to='/admin/product-categories'>Categories</Link>}
          </li>

          <li className={`${isCollapsed ? "flex justify-center" : ""} flex items-center gap-2 hover:bg-gray-700 p-3 rounded transition duration-200`}>
            <FaFileInvoiceDollar className="text-xl" />
            {!isCollapsed && <Link to="/admin/tax-categories" className="block">Taxes</Link>}
          </li>
          {/* Analytics */}
          <li className={`${isCollapsed ? "flex justify-center" : ""} flex items-center gap-2 hover:bg-gray-700 p-3 rounded transition duration-200`}>
            <FaChartBar className="text-xl" />
            {!isCollapsed && <a href="/admin/analytics" className="block">View Analytics</a>}
          </li>

          {/* Orders */}
          <li className={`${isCollapsed ? "flex justify-center" : ""}`}>
            <div
              className={`flex items-center ${
                isCollapsed ? "justify-center" : "justify-between"
              } hover:bg-gray-700 p-3 rounded cursor-pointer transition duration-200 w-full`}
              onClick={() => toggleSection("orders")}
            >
              <div className={`flex items-center ${isCollapsed ? "justify-center" : ""} gap-2`}>
                <FaClipboardList className="text-xl" />
                {!isCollapsed && <span>Orders</span>}
              </div>
              {!isCollapsed &&
                (openSections.orders ? (
                  <IoIosArrowDown />
                ) : (
                  <IoIosArrowForward />
                ))}
            </div>
            {openSections.orders && !isCollapsed && (
              <ul className="ml-6 mt-2 space-y-1">
                <li className="hover:text-gray-300 text-gray-400 text-sm">
                  <a href="/admin/orders" className="block p-2 hover:bg-gray-700 rounded">View Orders</a>
                </li>
                <li className="hover:text-gray-300 text-gray-400 text-sm">
                  <a href="/admin/manage-orders" className="block p-2 hover:bg-gray-700 rounded">Manage Orders</a>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;