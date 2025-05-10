import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const phone = searchParams.get('phone');

    if (!phone) {
      return NextResponse.json({ success: false, message: 'Phone number is required' }, { status: 400 });
    }

    const seller = await Seller.findOne({ phone });

    if (!seller) {
      return NextResponse.json({ success: false, message: 'Seller not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: seller });
  } catch (error) {
    console.error('[GET_SELLER_DATA_ERROR]', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
