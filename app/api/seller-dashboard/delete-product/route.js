import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db('kisanconnect');
    const sellers = db.collection('sellers');

    const { phone, productName } = await req.json();
    const authHeader = req.headers.get('authorization');
    const sessionKey = authHeader?.split(' ')[1];

    if (!phone || !productName || !sessionKey) {
      return NextResponse.json({ success: false, message: 'Missing data' }, { status: 400 });
    }

    const result = await sellers.updateOne(
      { phone, sessionKey },
      { $pull: { products: { name: productName } } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ success: false, message: 'Product not deleted' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Product deleted successfully' });
  } catch (err) {
    console.error('[DELETE_PRODUCT_ERROR]', err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
