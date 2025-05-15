import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db('kisanconnect');
    const sellers = db.collection('sellers');

    const { searchParams } = new URL(req.url);
    const phone = searchParams.get('phone');

    // 🔐 Get the sessionKey from Authorization header
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ success: false, message: 'Unauthorized: Missing token' }, { status: 401 });
    }

    const sessionKey = authHeader.split(' ')[1];

    if (!phone || !sessionKey) {
      return NextResponse.json({ success: false, message: 'Unauthorized: Missing session data' }, { status: 401 });
    }

    const seller = await sellers.findOne({ phone, sessionKey });

    if (!seller) {
      return NextResponse.json({ success: false, message: 'Unauthorized or session expired' }, { status: 403 });
    }

    // ✅ Remove sensitive fields before sending
    const { password, sessionKey: _, ...safeSeller } = seller;

    return NextResponse.json({ success: true, data: safeSeller });

  } catch (error) {
    console.error('[GET_SELLER_DATA_ERROR]', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
