'use client';
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SendOtpButton = ({ phone }) => {
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!phone || phone.length !== 10) {
      toast.warn("Please enter a valid 10-digit phone number.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success(result.message || 'OTP sent successfully!');
      } else {
        toast.error(result.message || 'Failed to send OTP.');
      }
    } catch (error) {
      console.error("OTP Send Error:", error);
      toast.error("Something went wrong while sending OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleSendOtp}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm whitespace-nowrap"
      >
        {loading ? "Sending..." : "Send OTP"}
      </button>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </>
  );
};

export default SendOtpButton;
