import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { format } from 'date-fns';

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        let url = `http://localhost:5000/sales-analytics?page=${page}`;

        if (dateRange.start && dateRange.end) {
          url += `&start_date=${dateRange.start}&end_date=${dateRange.end}`;
        }

        const response = await axios.get(url);
        setAnalytics(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [page, dateRange]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const { overall_metrics, product_metrics, sales_trend } = analytics;

  // Handle pagination
  const handlePageChange = (newPage) => {
    if (newPage > 0) setPage(newPage);
  };

  // Handle date range change
  const handleDateRangeChange = (e) => {
    const { name, value } = e.target;
    setDateRange((prev) => ({ ...prev, [name]: value }));
  };

  // Prepare data for sales trend bar chart
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
      <h1 className="text-4xl font-semibold text-center mb-8">Sales Analytics Dashboard</h1>

      {/* Date Range Filter */}
      <div className="flex justify-between mb-6">
        <div className="w-1/2">
          <h2 className="text-xl font-medium mb-2">Filter by Date Range</h2>
          <div className="flex space-x-4">
            <input
              type="date"
              name="start"
              value={dateRange.start}
              onChange={handleDateRangeChange}
              className="border px-4 py-2 rounded w-full"
            />
            <input
              type="date"
              name="end"
              value={dateRange.end}
              onChange={handleDateRangeChange}
              className="border px-4 py-2 rounded w-full"
            />
          </div>
        </div>
      </div>

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

          {/* Pagination */}
          <div className="flex justify-between mt-4">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page <= 1}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-lg">Page {page}</span>
            <button
              onClick={() => handlePageChange(page + 1)}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Next
            </button>
          </div>
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
                  position: 'bottom', // Moves legend to the bottom of the chart
                },
                tooltip: {
                  callbacks: {
                    label: (tooltipItem) => {
                      return `${tooltipItem.dataset.label}: $${tooltipItem.raw.toFixed(2)}`;
                    },
                  },
                },
              },
            }}
          />
        </div>
      </section>
    </div>
  );
};

export default Analytics;
