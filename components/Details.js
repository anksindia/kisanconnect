'use client';

import React from "react";
import Button from "./Button";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext"; // Adjust path if needed

// Generate slug from product name
const generateSlug = (name) => {
  return name.toLowerCase().replace(/\s+/g, "-");
};

const Details = ({ product }) => {
  const slug = generateSlug(product.name);
  const { addToCart } = useCart();

  // Prevent card navigation when clicking Add to Cart
  const handleAddToCartClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart(product);
  };

  return (
    <Link href={`/marketplace/${slug}`} className="block">
      <div className="w-full max-w-[200px] border border-gray-200 rounded-lg shadow-sm p-3 bg-white hover:shadow-md transition-shadow duration-300 cursor-pointer">

        {/* Image */}
        <div className="w-full h-32 mb-2 rounded-md overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover rounded"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col text-sm space-y-1">
          <div className="font-semibold text-gray-800 capitalize">
            {product.name}
          </div>
          <div className="text-gray-600">
            Farmer:{" "}
            <span className="text-gray-700 font-medium">
              {product?.sellerName ?? product?.seller ?? "Unknown"}
            </span>
          </div>
          <div className="text-gray-600">
            Quantity:{" "}
            <span className="text-gray-700">
              {product.stock || "1kg"}
            </span>
          </div>
          <div className="text-green-700 font-semibold">
            Price: ₹{product.price}
          </div>

          {/* Add to Cart */}
          <div onClick={handleAddToCartClick}>
            <Button button="Add to cart" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Details;
