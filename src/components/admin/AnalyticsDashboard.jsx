// src/components/admin/AnalyticsDashboard.jsx
import React, { useEffect, useState } from 'react';
import TotalRevenue from './TotalRevenue';
import TotalProductsSold from './TotalProductsSold';
import TopFiveProducts from './TopFiveProducts';
import OrdersPerMonth from './OrdersPerMonth';

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState({
    totalRevenue: 0,
    totalProductsSold: 0,
    topProducts: [],
    ordersPerMonth: {},
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      // Replace with actual fetch call to your backend
      const response = await fetch('/api/analytics');
      const data = await response.json();
      setAnalytics(data);
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-8">Analytics Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <TotalRevenue revenue={analytics.totalRevenue} />
        <TotalProductsSold productsSold={analytics.totalProductsSold} />
        <TopFiveProducts products={analytics.topProducts} />
        <OrdersPerMonth data={analytics.ordersPerMonth} />
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
