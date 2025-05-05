// app/api/verify-otp.js

import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(req) {
  const { phone, otp } = await req.json();

  try {
    const client = await clientPromise;
    const db = client.db();
    const otps = db.collection('otps');

    const record = await otps.findOne({ phone });

    if (!record) {
      return NextResponse.json({ success: false, message: 'No OTP found' }, { status: 400 });
    }

    // Check expiry (5 minutes)
    const isExpired = (Date.now() - new Date(record.createdAt).getTime()) > 5 * 60 * 1000;
    if (isExpired) {
      return NextResponse.json({ success: false, message: 'OTP expired' }, { status: 400 });
    }

    if (record.otp === otp) {
      await otps.deleteOne({ phone }); // Cleanup
      return NextResponse.json({ success: true, message: 'OTP verified' });
    }

    return NextResponse.json({ success: false, message: 'Invalid OTP' }, { status: 400 });

  } catch (err) {
    console.error('Verify OTP Error:', err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
