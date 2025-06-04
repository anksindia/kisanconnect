import React from 'react';
import clientPromise from '@/lib/mongodb';
import Navbar from '@/components/Navbar';
import Button from '@/components/Button';
import Details from '@/components/Details';

async function getProductData(slug) {
  try {
    const client = await clientPromise;
    const db = client.db("kisanconnect");

    const sellers = await db.collection("sellers").find({}).toArray();

    // sellers products ko flatten karo with sellerName
    const allProducts = sellers.flatMap((seller) =>
      (seller.products || []).map((product) => ({
        ...product,
        sellerName: seller.firstName,
      }))
    );

    // Slug matching by normalizing name to slug
    const matchedProduct = allProducts.find(
      (p) => p.name.toLowerCase().replace(/\s+/g, '-') === slug
    );

    // Random 5 other products excluding matchedProduct
    const filteredProducts = allProducts.filter(p => p !== matchedProduct);
    const shuffled = filteredProducts.sort(() => 0.5 - Math.random());
    const randomProducts = shuffled.slice(0, 5);

    return { matchedProduct, randomProducts };
  } catch (error) {
    console.error("Error fetching product:", error);
    return { matchedProduct: null, randomProducts: [] };
  }
}

const Produce = async ({ params }) => {
  const { slug } = params; // params is directly an object, no await needed here
  const { matchedProduct: product, randomProducts } = await getProductData(slug);

  if (!product) {
    return (
      <div className="text-center py-20 text-xl text-red-600">
        Product not found.
      </div>
    );
  }
  
  return (
    <>
      <Navbar />

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
            <h1 className="text-3xl md:text-4xl font-bold text-green-800 capitalize">
              {product.name}
            </h1>
            <p className="text-gray-600 text-lg">{product.description}</p>
            <p className="text-xl text-green-700 font-semibold">₹{product.price} per kg</p>

            <div className="mt-4">
              <p className="text-sm text-gray-500">Sold by</p>
              <p className="text-md text-green-800 font-medium">
                Farmer {product.sellerName || 'Unknown'}
              </p>
            </div>

            <div className="flex gap-2">
              <Button button="Order Now" />
              <Button button="Add to cart" />
            </div>
          </div>
        </div>
      </div>

      <div className="border border-gray-400 rounded-2xl opacity-20 my-8 mx-auto max-w-6xl"></div>

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

      <div className="max-w-6xl mx-auto mt-12 px-4 py-6 bg-white rounded-xl shadow-sm">
        <h2 className="text-2xl font-semibold text-green-800 mb-4">Customer Reviews</h2>

        <div className="space-y-6">
          {[
            { name: 'Ravi Sharma', date: 'April 20, 2025', rating: 4, text: 'The vegetables were super fresh and tasted amazing. Delivery was quick too!' },
            { name: 'Simran Kaur', date: 'April 22, 2025', rating: 5, text: "Absolutely loved it! You can really tell it's organic. Will buy again for sure." },
            { name: 'Aman Verma', date: 'April 19, 2025', rating: 4, text: "Great quality, although packaging could be improved a bit. Otherwise perfect." },
          ].map((review, idx) => (
            <div className="border border-gray-200 p-4 rounded-lg shadow-sm" key={idx}>
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-green-800">{review.name}</p>
                <p className="text-sm text-gray-500">{review.date}</p>
              </div>
              <p className="text-yellow-500 mb-1">
                {'⭐'.repeat(review.rating)}{review.rating < 5 ? '☆'.repeat(5 - review.rating) : ''}
              </p>
              <p className="text-gray-700">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Produce;
