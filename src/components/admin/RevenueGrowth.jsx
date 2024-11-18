// src/components/admin/RevenueGrowth.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';

const RevenueGrowth = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Revenue Growth',
        data: data.data,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-2">Revenue Growth</h3>
      <Bar data={chartData} />
    </div>
  );
};

export default RevenueGrowth;
