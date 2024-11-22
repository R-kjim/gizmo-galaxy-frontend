import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const SalesAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch analytics data from the API
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await axios.get(`/sales-analytics`); // Update API base URL if needed
        setAnalyticsData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const { overall_metrics, product_metrics, sales_trend } = analyticsData;

  // Prepare chart data for sales trends
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
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Sales Analytics</h1>

      {/* Overall Metrics */}
      <section className="mb-6 bg-gray-100 p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Overall Metrics</h2>
        <ul>
          <li><strong>Total Revenue:</strong> ${overall_metrics.total_revenue.toFixed(2)}</li>
          <li><strong>Total Orders:</strong> {overall_metrics.total_orders}</li>
          <li><strong>Average Order Value:</strong> ${overall_metrics.average_order_value.toFixed(2)}</li>
        </ul>
      </section>

      {/* Product Metrics */}
      <section className="mb-6 bg-gray-100 p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Product Metrics</h2>
        <div>
          <h3 className="font-semibold">Most Sold Product</h3>
          {product_metrics.most_sold_product ? (
            <p>{product_metrics.most_sold_product.name} - Quantity Sold: {product_metrics.most_sold_product.total_quantity_sold}</p>
          ) : (
            <p>No data available.</p>
          )}
        </div>

        <div className="mt-4">
          <h3 className="font-semibold">Least Sold Product</h3>
          {product_metrics.least_sold_product ? (
            <p>{product_metrics.least_sold_product.name} - Quantity Sold: {product_metrics.least_sold_product.total_quantity_sold}</p>
          ) : (
            <p>No data available.</p>
          )}
        </div>

        <div className="mt-4">
          <h3 className="font-semibold">All Products</h3>
          <ul>
            {product_metrics.all_products.map((product) => (
              <li key={product.id}>
                {product.name} - Quantity Sold: {product.total_quantity_sold}, Orders: {product.order_count}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Sales Trend */}
      <section className="bg-gray-100 p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Sales Trend (Last 7 Days)</h2>
        <Bar data={salesTrendData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
      </section>
    </div>
  );
};

export default SalesAnalytics;