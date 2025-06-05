'use client';

import React, { useEffect, useState } from 'react';
import Details from '@/components/Details';
import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async (filters = {}) => {
    setIsLoading(true);
    try {
      const query = new URLSearchParams(filters).toString();
      const res = await fetch(`/api/products?${query}`);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // initial load
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />

      {/* Hero */}
      <div className="relative bg-[url('/img3.webp')] bg-cover bg-center py-12 z-10">
        <div className="absolute inset-0 bg-black/30 z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Marketplace</h2>
          <p className="text-lg text-yellow-300 font-semibold">
            Browse fresh produce directly from local farmers.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative z-30 overflow-visible">
        <SearchBar setProducts={setProducts} />
      </div>

      {/* Products */}
      <div className="min-h-[300px] flex justify-center items-center px-2 max-w-6xl mx-auto my-5">
        {isLoading ? (
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            <p className="text-lg font-semibold text-gray-700 animate-bounce">Loading...</p>
          </div>
        ) : products.length === 0 ? (
          <p className="text-gray-600 text-center">No products found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-3 gap-y-5 w-full place-items-center">
            {products.map((product, idx) => (
              <Details key={idx} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Marketplace;
