'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

const AddProduct = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const router = useRouter();

  useEffect(() => {
    const phone = sessionStorage.getItem('phone');
    const sessionKey = sessionStorage.getItem('sessionKey');

    if (!phone || !sessionKey) {
      router.push('/seller-login');
    }
  }, []);

 const onSubmit = async (data) => {
  setLoading(true);
  setErrorMsg('');
  setSuccessMsg('');

  const phone = sessionStorage.getItem('phone');
  const sessionKey = sessionStorage.getItem('sessionKey');

  try {
    const res = await fetch('/api/seller-dashboard/add-product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionKey}`,
      },
      body: JSON.stringify({ ...data, phone }),
    });

    const result = await res.json();

    if (!res.ok) {
      setErrorMsg(result.message || 'Failed to add product');
    } else {
      setSuccessMsg('Product added successfully!');
      
      setTimeout(() => {
        router.push('/seller-dashboard');
      }, 1000);
    }
  } catch (error) {
    setErrorMsg('Something went wrong. Please try again.');
  } finally {
    setLoading(false);
  }
};


  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
        <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">Add New Product</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* Product Name */}
            <div>
              <label className="block font-medium">Product Name</label>
              <input
                {...register('name', { required: 'Product name is required' })}
                className={`w-full px-4 py-2 border rounded ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                placeholder="Enter product name"
              />
              {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
            </div>

            {/* Image URL */}
            <div>
              <label className="block font-medium">Product Image URL</label>
              <input
                {...register('imageUrl', { required: 'Image URL is required' })}
                className={`w-full px-4 py-2 border rounded ${errors.imageUrl ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                placeholder="Enter image URL"
              />
              {errors.imageUrl && <p className="text-sm text-red-600">{errors.imageUrl.message}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="block font-medium">Description</label>
              <textarea
                {...register('description')}
                className="w-full px-4 py-2 border border-gray-300 rounded"
                placeholder="Enter product description"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block font-medium">Price (₹ per kg)</label>
              <input
                type="number"
                {...register('price', { required: 'Price is required', min: 1 })}
                className={`w-full px-4 py-2 border rounded ${errors.price ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                placeholder="Enter price per kg"
              />
              {errors.price && <p className="text-sm text-red-600">{errors.price.message}</p>}
            </div>

            {/* Stock */}
            <div>
              <label className="block font-medium">Stock</label>
              <input
                type="number"
                {...register('stock', { required: 'Stock is required', min: 0 })}
                className={`w-full px-4 py-2 border rounded ${errors.stock ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                placeholder="Enter stock quantity"
              />
              {errors.stock && <p className="text-sm text-red-600">{errors.stock.message}</p>}
            </div>

            {/* Category */}
            <div>
              <label className="block font-medium">Category</label>
              <input
                {...register('category', { required: 'Category is required' })}
                className={`w-full px-4 py-2 border rounded ${errors.category ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                placeholder="e.g., Fresh Vegetables"
              />
              {errors.category && <p className="text-sm text-red-600">{errors.category.message}</p>}
            </div>

            {/* Origin */}
            <div>
              <label className="block font-medium">Origin</label>
              <input
                {...register('origin')}
                className="w-full px-4 py-2 border border-gray-300 rounded"
                placeholder="e.g., Locally grown in Punjab, India"
              />
            </div>

            {/* Harvested On */}
            <div>
              <label className="block font-medium">Harvested On</label>
              <input
                type="date"
                {...register('harvestedOn')}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>

            {/* Shelf Life */}
            <div>
              <label className="block font-medium">Shelf Life</label>
              <input
                {...register('shelfLife')}
                className="w-full px-4 py-2 border border-gray-300 rounded"
                placeholder="e.g., Up to 7 days if refrigerated"
              />
            </div>

            {/* Storage Tip */}
            <div>
              <label className="block font-medium">Storage Tip</label>
              <input
                {...register('storageTip')}
                className="w-full px-4 py-2 border border-gray-300 rounded"
                placeholder="e.g., Store in a cool, dry place"
              />
            </div>

            {/* Usage */}
            <div>
              <label className="block font-medium">Usage</label>
              <textarea
                {...register('usage')}
                className="w-full px-4 py-2 border border-gray-300 rounded"
                placeholder="e.g., Ideal for cooking, salads, or juicing"
              />
            </div>

            {/* Health Benefits */}
            <div>
              <label className="block font-medium">Health Benefits</label>
              <textarea
                {...register('healthBenefits')}
                className="w-full px-4 py-2 border border-gray-300 rounded"
                placeholder="e.g., Rich in fiber, antioxidants, and essential vitamins"
              />
            </div>

            {/* Error & Success Messages */}
            {errorMsg && <p className="text-center text-sm text-red-600">{errorMsg}</p>}
            {successMsg && <p className="text-center text-sm text-green-600">{successMsg}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
            >
              {loading ? 'Adding...' : 'Add Product'}
            </button>
          </form>
        </div>
      </div>

    </>
  );
};

export default AddProduct;
