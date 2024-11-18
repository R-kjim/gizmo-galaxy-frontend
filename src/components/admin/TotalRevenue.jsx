// src/components/admin/TotalRevenue.jsx
import React from 'react';

const TotalRevenue = ({ revenue }) => (
  <div className="bg-white shadow-lg rounded-lg p-4 text-center">
    <h3 className="text-lg font-semibold">Total Revenue</h3>
    <p className="text-2xl font-bold">${revenue.toLocaleString()}</p>
  </div>
);

export default TotalRevenue;
