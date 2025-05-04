

import { NextResponse } from 'next/server';

export async function POST(req) {
  const { phone, otp } = await req.json();

  if (global.otpStore && global.otpStore[phone] === otp) {
    // OTP verified, delete it
    delete global.otpStore[phone];
    return NextResponse.json({ success: true, message: 'OTP verified' });
  }

  return NextResponse.json({ success: false, message: 'Invalid OTP' }, { status: 400 });
}
