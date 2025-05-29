import React from 'react';
import Button from './Button';


const Details = ({ product }) => {
  return (
    <div className="w-full max-w-[200px] border border-gray-200 rounded-lg shadow-sm p-3 bg-white hover:shadow-md transition-shadow duration-300">
      <div className="w-full h-32 mb-2 rounded-md overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover rounded"
        />

      </div>

      <div className="flex flex-col text-sm space-y-1">
        <div className="font-semibold text-gray-800 capitalize">{product.name}</div>
        <div className="text-gray-600">
          Farmer: <span className="text-gray-700 font-medium">{product.seller}</span>
        </div>
        <div className="text-green-700 font-semibold">Price: ₹{product.price}</div>
        <div className="text-gray-600">
          Quantity: <span className="text-gray-700">{product.quantity}</span>
        </div>
        <Button button="Add to cart" />
      </div>
    </div>
  );
};

export default Details;
