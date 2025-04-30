// app/api/register/route.js (if using Next.js API route)
import connectDB from "@/lib/db";
import Seller from "@/models/Seller";

export async function POST(req) {
  await connectDB(); 
  const body = await req.json();

  try {
    const seller = new Seller(body);
    await seller.save(); 
    return new Response(JSON.stringify({ success: true }), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Error saving seller' }), { status: 500 });
  }
}
