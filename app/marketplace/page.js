'use client';
import Details from '@/components/Details';
import Navbar2nd from '@/components/Navbar2nd';
import SearchBar from '@/components/SearchBar';
import React from 'react';

const Marketplace = () => {
  return (
    <>
      <Navbar2nd />

      {/* Section for the Marketplace Heading */}
      <div className="relative bg-[url('/img3.webp')] bg-cover bg-center py-12 z-10">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 z-0"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Marketplace</h2>
          <p className="text-lg text-yellow-300 font-semibold">
            Browse a wide variety of fresh produce directly from local farmers.
          </p>
        </div>
      </div>

      {/* Search Bar Section */}
      <div className="relative z-30 overflow-visible">
  <SearchBar />
</div>


      {/* produce */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-3 gap-y-5 px-2 place-items-center max-w-6xl mx-auto my-5">
        <Details />
        <Details />
        <Details />
        <Details />
        <Details />
        <Details />
        <Details />
        <Details />
      </div>
    </>
  );
};

export default Marketplace;
