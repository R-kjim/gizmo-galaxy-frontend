// src/components/admin/ConversionRate.jsx
import React from 'react';

const ConversionRate = ({ rate }) => (
  <div className="bg-white shadow-lg rounded-lg p-4">
    <h3 className="text-lg font-semibold mb-2">Conversion Rate</h3>
    <p className="text-2xl font-bold">{rate}%</p>
  </div>
);

export default ConversionRate;
