'use client';

import React, { useEffect, useState } from 'react';
import Details from '@/components/Details';
import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';

const Marketplace = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Fetch error:', err));
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

      <div className="relative z-30 overflow-visible">
        <SearchBar />
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-3 gap-y-5 px-2 place-items-center max-w-6xl mx-auto my-5">
        {products.length === 0 ? (
          <p className="text-gray-600">No products found.</p>
        ) : (
          products.map((product, idx) => <Details key={idx} product={product} />)
        )}
      </div>
    </>
  );
};

export default Marketplace;
