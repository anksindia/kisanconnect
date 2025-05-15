// /app/api/sellers/route.js
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db('kisanconnect');
    const sellers = db.collection('sellers');

    const body = await req.json();
    const { phone, password } = body;

    if (!phone || !password) {
      return NextResponse.json({ success: false, message: 'Phone and password required' }, { status: 400 });
    }

    const seller = await sellers.findOne({ phone });
    if (!seller) {
      return NextResponse.json({ success: false, message: 'Seller not found' }, { status: 404 });
    }

    const passwordMatch = await bcrypt.compare(password, seller.password);
    if (!passwordMatch) {
      return NextResponse.json({ success: false, message: 'Invalid password' }, { status: 401 });
    }

    // ✅ Generate session key
    const sessionKey = crypto.randomBytes(32).toString('hex');

    // ✅ Store session key in DB
    await sellers.updateOne({ phone }, { $set: { sessionKey } });

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      phone,
      sessionKey
    });

  } catch (error) {
    console.error('[SELLER_LOGIN_ERROR]', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
