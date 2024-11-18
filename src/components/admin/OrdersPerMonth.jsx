// src/components/admin/OrdersPerMonth.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OrdersPerMonth = ({ data }) => {
  const chartData = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    datasets: [
      {
        label: 'Orders Per Month',
        data: [100, 120, 150, 130, 160, 140, 170, 200, 210, 180, 300, 350], // realistic values
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Monthly Orders' },
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 50 } },
    },
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-2">Orders Per Month</h3>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default OrdersPerMonth;
