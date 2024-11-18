// src/components/admin/TopFiveProducts.jsx
import React from 'react';

const sampleProducts = [
  { name: 'Electric Drill', sales: 150 },
  { name: 'Cordless Screwdriver', sales: 120 },
  { name: 'LED Flashlight', sales: 110 },
  { name: 'Portable Power Bank', sales: 90 },
  { name: 'Smart Plug', sales: 80 },
];

const TopFiveProducts = ({ products = sampleProducts }) => (
  <div className="bg-white shadow-lg rounded-lg p-4">
    <h3 className="text-lg font-semibold mb-2">Top 5 Products</h3>
    <ul>
      {products.map((product, index) => (
        <li key={index} className="flex justify-between py-1">
          <span>{product.name}</span>
          <span>{product.sales} sold</span>
        </li>
      ))}
    </ul>
  </div>
);

export default TopFiveProducts;
