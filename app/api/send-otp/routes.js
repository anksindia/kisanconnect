// /app/api/send-otp/route.js
import { NextResponse } from 'next/server';
import axios from 'axios';
import clientPromise from '@/lib/mongodb';

export async function POST(req) {
  const { phone } = await req.json();
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  console.log("Phone received:", phone);
  console.log("Generated OTP:", otp);

  const API_KEY = process.env.FAST2SMS_API_KEY;
  if (!API_KEY) {
    console.error("FAST2SMS_API_KEY missing");
    return NextResponse.json({ success: false, message: 'Server config error' }, { status: 500 });
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    const otps = db.collection('otps');

    await otps.updateOne(
      { phone },
      {
        $set: {
          otp,
          createdAt: new Date(),
        },
      },
      { upsert: true }
    );

    const smsRes = await axios.post(
      'https://www.fast2sms.com/dev/bulkV2',
      {
        route: 'otp',
        variables_values: otp,
        numbers: phone,
        country: '91',
      },
      {
        headers: {
          authorization: API_KEY,
          'Content-Type': 'application/json',
        }
      }
    );

    console.log("Fast2SMS Response:", smsRes.data);

    return NextResponse.json({ success: true, message: 'OTP sent via SMS' });

  } catch (err) {
    console.error('Fast2SMS or MongoDB Error:', err.response?.data || err.message || err);
    return NextResponse.json({ success: false, message: 'OTP send failed' }, { status: 500 });
  }
}
