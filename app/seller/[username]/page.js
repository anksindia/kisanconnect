import Navbar2nd from '@/components/Navbar2nd';
import React from 'react';

const SellerDashboard = () => {
  return (
    <>
    <Navbar2nd/>
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome Back, Seller 👋</h1>
        <p className="text-gray-500 mt-1">Here's what's happening with your store today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <h2 className="text-gray-500 text-sm">Total Products</h2>
          <p className="text-2xl font-semibold text-gray-800 mt-1">24</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <h2 className="text-gray-500 text-sm">Pending Orders</h2>
          <p className="text-2xl font-semibold text-gray-800 mt-1">7</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <h2 className="text-gray-500 text-sm">Delivered</h2>
          <p className="text-2xl font-semibold text-gray-800 mt-1">59</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <h2 className="text-gray-500 text-sm">Earnings</h2>
          <p className="text-2xl font-semibold text-green-600 mt-1">₹14,300</p>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Your Products</h3>
          <button className="bg-green-600 text-white px-4 py-2 text-sm rounded hover:bg-green-700">+ Add Product</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-6 py-3">Product</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Stock</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">Organic Tomatoes</td>
                <td className="px-6 py-4">₹60/kg</td>
                <td className="px-6 py-4">120 kg</td>
                <td className="px-6 py-4 text-green-600">Active</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button className="text-blue-600 hover:underline">Edit</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">Fresh Spinach</td>
                <td className="px-6 py-4">₹40/bunch</td>
                <td className="px-6 py-4">90 bunches</td>
                <td className="px-6 py-4 text-green-600">Active</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button className="text-blue-600 hover:underline">Edit</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Orders</h3>
        <ul className="space-y-4">
          <li className="flex justify-between items-center">
            <span className="text-gray-700">Order #1023 - ₹620</span>
            <span className="text-sm bg-yellow-100 text-yellow-700 px-3 py-1 rounded">Pending</span>
          </li>
          <li className="flex justify-between items-center">
            <span className="text-gray-700">Order #1022 - ₹1,200</span>
            <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded">Delivered</span>
          </li>
          <li className="flex justify-between items-center">
            <span className="text-gray-700">Order #1021 - ₹310</span>
            <span className="text-sm bg-red-100 text-red-700 px-3 py-1 rounded">Cancelled</span>
          </li>
        </ul>
      </div>
    </div>
    </>
  );
};

export default SellerDashboard;
