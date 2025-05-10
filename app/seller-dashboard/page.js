'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';

const SellerDashboard = () => {
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const phone = localStorage.getItem('sellerPhone');

    if (!phone) {
      console.error('No seller phone found in localStorage');
      return;
    }

    const fetchSeller = async () => {
      try {
        const res = await fetch(`/api/seller-dashboard/data?phone=${phone}`);
        const result = await res.json();

        if (result.success) {
          setSeller(result.data);
        } else {
          console.error('Failed to load seller:', result.message);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeller();
  }, []);

  if (loading) {
    return <div className="p-6 text-gray-600">Loading dashboard...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome Back, {seller?.firstName || 'Seller'} 👋
          </h1>
          <p className="text-gray-500 mt-1">Here's what's happening with your store today.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <h2 className="text-gray-500 text-sm">Total Products</h2>
            <p className="text-2xl font-semibold text-gray-800 mt-1">{seller?.totalProducts || 0}</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <h2 className="text-gray-500 text-sm">Pending Orders</h2>
            <p className="text-2xl font-semibold text-gray-800 mt-1">{seller?.pendingOrders || 0}</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <h2 className="text-gray-500 text-sm">Delivered</h2>
            <p className="text-2xl font-semibold text-gray-800 mt-1">{seller?.deliveredOrders || 0}</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <h2 className="text-gray-500 text-sm">Earnings</h2>
            <p className="text-2xl font-semibold text-green-600 mt-1">₹{seller?.earnings || 0}</p>
          </div>
        </div>

      </div>
    </>
  );
};

export default SellerDashboard;
