'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProduct = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  useEffect(() => {
    const phone = sessionStorage.getItem('phone');
    const sessionKey = sessionStorage.getItem('sessionKey');

    if (!phone || !sessionKey) {
      router.push('/seller-login');
    }
  }, [router]);

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMsg('');

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
        toast.success('Product added successfully!', {
          position: 'bottom-left',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: 'dark',
          transition: Bounce,
        });

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
      <div className="min-h-screen bg-gray-50 p-6 flex justify-center items-start">
        <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">Add New Product</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>

            {/* Product Name */}
            <div>
              <label htmlFor="name" className="block font-medium mb-1">Product Name</label>
              <input
                id="name"
                {...register('name', { required: 'Product name is required' })}
                className={`w-full px-4 py-2 border rounded ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                placeholder="Enter product name"
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby="name-error"
              />
              {errors.name && <p id="name-error" className="text-sm text-red-600">{errors.name.message}</p>}
            </div>

            {/* Image URL */}
            <div>
              <label htmlFor="imageUrl" className="block font-medium mb-1">Product Image URL</label>
              <input
                id="imageUrl"
                {...register('imageUrl', { required: 'Image URL is required' })}
                className={`w-full px-4 py-2 border rounded ${errors.imageUrl ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                placeholder="Enter image URL"
                aria-invalid={errors.imageUrl ? "true" : "false"}
                aria-describedby="imageUrl-error"
              />
              {errors.imageUrl && <p id="imageUrl-error" className="text-sm text-red-600">{errors.imageUrl.message}</p>}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block font-medium mb-1">Description</label>
              <textarea
                id="description"
                {...register('description')}
                className="w-full px-4 py-2 border border-gray-300 rounded"
                placeholder="Enter product description"
                rows={3}
              />
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block font-medium mb-1">Price (₹ per kg)</label>
              <input
                type="number"
                id="price"
                {...register('price', { 
                  required: 'Price is required', 
                  min: { value: 1, message: 'Price must be at least ₹1' }
                })}
                className={`w-full px-4 py-2 border rounded ${errors.price ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                placeholder="Enter price per kg"
                aria-invalid={errors.price ? "true" : "false"}
                aria-describedby="price-error"
                min={1}
              />
              {errors.price && <p id="price-error" className="text-sm text-red-600">{errors.price.message}</p>}
            </div>

            {/* Stock */}
            <div>
              <label htmlFor="stock" className="block font-medium mb-1">Stock</label>
              <input
                type="number"
                id="stock"
                {...register('stock', { 
                  required: 'Stock is required', 
                  min: { value: 0, message: 'Stock cannot be negative' }
                })}
                className={`w-full px-4 py-2 border rounded ${errors.stock ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                placeholder="Enter stock quantity in kilograms"
                aria-invalid={errors.stock ? "true" : "false"}
                aria-describedby="stock-error"
                min={0}
              />
              {errors.stock && <p id="stock-error" className="text-sm text-red-600">{errors.stock.message}</p>}
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block font-medium mb-1">Category</label>
              <select
                id="category"
                {...register('category', { required: 'Category is required' })}
                className={`w-full px-4 py-2 border rounded ${errors.category ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                defaultValue=""
                aria-invalid={errors.category ? "true" : "false"}
                aria-describedby="category-error"
              >
                <option value="" disabled>Select a category</option>
                <option value="fruits">Fruits</option>
                <option value="vegetables">Vegetables</option>
                <option value="organic">Organic</option>
                <option value="grains">Grains</option>
              </select>
              {errors.category && <p id="category-error" className="text-sm text-red-600">{errors.category.message}</p>}
            </div>

            {/* Origin */}
            <div>
              <label htmlFor="origin" className="block font-medium mb-1">Origin</label>
              <input
                id="origin"
                {...register('origin')}
                className="w-full px-4 py-2 border border-gray-300 rounded"
                placeholder="e.g., Locally grown in Punjab, India"
              />
            </div>

            {/* Harvested On */}
            <div>
              <label htmlFor="harvestedOn" className="block font-medium mb-1">Harvested On</label>
              <input
                type="date"
                id="harvestedOn"
                {...register('harvestedOn')}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>

            {/* Shelf Life */}
            <div>
              <label htmlFor="shelfLife" className="block font-medium mb-1">Shelf Life</label>
              <input
                id="shelfLife"
                {...register('shelfLife')}
                className="w-full px-4 py-2 border border-gray-300 rounded"
                placeholder="e.g., Up to 7 days if refrigerated"
              />
            </div>

            {/* Storage Tip */}
            <div>
              <label htmlFor="storageTip" className="block font-medium mb-1">Storage Tip</label>
              <input
                id="storageTip"
                {...register('storageTip')}
                className="w-full px-4 py-2 border border-gray-300 rounded"
                placeholder="e.g., Store in a cool, dry place"
              />
            </div>

            {/* Usage */}
            <div>
              <label htmlFor="usage" className="block font-medium mb-1">Usage</label>
              <textarea
                id="usage"
                {...register('usage')}
                className="w-full px-4 py-2 border border-gray-300 rounded"
                placeholder="e.g., Ideal for cooking, salads, or juicing"
                rows={3}
              />
            </div>

            {/* Health Benefits */}
            <div>
              <label htmlFor="healthBenefits" className="block font-medium mb-1">Health Benefits</label>
              <textarea
                id="healthBenefits"
                {...register('healthBenefits')}
                className="w-full px-4 py-2 border border-gray-300 rounded"
                placeholder="e.g., Rich in fiber, antioxidants, and essential vitamins"
                rows={3}
              />
            </div>

            {/* Error Message */}
            {errorMsg && <p className="text-center text-sm text-red-600">{errorMsg}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Adding...' : 'Add Product'}
            </button>
          </form>
        </div>
      </div>

      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={false}
        pauseOnHover
        draggable
        theme="dark"
        transition={Bounce}
      />
    </>
  );
};

export default AddProduct;
