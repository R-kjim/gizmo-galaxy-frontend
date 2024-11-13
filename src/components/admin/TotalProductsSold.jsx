// src/components/admin/TotalProductsSold.jsx
import React from 'react';

const TotalProductsSold = ({ productsSold }) => (
  <div className="bg-white shadow-lg rounded-lg p-4 text-center">
    <h3 className="text-lg font-semibold">Total Products Sold</h3>
    <p className="text-2xl font-bold">{productsSold.toLocaleString()}</p>
  </div>
);

export default TotalProductsSold;
