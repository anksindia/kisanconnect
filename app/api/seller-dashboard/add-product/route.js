import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db('kisanconnect');
    const sellers = db.collection('sellers');
    const products = db.collection('products');

    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ success: false, message: 'Unauthorized: Missing token' }, { status: 401 });
    }

    const sessionKey = authHeader.split(' ')[1];
    const body = await req.json();
    const { phone, name, description, price, stock, category } = body;

    if (!phone || !sessionKey) {
      return NextResponse.json({ success: false, message: 'Unauthorized: Missing credentials' }, { status: 401 });
    }

    // 🔒 Validate session
    const seller = await sellers.findOne({ phone, sessionKey });
    if (!seller) {
      return NextResponse.json({ success: false, message: 'Unauthorized or session expired' }, { status: 403 });
    }

    // ✅ Basic validation
    if (!name || !price || !stock || !category) {
      return NextResponse.json({ success: false, message: 'Missing product details' }, { status: 400 });
    }

    const product = {
      sellerPhone: phone,
      name,
      description: description || '',
      price: parseFloat(price),
      stock: parseInt(stock),
      category,
      createdAt: new Date(),
    };

    await products.insertOne(product);

    return NextResponse.json({ success: true, message: 'Product added successfully' });

  } catch (error) {
    console.error('[ADD_PRODUCT_ERROR]', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
