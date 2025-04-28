'use client';
import React, { useState } from 'react';
import Image from 'next/image';

const page = () => {
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const handleSendOtp = () => {
    if (phone.length === 10) {
      setOtpSent(true);
      // here you would usually trigger OTP API call
    } else {
      alert('Please enter a valid 10-digit phone number');
    }
  };

  const handleVerifyOtp = () => {
    if (otp.length === 6) {
      // verify OTP here
      alert('OTP Verified! Move to next step.');
    } else {
      alert('Please enter a valid 6-digit OTP');
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image src="/kisanconnect.png" width={50} height={50} alt="KisanConnect" />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-green-700 mb-2">Seller Registration</h2>
        <p className="text-center text-gray-600 mb-8">Step 1: Verify your phone number</p>

        {/* Phone Input */}
        {!otpSent ? (
          <>
            <input
              type="number"
              maxLength="10"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your 10-digit phone number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 mb-4"
            />
            <button
              onClick={handleSendOtp}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              maxLength="6"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter the 6-digit OTP"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 mb-4"
            />
            <button
              onClick={handleVerifyOtp}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-green-900 font-semibold py-3 rounded-lg transition"
            >
              Verify OTP
            </button>
          </>
        )}

        {/* Resend Option */}
        {otpSent && (
          <p className="text-sm text-gray-500 text-center mt-4">
            Didn't receive the OTP? <button onClick={handleSendOtp} className="text-green-600 underline">Resend</button>
          </p>
        )}
      </div>
    </div>
  );
};

export default page;
