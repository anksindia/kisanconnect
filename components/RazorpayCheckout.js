'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/context/CartContext';
import { useRazorpay } from 'react-razorpay';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RazorpayCheckout = ({ amount }) => {
  const { Razorpay, isLoading, error } = useRazorpay();
  const { cartItems, clearCart } = useCart();
  const router = useRouter();

  const handlePayment = () => {
    const options = {
      key: 'rzp_test_1DP5mmOlF5G5ag',
      amount,
      currency: 'INR',
      name: 'KisanConnect',
      description: 'Order Payment (Test)',
      image: '/kisanconnect.png',
      prefill: {
        name: 'Test User',
        email: 'test@razorpay.com',
        contact: '9999999999',
      },
      handler: function (response) {
        toast.success(`✅ Payment successful: ${response.razorpay_payment_id}`);

        // Save the order
        const newOrder = {
          id: response.razorpay_payment_id,
          items: cartItems,
          total: amount / 100,
          time: new Date().toLocaleString(),
        };

        const prevOrders = JSON.parse(localStorage.getItem('orders')) || [];
        localStorage.setItem('orders', JSON.stringify([...prevOrders, newOrder]));

        clearCart();

        // Delay navigation slightly to show toast
        setTimeout(() => {
          router.push('/orders');
        }, 2000);
      },
      modal: {
        ondismiss: () => {
          toast.info("Payment popup closed.");
        },
      },
      theme: {
        color: '#22BB22',
      },
    };

    const rzpInstance = new Razorpay(options);
    rzpInstance.open();
  };

  return (
    <>
      <button
        onClick={handlePayment}
        disabled={isLoading}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
      >
        {isLoading ? 'Loading...' : `Pay ₹${(amount / 100).toFixed(0)}`}
      </button>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </>
  );
};

export default RazorpayCheckout;
