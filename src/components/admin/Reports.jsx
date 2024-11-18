// src/components/admin/Reports.jsx
import React from 'react';

const Reports = ({ analytics }) => {
  const downloadCSV = () => {
    const csvData = [
      ['Metric', 'Value'],
      ['Total Revenue', `$${analytics.totalRevenue}`],
      ['Total Products Sold', analytics.totalProductsSold],
      ['Conversion Rate (%)', `${analytics.conversionRate}%`],
      ['Average Order Value', `$${analytics.avgOrderValue.toFixed(2)}`],
      ['Top 5 Products', ''],
      ...analytics.topProducts.map((product) => [product.name, product.sales]),
      ['Monthly Orders', ''],
      ...analytics.ordersPerMonth.labels.map((label, index) => [
        label,
        analytics.ordersPerMonth.data[index],
      ]),
    ];

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      csvData.map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'analytics_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mt-6">
      <h3 className="text-lg font-semibold mb-4">Reports</h3>
      <button
        onClick={downloadCSV}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Download Report
      </button>
    </div>
  );
};

export default Reports;
