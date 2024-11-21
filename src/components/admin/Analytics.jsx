import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import config from '../../../config';

const SalesAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
   const {api}=config
   console.log (analyticsData);

  useEffect(() => {
    const fetchSalesAnalytics = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${api}/sales-analytics`);
        setAnalyticsData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSalesAnalytics();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const { overall_metrics, product_metrics, sales_trend } = analyticsData;

  const salesTrendData = {
    labels: sales_trend.map((item) => item.date),
    datasets: [
      {
        label: 'Revenue',
        data: sales_trend.map((item) => item.revenue),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Orders',
        data: sales_trend.map((item) => item.order_count),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <h1 className="text-4xl font-semibold text-center mb-8">Sales Analytics</h1>

      {/* Overall Metrics */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold">Overall Metrics</h2>
        <ul className="mt-4 space-y-2">
          <li>
            <strong>Total Revenue:</strong> ${overall_metrics.total_revenue.toFixed(2)}
          </li>
          <li>
            <strong>Total Orders:</strong> {overall_metrics.total_orders}
          </li>
          <li>
            <strong>Average Order Value:</strong> ${overall_metrics.average_order_value.toFixed(2)}
          </li>
        </ul>
      </section>

      {/* Product Metrics */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold">Product Metrics</h2>
        <div className="space-y-4 mt-4">
          <h3 className="text-lg font-medium">Most Sold Product</h3>
          {product_metrics.most_sold_product ? (
            <p>
              <strong>{product_metrics.most_sold_product.name}</strong> - Quantity Sold: {product_metrics.most_sold_product.total_quantity_sold}
            </p>
          ) : (
            <p>No data available.</p>
          )}

          <h3 className="text-lg font-medium">Least Sold Product</h3>
          {product_metrics.least_sold_product ? (
            <p>
              <strong>{product_metrics.least_sold_product.name}</strong> - Quantity Sold: {product_metrics.least_sold_product.total_quantity_sold}
            </p>
          ) : (
            <p>No data available.</p>
          )}

          <h3 className="text-lg font-medium">All Products</h3>
          <ul>
            {product_metrics.all_products.map((product) => (
              <li key={product.id}>
                <strong>{product.name}</strong> - Quantity Sold: {product.total_quantity_sold}, Orders: {product.order_count}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Sales Trend */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Sales Trend (Last 7 Days)</h2>
        <div className="w-full max-w-4xl mx-auto">
          <Bar
            data={salesTrendData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'bottom',
                },
              },
            }}
          />
        </div>
      </section>
    </div>
  );
};

export default SalesAnalytics;
