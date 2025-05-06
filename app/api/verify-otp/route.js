// /app/api/verify-otp.js
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { phone, otp } = await req.json();

  // Simple static check
  if (otp === '123456') {
    return NextResponse.json({ success: true, message: 'OTP verified' });
  }

  return NextResponse.json({ success: false, message: 'Invalid OTP' }, { status: 400 });
}
