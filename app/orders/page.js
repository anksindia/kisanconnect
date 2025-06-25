'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('orders');
    if (saved) {
      setOrders(JSON.parse(saved));
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-green-800 mb-6">Your Orders</h1>
        {orders.length === 0 ? (
          <p className="text-gray-600">No orders yet.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order, i) => (
              <div key={i} className="p-4 border rounded-lg bg-white shadow">
                <p className="text-green-700 font-medium">Order ID: {order.id}</p>
                <p className="text-sm text-gray-500">Date: {order.time}</p>
                <p className="text-sm text-gray-800 mb-2">Total: ₹{order.total}</p>
                <ul className="list-disc pl-5">
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      {item.name} × {item.quantity} (₹{item.price})
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default OrdersPage;
