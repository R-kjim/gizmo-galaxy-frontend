// src/components/admin/AvgOrderValue.jsx
import React from 'react';

const AvgOrderValue = ({ value }) => (
  <div className="bg-white shadow-lg rounded-lg p-4">
    <h3 className="text-lg font-semibold mb-2">Average Order Value</h3>
    <p className="text-2xl font-bold">${value.toFixed(2)}</p>
  </div>
);

export default AvgOrderValue;
