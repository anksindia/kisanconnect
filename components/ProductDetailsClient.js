'use client';

import React from 'react';
import Button from '@/components/Button';
import Details from '@/components/Details';
import { useCart } from '@/app/context/CartContext';

const ProductDetailsClient = ({ product, randomProducts }) => {
  const { addToCart } = useCart();

  return (
    <>
      {/* Product Main Section */}
      <div className="min-h-80 py-10 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-white p-8 rounded-xl shadow-md">
          <div className="w-full h-64 md:h-96 bg-gray-200 rounded-xl overflow-hidden">
            <img
              src={product.imageUrl || '/placeholder.png'}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div className="flex flex-col justify-center gap-4">
            <h1 className="text-3xl md:text-4xl font-bold text-green-800 capitalize">{product.name}</h1>
            <p className="text-gray-600 text-lg">{product.description}</p>
            <p className="text-xl text-green-700 font-semibold">₹{product.price} per kg</p>

            <div className="mt-4">
              <p className="text-sm text-gray-500">Sold by</p>
              <p className="text-md text-green-800 font-medium">Farmer {product.sellerName || 'Unknown'}</p>
            </div>

            <div className="flex gap-2">
              <Button button="Order Now" />
              <div onClick={() => addToCart(product)}>
                <Button button="Add to cart" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-6xl mx-auto mt-10 px-4 py-6 bg-white rounded-xl shadow-sm">
        <h2 className="text-2xl font-semibold text-green-800 mb-4">Product Details</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li><strong>Category:</strong> {product.category || 'N/A'}</li>
          <li><strong>Origin:</strong> {product.origin || 'N/A'}</li>
          <li>
            <strong>Harvested On:</strong>{" "}
            {product.harvestedOn
              ? new Date(product.harvestedOn).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : 'N/A'}
          </li>
          <li><strong>Shelf Life:</strong> {product.shelfLife || 'N/A'}</li>
          <li><strong>Stock:</strong> {product.stock || 'N/A'} kg</li>
          <li><strong>Storage Tip:</strong> {product.storageTip || 'N/A'}</li>
          <li><strong>Usage:</strong> {product.usage || 'N/A'}</li>
          <li><strong>Health Benefits:</strong> {product.healthBenefits || 'N/A'}</li>
        </ul>
      </div>

      {/* Recommendations */}
      <div className="max-w-6xl mx-auto mt-12 px-4 py-6">
        <h2 className="text-2xl font-semibold text-green-800 mb-6">
          Customers who bought this item also bought
        </h2>

        <div className="flex overflow-x-auto scrollbar-hide gap-4">
          {randomProducts.map((prod, i) => (
            <div className="flex-shrink-0 w-60" key={i}>
              <Details product={prod} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductDetailsClient;
