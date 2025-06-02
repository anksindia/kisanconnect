import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("kisanconnect");

    const sellers = await db.collection("sellers").find({}).toArray();

    // Extract all products safely
    const allProducts = sellers.flatMap((seller) => {
      if (!Array.isArray(seller.products)) return []; // guard clause
      return seller.products.map((product) => ({
        name: product.name,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: "1kg",
        seller: seller.firstName,
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
