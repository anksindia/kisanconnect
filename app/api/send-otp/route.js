// /app/api/send-otp/route.js
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { phone } = await req.json();

  // Simulate storing OTP in DB — here you skip DB entirely if needed
  console.log("Simulated OTP for", phone, "is 123456");

  // Return fake success response
  return NextResponse.json({
    success: true,
    message: 'OTP sent! Use 123456 for demo.'
  });
}
