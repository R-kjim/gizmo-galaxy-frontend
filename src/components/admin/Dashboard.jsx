
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from 'chart.js';

// Register required Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-200 text-gray-800">
            <Header />
            <main className="p-6 space-y-6">
                <MetricsGrid />
                <SalesChart />
            </main>
        </div>
    );
};

const Header = () => (
    <header className="flex items-center justify-between bg-gray-900 text-white p-4">
        <h1 className="text-xl font-semibold">Welcome, Admin</h1>
        <div className="flex space-x-4">
            <Button color="bg-blue-600" label="Filter by Date" />
            <Button color="bg-green-600" label="POS" />
            <Button color="bg-indigo-600" label="Add Product" />
        </div>
    </header>
);

const Button = ({ color, label }) => (
    <button className={`${color} px-4 py-2 rounded`}>{label}</button>
);

const MetricsGrid = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {metricsData.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
        ))}
    </div>
);

// Metric Card Component
const MetricCard = ({ label, value, bgColor }) => (
    <div className={`p-4 rounded-lg shadow-md text-white ${bgColor}`}>
        <p className="text-sm font-medium opacity-80">{label}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
    </div>
);

// Sales Chart Component
const SalesChart = () => {
    const data = {
        labels: ['10-Oct', '11-Oct', '12-Oct', '13-Oct', '14-Oct', '15-Oct', '16-Oct', '17-Oct', '18-Oct', '19-Oct', '20-Oct', '21-Oct', '22-Oct', '23-Oct', '24-Oct', '25-Oct', '26-Oct', '27-Oct', '28-Oct', '29-Oct', '30-Oct', '31-Oct', '01-Nov', '02-Nov', '03-Nov', '04-Nov', '05-Nov', '06-Nov', '07-Nov', '08-Nov'],
        datasets: [
            {
                label: 'Total Sales (KSh)',
                data: [10000, 20000, 15000, 30000, 25000, 18000, 22000, 27000, 23000, 21000, 29000, 32000, 34000, 30000, 25000, 27000, 20000, 18000, 15000, 21000, 22000, 25000, 27000, 30000, 35000, 37000, 33000, 29000, 31000, 27000],
                borderColor: '#4F46E5',
                backgroundColor: 'rgba(79, 70, 229, 0.2)',
                fill: true,
                tension: 0.3,
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                ticks: { color: '#4A5568' },
                grid: { color: '#E2E8F0' },
            },
            x: {
                ticks: { color: '#4A5568' },
                grid: { display: false },
            },
        },
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Sales Last 30 Days</h3>
            <Line data={data} options={options} />
        </div>
    );
};

// Metric data for cards
const metricsData = [
    { label: "Total Sales", value: "KSh 0.00", bgColor: "bg-blue-500" },
    { label: "Net", value: "KSh 0.00", bgColor: "bg-green-500" },
    { label: "Invoice Due", value: "KSh 0.00", bgColor: "bg-yellow-500" },
    { label: "Total Sell Return", value: "KSh 0.00", bgColor: "bg-red-500" },
    { label: "Total Purchase", value: "KSh 0.00", bgColor: "bg-teal-500" },
    { label: "Purchase Due", value: "KSh 0.00", bgColor: "bg-orange-500" },
    { label: "Total Purchase Return", value: "KSh 0.00", bgColor: "bg-pink-500" },
    { label: "Expense", value: "KSh 0.00", bgColor: "bg-purple-500" },
];

export default Dashboard;

