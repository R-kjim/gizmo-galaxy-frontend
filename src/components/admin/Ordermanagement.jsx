
import React, { useContext, useState } from 'react';
import { AppContext } from '../../AppContextProvider';

const dummyOrders = [
    { id: 1, customer: 'Alice Johnson', date: '2023-11-01', status: 'Pending', totalAmount: 150.00, items: [{ id: 1, name: 'Laptop', price: 120.00 }, { id: 2, name: 'Mouse', price: 30.00 }] },
    { id: 2, customer: 'Bob Smith', date: '2023-10-28', status: 'Shipped', totalAmount: 250.00, items: [{ id: 3, name: 'Keyboard', price: 50.00 }, { id: 4, name: 'Monitor', price: 200.00 }] },
    { id: 3, customer: 'Cathy Lee', date: '2023-11-03', status: 'Delivered', totalAmount: 300.00, items: [{ id: 5, name: 'Headphones', price: 100.00 }, { id: 6, name: 'Desk Lamp', price: 50.00 }, { id: 7, name: 'Chair', price: 150.00 }] },
];

const OrderManagement = () => {
    const value=useContext(AppContext)
    const orders=value.allOrders
    // const [orders, setOrders] = useState();
    const [filteredOrders, setFilteredOrders] = useState(value.allOrders);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const handleFilter = (criteria) => {
        const filtered = orders.filter(order => {
            const isStatusMatch = !criteria.status || order.status === criteria.status;
            const isCustomerMatch = !criteria.customer || order.customer.toLowerCase().includes(criteria.customer.toLowerCase());

            let isDateMatch = true;
            if (criteria.dateRange.start && criteria.dateRange.end) {
                const startDate = new Date(criteria.dateRange.start);
                const endDate = new Date(criteria.dateRange.end);
                const orderDate = new Date(order.date);
                isDateMatch = orderDate >= startDate && orderDate <= endDate;
            }

            return isStatusMatch && isCustomerMatch && isDateMatch;
        });
        setFilteredOrders(filtered);
    };

    const handleUpdateOrder = (updatedOrder) => {
        const updatedOrders = orders.map(order =>
            order.id === updatedOrder.id ? updatedOrder : order
        );
        setOrders(updatedOrders);
        setFilteredOrders(updatedOrders);
    };

    const handleClear = () => {
        setFilteredOrders(orders);
    };

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-semibold">Order Management</h1>
            <OrderFilters onFilter={handleFilter} onClear={handleClear} />
            <OrderTable orders={filteredOrders} onSelectOrder={setSelectedOrder} />
            {selectedOrder && <OrderDetail order={selectedOrder} onUpdateOrder={handleUpdateOrder} />}
        </div>
    );
};

const OrderFilters = ({ onFilter, onClear }) => {
    const [criteria, setCriteria] = useState({ status: '', customer: '', dateRange: { start: '', end: '' } });

    const handleFilter = () => {
        const { start, end } = criteria.dateRange;
        if (start && end && new Date(start) > new Date(end)) {
            alert("Start date cannot be after end date.");
            return;
        }
        onFilter(criteria);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "start" || name === "end") {
            setCriteria(prev => ({
                ...prev,
                dateRange: {
                    ...prev.dateRange,
                    [name]: value
                }
            }));
        } else {
            setCriteria((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleClear = () => {

        setCriteria({ status: '', customer: '', dateRange: { start: '', end: '' } });
        onClear();
    };

    return (
        <div className="space-y-4 mb-6">
            <input name="customer" placeholder="Customer Name" className="px-4 py-2 border rounded-lg w-full" onChange={handleChange} value={criteria.customer} />
            <select name="status" className="px-4 py-2 border rounded-lg w-full" onChange={handleChange} value={criteria.status}>
                <option value="">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Shipped">Dispatched</option>
                <option value="Delivered">Delivered</option>
            </select>
            <div className="font-semibold text-lg">Filter by Date Range</div>
                   <div className="flex space-x-4">
                   <label htmlFor="start" className="block text-sm font-semibold">Start Date</label>
                   <input type="date" name="start" className="px-4 py-2 border rounded-lg w-full" onChange={handleChange} value={criteria.dateRange.start} />
                   <label htmlFor="end" className="block text-sm font-semibold">End Date</label>
                   <input type="date" name="end" className="px-4 py-2 border rounded-lg w-full" onChange={handleChange} value={criteria.dateRange.end} />
            </div>
            <div className="flex space-x-4">
                <button onClick={handleFilter} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Apply</button>
                <button onClick={handleClear} className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500">Clear</button>
            </div>
        </div>
    );
};

const OrderTable = ({ orders, onSelectOrder }) => (
    <table className="min-w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
            <tr>
                {['Order ID', 'Customer Name', 'Date', 'Status', 'Amount', 'Actions'].map(header => (
                    <th key={header} className="py-3 px-6 font-semibold text-left">{header}</th>
                ))}
            </tr>
        </thead>
        <tbody>
            {orders.map(order => (
                <tr key={order.id} className={`border-b hover:bg-gray-50 ${order.status === 'Delivered' ? 'bg-green-100' : order.status === 'Pending' ? 'bg-yellow-100' : 'bg-blue-100'}`}>
                    <td className="py-3 px-6">{order.id}</td>
                    <td className="py-3 px-6">{`${order.user.first_name} ${order.user.last_name}`}</td>
                    <td className="py-3 px-6">{new Date(order.date).toLocaleDateString()}</td>
                    <td className="py-3 px-6">{order.status}</td>
                    <td className="py-3 px-6">${order.amount.toFixed(2)}</td>
                    <td className="py-3 px-6">
                        <button onClick={() => onSelectOrder(order)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">View</button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
);

const OrderDetail = ({ order, onUpdateOrder }) => {
    const handleAction = (action) => {
        const updatedOrder = { ...order };

        if (action === 'Mark as Dispatched') {
            fetch(`http://127.0.0.1:5000/order/${order.id}`,{
                method:"PATCH",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${localStorage.getItem("access_Token")}`
                },
                body:JSON.stringify({"status":"Dispatched"})
            })
            .then(res=>res.json())
        };
        // if (action === 'Issue Refund') {
        //     updatedOrder.status = 'Refunded';
        //     updatedOrder.totalAmount = 0;
        // }
        // if (action === 'Cancel Order') updatedOrder.status = 'Canceled';

        // onUpdateOrder(updatedOrder);
    };

    return (
        <div className="mt-8 p-6 bg-white border rounded-lg shadow-md space-y-6">
            <h2 className="text-xl font-semibold">Order Details - {order.id}</h2>
            <p><strong>Customer:</strong> {`${order.user.first_name} ${order.user.last_name}`}</p>
            <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <ul className="list-disc pl-6">
                {order.products.map(item => (
                    <li key={item.product_id}>{item.product.name} - ${item.selling_price}</li>
                ))}
            </ul>
            <div className="space-x-4">
                {['Mark as Dispatched', 'Issue Refund', 'Cancel Order'].map(action => (
                    <button
                        key={action}
                        onClick={() => handleAction(action)}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        {action}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default OrderManagement;

