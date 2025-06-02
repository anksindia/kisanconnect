import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("kisanconnect");

    const sellers = await db.collection("sellers").find({}).toArray();

    // ✅ Safely handle cases where seller.products is missing or not an array
    const allProducts = sellers.flatMap((seller) => {
      if (!Array.isArray(seller.products)) return [];
      return seller.products.map((product) => ({
        name: product.name,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: "1kg",
        seller: seller.firstName,
        slug: product.name.toLowerCase().replace(/\s+/g, "-"), // add slug if needed
      }));
    });

    return new Response(JSON.stringify(allProducts), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ message: "Error fetching products", err }),
      { status: 500 }
    );
  }
}
