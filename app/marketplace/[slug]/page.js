import React from 'react'
import Navbar2nd from '@/components/Navbar2nd';
import Button from '@/components/Button';
import Image from 'next/image';
import Details from '@/components/Details';

const Produce = ({ params }) => {
  const { slug } = params;

  return (<>
    <Navbar2nd />

    <div className="min-h-80  py-10 px-4">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-white p-8">

        {/* Product Image */}
        <div className="w-full h-64 md:h-96 bg-gray-200 rounded-xl overflow-hidden">
          <Image
            width={250} height={150}
            src={`/maduwa.webp`}
            alt={slug}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center gap-4">
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 capitalize">{slug.replace('-', ' ')}</h1>
          <p className="text-gray-600 text-lg">
            Freshly harvested from local farms. 100% organic and sustainably grown.
          </p>
          <p className="text-xl text-green-700 font-semibold">₹150 per kg</p>

          {/* Seller Info */}
          <div className="mt-4">
            <p className="text-sm text-gray-500">Sold by</p>
            <p className="text-md text-green-800 font-medium">Farmer Jogindar</p>
          </div>

          {/* Action Button */}
          <div className="flex gap-2"><Button button="Order Now" />
            <Button button="Add to cart" /></div>

        </div>
      </div>

    </div>

    <div className='border-[1px] border-gray-400 rounded-2xl opacity-20 '></div>

    {/* Product Details Section */}
    <div className="max-w-6xl mx-auto mt-10 px-4 py-6 bg-white rounded-xl shadow-sm">
      <h2 className="text-2xl font-semibold text-green-800 mb-4">Product Details</h2>
      <ul className="list-disc list-inside text-gray-700 space-y-2">
        <li><strong>Category:</strong> Fresh Vegetables</li>
        <li><strong>Origin:</strong> Locally grown in Punjab, India</li>
        <li><strong>Harvested On:</strong> April 18, 2025</li>
        <li><strong>Shelf Life:</strong> Up to 7 days if refrigerated</li>
        <li><strong>Storage Tip:</strong> Store in a cool, dry place or keep refrigerated for best freshness</li>
        <li><strong>Usage:</strong> Ideal for cooking, salads, or juicing</li>
        <li><strong>Health Benefits:</strong> Rich in fiber, antioxidants, and essential vitamins</li>
      </ul>
    </div>


    {/* suggestion */}

    <div className="max-w-6xl mx-auto mt-12 px-4 py-6">
      <h2 className="text-2xl font-semibold text-green-800 mb-6">Customers who bought this item also bought</h2>

      <div className="flex overflow-x-auto  scrollbar-hide">
        {/* Wrap each card in a fixed-width container */}
        <div className="flex-shrink-0 w-60">
          <Details />
        </div>
        <div className="flex-shrink-0 w-60">
          <Details />
        </div>
        <div className="flex-shrink-0 w-60">
          <Details />
        </div>
        <div className="flex-shrink-0 w-60">
          <Details />
        </div>
        <div className="flex-shrink-0 w-60">
          <Details />
        </div>
      </div>
    </div>
    
{/* Customer Reviews Section */}
<div className="max-w-6xl mx-auto mt-12 px-4 py-6 bg-white rounded-xl shadow-sm">
  <h2 className="text-2xl font-semibold text-green-800 mb-4">Customer Reviews</h2>

  <div className="space-y-6">
    {/* Review Card */}
    <div className="border border-gray-200 p-4 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <p className="font-medium text-green-800">Ravi Sharma</p>
        <p className="text-sm text-gray-500">April 20, 2025</p>
      </div>
      <p className="text-yellow-500 mb-1">⭐⭐⭐⭐☆</p>
      <p className="text-gray-700">The vegetables were super fresh and tasted amazing. Delivery was quick too!</p>
    </div>

    {/* Review Card */}
    <div className="border border-gray-200 p-4 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <p className="font-medium text-green-800">Simran Kaur</p>
        <p className="text-sm text-gray-500">April 22, 2025</p>
      </div>
      <p className="text-yellow-500 mb-1">⭐⭐⭐⭐⭐</p>
      <p className="text-gray-700">Absolutely loved it! You can really tell it's organic. Will buy again for sure.</p>
    </div>

    {/* Review Card */}
    <div className="border border-gray-200 p-4 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <p className="font-medium text-green-800">Aman Verma</p>
        <p className="text-sm text-gray-500">April 19, 2025</p>
      </div>
      <p className="text-yellow-500 mb-1">⭐⭐⭐⭐☆</p>
      <p className="text-gray-700">Great quality, although packaging could be improved a bit. Otherwise perfect.</p>
    </div>
  </div>
</div>




  </>
  );
};

export default Produce;
