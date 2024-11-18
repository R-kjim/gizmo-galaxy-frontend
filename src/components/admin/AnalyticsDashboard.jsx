// src/components/admin/AnalyticsDashboard.jsx
import React, { useEffect, useState } from 'react';
import TotalRevenue from './TotalRevenue';
import TotalProductsSold from './TotalProductsSold';
import TopFiveProducts from './TopFiveProducts';
import OrdersPerMonth from './OrdersPerMonth';
import ConversionRate from './ConversionRate';
import AvgOrderValue from './AvgOrderValue';
import RevenueGrowth from './RevenueGrowth';
import Reports from './Reports';

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState({
    totalRevenue: 50000, 
    totalProductsSold: 1200, 
    topProducts: [
      { name: 'Iphone X', sales: 150 },
      { name: 'Samsung Galaxy', sales: 120 },
      { name: 'Power Banks', sales: 110 },
      { name: 'Smart Watches', sales: 100 },
      { name: 'Wireless Earbuds', sales: 90 },
    ],
    ordersPerMonth: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      data: [30, 45, 60, 75, 90, 120],
    },
    conversionRate: 4.5,
    avgOrderValue: 42.75,
    revenueGrowth: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      data: [5000, 7000, 9000, 10000, 15000, 20000],
    },
  });

  useEffect(() => {
    setAnalytics((prevAnalytics) => ({ ...prevAnalytics }));
  }, []);

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-8">Analytics Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <TotalRevenue revenue={analytics.totalRevenue} />
        <TotalProductsSold productsSold={analytics.totalProductsSold} />
        <TopFiveProducts products={analytics.topProducts} />
        <OrdersPerMonth data={analytics.ordersPerMonth} />
        <ConversionRate rate={analytics.conversionRate} />
        <AvgOrderValue value={analytics.avgOrderValue} />
        <RevenueGrowth data={analytics.revenueGrowth} />
      </div>
      <Reports analytics={analytics} />
    </div>
  );
};

export default AnalyticsDashboard;
