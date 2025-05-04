

import { NextResponse } from 'next/server';

export async function POST(req) {
  const { phone } = await req.json();

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Store OTP temporarily (for testing, let's use a memory store — in real app, DB ya Redis ideal hai)
  // Let's simulate storing it globally (just for dev)
  global.otpStore = global.otpStore || {};
  global.otpStore[phone] = otp;

  console.log(`OTP for ${phone}: ${otp}`); // Development only

  return NextResponse.json({ success: true, message: 'OTP sent successfully' });
}
