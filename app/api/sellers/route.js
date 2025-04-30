
import connectDB from '@/lib/db';
import Seller from '@/models/Seller';

export async function POST(req) {
  try {
    await connectDB(); // ✅ Connect to MongoDB

    const body = await req.json();

    // You can add custom logic like checking for existing phone/email here

    const newSeller = new Seller(body);
    await newSeller.save();

    return new Response(JSON.stringify({ success: true, message: 'Seller registered successfully!' }), {
      status: 201,
    });
  } catch (error) {
    console.error('Error saving seller:', error);
    return new Response(JSON.stringify({ success: false, message: 'Failed to register seller' }), {
      status: 500,
    });
  }
}
