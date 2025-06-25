import React from 'react';
import clientPromise from '@/lib/mongodb';
import Navbar from '@/components/Navbar';
import ProductDetailsClient from '@/components/ProductDetailsClient';

async function getProductData(slug) {
  try {
    const client = await clientPromise;
    const db = client.db("kisanconnect");
    const sellers = await db.collection("sellers").find({}).toArray();

    const allProducts = sellers.flatMap((seller) =>
      (seller.products || []).map((product) => ({
        ...product,
        sellerName: seller.firstName,
      }))
    );

    const matchedProduct = allProducts.find(
      (p) => p.name.toLowerCase().replace(/\s+/g, '-') === slug
    );

    const filteredProducts = allProducts.filter(p => p !== matchedProduct);
    const shuffled = filteredProducts.sort(() => 0.5 - Math.random());
    const randomProducts = shuffled.slice(0, 5);

    return { matchedProduct, randomProducts };
  } catch (error) {
    console.error("Error fetching product:", error);
    return { matchedProduct: null, randomProducts: [] };
  }
}

const ProducePage = async ({ params }) => {
  const { slug } = params;
  const { matchedProduct, randomProducts } = await getProductData(slug);

  if (!matchedProduct) {
    return (
      <div className="text-center py-20 text-xl text-red-600">
        Product not found.
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <ProductDetailsClient product={matchedProduct} randomProducts={randomProducts} />
    </>
  );
};

export default ProducePage;
