import clientPromise from "@/lib/mongodb";

export async function GET(request, { params }) {
  const { slug } = params;

  try {
    const client = await clientPromise;
    const db = client.db("kisanconnect");

    const sellers = await db.collection("sellers").find({}).toArray();

    let matchedProduct = null;

    for (const seller of sellers) {
      const product = seller.products.find(
        (p) => p.name.toLowerCase().replace(/\s+/g, "-") === slug
      );
      if (product) {
        matchedProduct = {
          ...product,
          seller: seller.firstName,
          sellerId: seller._id,
        };
        break;
      }
    }

    if (!matchedProduct) {
      return new Response(JSON.stringify({ message: "Product not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(matchedProduct), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Error fetching product", error }),
      { status: 500 }
    );
  }
}
