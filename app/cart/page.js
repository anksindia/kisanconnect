'use client';

import React from 'react';
import { useCart } from '../context/CartContext';
import Navbar from '@/components/Navbar';
import Button from '@/components/Button';
import Link from 'next/link';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-green-800 mb-6">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-gray-600 text-lg">
            Your cart is empty.{' '}
            <Link href="/marketplace" className="text-green-700 font-medium underline">
              Browse products
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 p-4 border border-gray-200 rounded-lg bg-white shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.imageUrl || '/placeholder.png'}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 capitalize">{item.name}</h2>
                    <p className="text-sm text-gray-600">Price: ₹{item.price}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="px-2 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
                      >
                        −
                      </button>
                      <span className="text-sm text-gray-800">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}
                        className="px-2 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.cartKey)}
                  className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition"
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="text-right mt-6">
              <p className="text-xl font-semibold text-green-700">
                Total: ₹{total.toFixed(2)}
              </p>
              <div className="mt-4">
                <Button button="Place Order" />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
