import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb'; 
import { slugify } from '@/app/utils/slugify';

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db('kisanconnect');
    const sellers = db.collection('sellers');

    // 🔒 Extract token & body
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ success: false, message: 'Unauthorized: Missing token' }, { status: 401 });
    }

    const sessionKey = authHeader.split(' ')[1];
    const body = await req.json();
    const {
      phone,
      name,
      imageUrl,
      description,
      price,
      stock,
      category,
      origin,
      harvestedOn,
      shelfLife,
      storageTip,
      usage,
      healthBenefits
    } = body;

    // ✅ Validate required values
    if (!phone || !sessionKey || !name || !price || !stock || !category || !imageUrl) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    // ✅ Validate seller exists
    const seller = await sellers.findOne({ phone, sessionKey });
    if (!seller) {
      return NextResponse.json({ success: false, message: 'Unauthorized or session expired' }, { status: 403 });
    }

    // 🆕 Generate slug from product name
    const slug = slugify(name);

    // 📦 Construct product object
    const product = {
      name,
      slug, 
      imageUrl,
      description: description || '',
      price: parseFloat(price),
      stock: parseInt(stock),
      category,
      origin: origin || '',
      harvestedOn: harvestedOn ? new Date(harvestedOn) : null,
      shelfLife: shelfLife || '',
      storageTip: storageTip || '',
      usage: usage || '',
      healthBenefits: healthBenefits || '',
      createdAt: new Date()
    };

    //  Push into seller's products array
    const result = await sellers.updateOne(
      { phone, sessionKey },
      { $push: { products: product } },
      { upsert: false }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ success: false, message: 'Product not added to seller' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Product added successfully' });

  } catch (error) {
    console.error('[ADD_PRODUCT_ERROR]', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
