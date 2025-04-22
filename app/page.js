import React from 'react';
import Navbar1st from '@/components/Navbar1st';

const Navbar = () => {
  return (
    <>
      <Navbar1st />
      <div className="relative bg-[url('/img3.webp')] bg-cover bg-center h-[89vh] flex flex-col items-center justify-center">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-20"></div>

        {/* Content */}
        <div className="relative z-10 text-center w-full max-w-4xl">
          <h1 className='mx-auto px-4 text-white font-bold text-5xl'>
            Taazgi ka safar, khet se aapke dar
          </h1>
          <p className='text-white px-4 py-6 font-semibold text-2xl'>
            Discover and order fresh produce directly from local farmers
          </p>
          <button className="mx-auto bg-amber-500 hover:bg-amber-600 font-semibold text-white px-6 py-3 rounded-md shadow-lg transition duration-300">
            Explore Products
          </button>
        </div>
      </div>

      

      <div className="bg-gray-50 py-16 px-6 sm:px-10 lg:px-24">

  {/* About Section */}
  <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8 mb-12">
    <h2 className="text-3xl font-bold text-green-700 mb-4">About</h2>
    <p className="text-lg leading-relaxed text-gray-800">
      We aim to bridge the gap between local farmers and consumers by offering a platform to buy fresh, organic produce directly from growers ensuring quality, transparency, and fair prices for all.
    </p>
  </div>

  {/* How It Works Section */}
  <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8">
    <h2 className="text-3xl font-bold text-green-700 mb-6">How it Works</h2>

    <div className="grid md:grid-cols-3 gap-8 text-center">
      <div className="flex flex-col items-center">
        <div className="bg-green-100 p-4 rounded-full mb-3">
          <img src="/plant.svg" alt="Farmer Icon" className="w-10 h-10" />
        </div>
        <h3 className="font-semibold text-lg mb-2">1. Farmers List Produce</h3>
        <p className="text-gray-600 text-sm">Verified farmers upload their fresh, organic offerings directly to the platform.</p>
      </div>

      <div className="flex flex-col items-center">
        <div className="bg-green-100 p-4 rounded-full mb-3">
          <img src="/orders.svg" alt="order Icon" className="w-10 h-10" />
        </div>
        <h3 className="font-semibold text-lg mb-2">2. You Explore & Order</h3>
        <p className="text-gray-600 text-sm">Browse local produce, compare prices, and order fresh items with ease.</p>
      </div>

      <div className="flex flex-col items-center">
        <div className="bg-green-100 p-4 rounded-full mb-3">
          <img src="/delivery.svg" alt="Delivery Icon" className="w-10 h-10" />
        </div>
        <h3 className="font-semibold text-lg mb-2">3. Doorstep Delivery</h3>
        <p className="text-gray-600 text-sm">Your fresh order is delivered directly from farms to your doorstep, hassle-free.</p>
      </div>
    </div>
  </div>
</div>




    </>
  );
};

export default Navbar;
