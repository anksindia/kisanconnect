'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

const SellerLogin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const router = useRouter();

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/sellers/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setErrorMsg(result.message || 'Invalid credentials');
      } else {
        router.push('/seller-dashboard');
      }
    } catch (error) {
      setErrorMsg('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10 px-4">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center text-green-700">Seller Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>

          {/* Phone Number */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Phone Number</label>
            <input
              type="tel"
              inputMode="numeric"
              maxLength={10}
              {...register('phone', {
                required: 'Phone number is required',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Enter a valid 10-digit phone number',
                },
              })}
              className={`w-full rounded px-4 py-2 block text-sm border 
                ${errors.phone ? 'bg-red-50 border-red-500 text-red-900 placeholder-red-700' : 'focus:border-green-500'}`}
              placeholder="Enter your phone number"
            />
            {errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone.message}</p>}
          </div>

          {/* Password with Show/Hide */}
          <div className="mb-6">
            <label className="block mb-1 font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password', {
                  required: 'Password is required',
                })}
                className={`w-full rounded px-4 py-2 block text-sm border 
                  ${errors.password ? 'bg-red-50 border-red-500 text-red-900 placeholder-red-700' : 'focus:border-green-500'}`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-sm text-gray-500"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
          </div>

          {errorMsg && <p className="mb-4 text-sm text-red-600 text-center">{errorMsg}</p>}

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition font-semibold"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          New seller?{' '}
          <a href="/register" className="text-green-700 font-semibold hover:underline">
            Register here
          </a>
        </div>
      </div>
    </div>
  );
};

export default SellerLogin;
