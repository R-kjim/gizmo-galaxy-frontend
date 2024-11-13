// src/components/admin/OrdersPerMonth.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OrdersPerMonth = ({ data }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: 'Orders per Month',
        data: Object.values(data),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Orders',
      },
    },
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h3 className="text-lg font-semibold">Orders per Month</h3>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default OrdersPerMonth;
