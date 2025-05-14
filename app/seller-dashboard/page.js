'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';

const SellerDashboard = () => {
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Pending');

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






        {/* Order Summary Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            {/* Pending Orders */}
            <div className="border p-4 rounded-lg bg-yellow-50 border-yellow-200">
              <h3 className="text-gray-600 text-sm">Pending Orders</h3>
              <p className="text-2xl font-bold text-yellow-700 mt-1">{seller?.pendingOrders || 0}</p>
            </div>

            {/* Total Orders */}
            <div className="border p-4 rounded-lg bg-blue-50 border-blue-200">
              <h3 className="text-gray-600 text-sm">Total Orders</h3>
              <p className="text-2xl font-bold text-blue-700 mt-1">{seller?.totalOrders || (seller?.pendingOrders || 0) + (seller?.deliveredOrders || 0)}</p>
            </div>

            {/* Delivered Orders */}
            <div className="border p-4 rounded-lg bg-green-50 border-green-200">
              <h3 className="text-gray-600 text-sm">Delivered Orders</h3>
              <p className="text-2xl font-bold text-green-700 mt-1">{seller?.deliveredOrders || 0}</p>
            </div>
          </div>
        </div>

        {/* Earnings Summary Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Earnings Summary</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            {/* Today's Earnings */}
            <div className="border p-4 rounded-lg bg-indigo-50 border-indigo-200">
              <h3 className="text-gray-600 text-sm">Today’s Earnings</h3>
              <p className="text-2xl font-bold text-indigo-700 mt-1">₹{seller?.earningsToday || 0}</p>
            </div>

            {/* This Month's Earnings */}
            <div className="border p-4 rounded-lg bg-purple-50 border-purple-200">
              <h3 className="text-gray-600 text-sm">This Month</h3>
              <p className="text-2xl font-bold text-purple-700 mt-1">₹{seller?.earningsMonth || 0}</p>
            </div>

            {/* Total Earnings */}
            <div className="border p-4 rounded-lg bg-green-50 border-green-200">
              <h3 className="text-gray-600 text-sm">Total Earnings</h3>
              <p className="text-2xl font-bold text-green-700 mt-1">₹{seller?.earnings || 0}</p>
            </div>
          </div>
        </div>

        {/* Listed Products Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Products</h2>

          {seller?.products?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {seller.products.map((product, index) => (
                <div key={index} className="border rounded-lg p-4 bg-gray-50">
                  <h3 className="text-lg font-semibold text-gray-700">{product.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{product.description}</p>
                  <div className="mt-2 text-sm text-gray-600">
                    <p><span className="font-medium">Price:</span> ₹{product.price}</p>
                    <p><span className="font-medium">Stock:</span> {product.stock}</p>
                    <p><span className="font-medium">Category:</span> {product.category}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">You haven’t listed any products yet.</p>
          )}
          {/* Add Product button */}
        <div className="mt-4 sm:mt-0">
          <Button
            onClick={() => router.push('/seller-dashboard/add-product')}
            button="+ Add Product"
          />
        </div>
        </div>


        

        {/* Tabbed Orders Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Orders</h2>

          <div className="flex gap-4 mb-6">
            {['Pending', 'Delivered', 'All'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${activeTab === tab
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Filtered Orders Based on Tab */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(seller?.orders || [])
              .filter((order) =>
                activeTab === 'All' ? true : order.status.toLowerCase() === activeTab.toLowerCase()
              )
              .map((order, index) => (
                <div key={index} className="border rounded-lg p-4 bg-gray-50 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-700">{order.productName}</h3>
                  <p className="text-sm text-gray-500 mt-1">{order.description || 'No description'}</p>

                  <div className="mt-2 text-sm text-gray-600 space-y-1">
                    <p><span className="font-medium">Quantity:</span> {order.quantity}</p>
                    <p><span className="font-medium">Price:</span> ₹{order.price}</p>
                    <p><span className="font-medium">Status:</span>
                      <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-semibold ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                          order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                        {order.status}
                      </span>
                    </p>
                    <p><span className="font-medium">Date:</span> {new Date(order.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
          </div>

          {seller?.orders?.filter(order =>
            activeTab === 'All' ? true : order.status.toLowerCase() === activeTab.toLowerCase()
          ).length === 0 && (
              <p className="text-gray-500 text-sm mt-4">No {activeTab.toLowerCase()} orders found.</p>
            )}
        </div>



      </div>
    </>
  );
};

export default SellerDashboard;
