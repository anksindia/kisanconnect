import React from 'react'
import Button from './Button'

const Details = () => {
  return (
    <>
      <div className="w-full max-w-[200px] border border-gray-200 rounded-lg shadow-sm p-3 bg-white hover:shadow-md transition-shadow duration-300">

        {/* Image */}
        <div className="w-full h-32 mb-2 rounded-md overflow-hidden">
          <img
            src="/maduwa.webp"
            alt="maduwa"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col text-sm space-y-1">
          <div className="font-semibold text-gray-800 capitalize">Maduwa</div>
          <div className="text-gray-600">Farmer: <span className="text-gray-700 font-medium">ayush</span></div>
          <div className="text-green-700 font-semibold">Price: ₹50</div>
          <div className="text-gray-600">Quantity: <span className="text-gray-700">2kg</span></div>
          <Button button="add to cart" />
        </div>
      </div>

    </>
  )
}

export default Details
