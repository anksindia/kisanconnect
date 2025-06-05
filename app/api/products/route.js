import clientPromise from "@/lib/mongodb";

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db("kisanconnect");

    const { searchParams } = new URL(req.url);
    const keyword = searchParams.get("keyword")?.toLowerCase() || "";
    const category = searchParams.get("category");

    const sellers = await db.collection("sellers").find({}).toArray();

    const allProducts = sellers.flatMap((seller) => {
      if (!Array.isArray(seller.products)) return [];

      return seller.products
        .filter((product) => {
          const matchKeyword = keyword
            ? product.name?.toLowerCase().includes(keyword)
            : true;

          const matchCategory =
            category && category !== "All"
              ? product.category?.toLowerCase() === category.toLowerCase()
              : true;

          return matchKeyword && matchCategory;
        })
        .map((product) => ({
          name: product.name,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: "1kg",
          seller: seller.firstName,
          category: product.category || "Unknown",
          slug: product.name.toLowerCase().replace(/\s+/g, "-"),
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
