// import React from 'react';
// import { 
//   FaHome, 
//   FaBox, 
//   FaUser, 
//   FaShoppingCart, 
//   FaChartBar, 
//   FaMoneyBillWave, 
//   FaCog 
// } from 'react-icons/fa';

// const Sidebar = () => {
//   return (
//     <div className="h-screen w-64 bg-gray-800 text-white">
//       <div className="p-4 text-center font-bold text-lg border-b border-gray-700">
//         Admin Panel
//       </div>

//       <ul className="mt-4 space-y-2">
//         {/* Example Links */}
//         <li className="hover:bg-gray-700 px-4 py-2 flex items-center">
//           <FaHome className="mr-2" />
//           <a href="#home">Home</a>
//         </li>
//         <li className="hover:bg-gray-700 px-4 py-2 flex items-center">
//           <FaBox className="mr-2" />
//           <a href="#products">Products</a>
//         </li>
//         <li className="hover:bg-gray-700 px-4 py-2 flex items-center">
//           <FaUser className="mr-2" />
//           <a href="#customers">Customers</a>
//         </li>
//         <li className="hover:bg-gray-700 px-4 py-2 flex items-center">
//           <FaShoppingCart className="mr-2" />
//           <a href="#orders">Orders</a>
//         </li>
//         <li className="hover:bg-gray-700 px-4 py-2 flex items-center">
//           <FaChartBar className="mr-2" />
//           <a href="#sales">Sales</a>
//         </li>
//         <li className="hover:bg-gray-700 px-4 py-2 flex items-center">
//           <FaMoneyBillWave className="mr-2" />
//           <a href="#contacts">Contacts</a>
//         </li>
//         <li className="hover:bg-gray-700 px-4 py-2 flex items-center">
//           <FaCog className="mr-2" />
//           <a href="#settings">Settings</a>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;

import React from 'react';
import { 
  FaHome, 
  FaBox, 
  FaUser, 
  FaShoppingCart, 
  FaChartBar, 
  FaMoneyBillWave, 
  FaCog 
} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white">
      <div className="p-4 text-center font-bold text-lg border-b border-gray-700">
        Admin Panel
      </div>

      <ul className="mt-4 space-y-2">
        {/* Example NavLinks */}
        <li className="hover:bg-gray-700 px-4 py-2 flex items-center">
          <FaHome className="mr-2" />
          <NavLink
            to="/home"
            activeClassName="bg-gray-700"
            className="w-full block px-4 py-2"
          >
            Home
          </NavLink>
        </li>
        <li className="hover:bg-gray-700 px-4 py-2 flex items-center">
          <FaBox className="mr-2" />
          <NavLink
            to="/products"
            activeClassName="bg-gray-700"
            className="w-full block px-4 py-2"
          >
            Products
          </NavLink>
        </li>
        <li className="hover:bg-gray-700 px-4 py-2 flex items-center">
          <FaUser className="mr-2" />
          <NavLink
            to="/customers"
            activeClassName="bg-gray-700"
            className="w-full block px-4 py-2"
          >
            Customers
          </NavLink>
        </li>
        <li className="hover:bg-gray-700 px-4 py-2 flex items-center">
          <FaShoppingCart className="mr-2" />
          <NavLink
            to="/orders"
            activeClassName="bg-gray-700"
            className="w-full block px-4 py-2"
          >
            Orders
          </NavLink>
        </li>
        <li className="hover:bg-gray-700 px-4 py-2 flex items-center">
          <FaChartBar className="mr-2" />
          <NavLink
            to="/sales"
            activeClassName="bg-gray-700"
            className="w-full block px-4 py-2"
          >
            Sales
          </NavLink>
        </li>
        <li className="hover:bg-gray-700 px-4 py-2 flex items-center">
          <FaMoneyBillWave className="mr-2" />
          <NavLink
            to="/contacts"
            activeClassName="bg-gray-700"
            className="w-full block px-4 py-2"
          >
            Contacts
          </NavLink>
        </li>
        <li className="hover:bg-gray-700 px-4 py-2 flex items-center">
          <FaCog className="mr-2" />
          <NavLink
            to="/settings"
            activeClassName="bg-gray-700"
            className="w-full block px-4 py-2"
          >
            Settings
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
