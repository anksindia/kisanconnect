'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Stepper from '@/components/Stepper';
import { useRouter } from 'next/navigation';
import SendOtpButton from '@/components/SendOtpButton';
import Navbar from '@/components/Navbar';


const Register = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [step, setStep] = useState(1);
  const router = useRouter();
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const isPasswordMatch = password === confirmPassword;

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const onSubmit = async (data) => {
    try {

      Object.keys(data).forEach((key) => {
        if (typeof data[key] === 'string') {
          data[key] = data[key].trim();
        }
      });
      if (step === 1) {
        // Step 1: Verify OTP
        const otpRes = await fetch('/api/verify-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone: data.phone, otp: data.otp }),
        });

        const otpResult = await otpRes.json();
        if (!otpRes.ok) {
          alert(otpResult.message || 'OTP verification failed');
          return;
        }

        setStep(2); // Proceed to Personal Info
      } else if (step === 2) {
        // Step 2: Personal Info - just advance
        setStep(3);
      } else if (step === 3) {
        // Step 3: Final Registration with password
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        if (!response.ok) {
          alert(result.message || 'Something went wrong during registration');
          return;
        }

        setStep(4); // Go to final success/dashboard step
      }
    } catch (err) {
      console.error('Registration error:', err);
      alert('Something went wrong. Please try again.');
    }
  };




  return (
    <>
    <Navbar/>
    <div className="min-h-80 w-full bg-gradient-to-r from-white to-green-50 bg-[size:6rem_4rem] py-10 px-4 flex flex-col items-center">

      <Stepper step={step} />

      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <form onSubmit={handleSubmit(onSubmit)}>


          {step === 1 && (
            <>
              <h2 className="text-2xl font-semibold mb-6 text-center text-green-700">Verify Your Phone</h2>

              {/* phone no */}
              <label className="block mb-1 font-medium">Phone no.</label>
              <div className="flex gap-2">
                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  {...register('phone', {
                    required: 'Phone number is required',
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: 'Enter a valid 10-digit phone number',
                    },
                  })}
                  className={`flex-1 rounded px-4 py-2 focus:outline-none block text-sm 
          ${errors.phone ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700' : 'border focus:border-green-500'}`}
                  placeholder="Enter your phone number"
                />


                <SendOtpButton phone={watch('phone')} />
              </div>

              {/* input otp */}
              <div className="mb-4 mt-4">
                <label className="block mb-1 font-medium">OTP</label>
                <input
                  type="text"
                  maxLength={6}
                  inputMode="numeric"
                  {...register('otp', { required: 'OTP is required' })}
                  className={`w-full rounded px-4 py-2 focus:outline-none block p-2.5 text-sm 
          ${errors.otp ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700' : 'border focus:border-green-500'}`}
                  placeholder="Enter 6-digit OTP"
                />
                {errors.otp && <p className="mt-2 text-sm text-red-600">{errors.otp.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition font-semibold"
              >
                Verify OTP
              </button>


              {/* Login Link */}
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-700">
                  Already a seller?{' '}
                  <a href="/seller-login" className="text-green-700 font-semibold hover:underline">
                    Login
                  </a>
                </p>
              </div>
            </>
          )}


          {step === 2 && (
            <>
              <h2 className="text-2xl font-semibold mb-6 text-center text-green-700">Personal Information</h2>

              {/* First Name */}
              <div className="mb-4">
                <label className="block mb-1 font-medium">First Name</label>
                <input
                  type="text"
                  {...register('firstName', {
                    required: 'First name is required',
                    minLength: {
                      value: 1,
                      message: 'First name must be at least 1 character',
                    },
                  })}
                  className={`w-full rounded px-4 py-2 focus:outline-none block p-2.5 text-sm 
      ${errors.firstName ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700' : 'border focus:border-green-500'}`}
                  placeholder="Enter your first name"
                  onBlur={(e) => e.target.value = e.target.value.trim()}
                />
                {errors.firstName && <p className="mt-2 text-sm text-red-600">{errors.firstName.message}</p>}
              </div>

              {/* Last Name */}
              <div className="mb-4">
                <label className="block mb-1 font-medium">Last Name</label>
                <input
                  type="text"
                  {...register('lastName', {
                    required: 'Last name is required',
                    minLength: {
                      value: 1,
                      message: 'Last name must be at least 1 character',
                    },
                  })}
                  className={`w-full rounded px-4 py-2 focus:outline-none block p-2.5 text-sm 
      ${errors.lastName ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700' : 'border focus:border-green-500'}`}
                  placeholder="Enter your last name"
                  onBlur={(e) => e.target.value = e.target.value.trim()} // Trimming the input on blur
                />
                {errors.lastName && <p className="mt-2 text-sm text-red-600">{errors.lastName.message}</p>}
              </div>


              {/* Address */}
              <div className="mb-4">
                <label className="block mb-1 font-medium">Address</label>
                <textarea
                  {...register('address', {
                    required: 'Address is required',
                    minLength: {
                      value: 10,
                      message: 'Address must be at least 10 characters',
                    },
                  })}
                  rows={3}
                  className={`w-full rounded px-4 py-2 focus:outline-none block p-2.5 text-sm 
                    ${errors.address ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700' : 'border focus:border-green-500'}`}
                  placeholder="Enter your address"
                  onBlur={(e) => e.target.value = e.target.value.trim()}
                />
                {errors.address && <p className="mt-2 text-sm text-red-600">{errors.address.message}</p>}
              </div>


              {/* Email Address */}
              <div className="mb-4">
                <label className="block mb-1 font-medium">Email Address</label>
                <input
                  type="email"
                  {...register('email', { required: 'Email is required' })}
                  className={`w-full rounded px-4 py-2 focus:outline-none block p-2.5 text-sm 
                    ${errors.email ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700' : 'border focus:border-green-500'}`}
                  placeholder="Enter your email address"
                />
                {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
              </div>

              {/* GST Number */}
              <div className="mb-4">
                <label className="block mb-1 font-medium">GST Number</label>
                <input
                  type="text"
                  {...register('gst', { required: 'GST number is required' })}
                  className={`w-full rounded px-4 py-2 focus:outline-none block p-2.5 text-sm 
                    ${errors.gst ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700' : 'border focus:border-green-500'}`}
                  placeholder="Enter your GST number"
                  onBlur={(e) => e.target.value = e.target.value.trim()}
                />
                {errors.gst && <p className="mt-2 text-sm text-red-600">{errors.gst.message}</p>}
              </div>

              {/* Aadhaar Number */}
              <div className="mb-6">
                <label className="block mb-1 font-medium">Aadhaar Number</label>
                <input
                  type="text"
                  maxLength={12}
                  inputMode="numeric"
                  {...register('aadhaar', {
                    required: 'Aadhaar number is required',
                    pattern: {
                      value: /^[0-9]{12}$/,
                      message: 'Enter a valid 12-digit Aadhaar number',
                    },
                  })}
                  className={`w-full rounded px-4 py-2 focus:outline-none block p-2.5 text-sm 
                    ${errors.aadhaar ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700' : 'border focus:border-green-500'}`}
                  placeholder="Enter your Aadhaar number"
                />
                {errors.aadhaar && <p className="mt-2 text-sm text-red-600">{errors.aadhaar.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition font-semibold"
              >
                Next
              </button>


            </>
          )}


          {step === 3 && (
            <>
              <h2 className="text-2xl font-semibold mb-6 text-center text-green-700">Generate your Password</h2>

              {/* Password */}
              <div className="mb-6">
                <label className="block mb-1 font-medium">Create Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters',
                      },
                      maxLength: {
                        value: 16,
                        message: 'Password must not exceed 16 characters',
                      },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,16}$/,
                        message: 'Must include uppercase, lowercase, number, and symbol',
                      },
                    })}
                    className={`w-full rounded px-4 py-2 focus:outline-none block p-2.5 text-sm
                      ${errors.password ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700' : 'border focus:border-green-500'}`}
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-2 text-gray-500"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>

                {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
              </div>

              {/* Confirm Password */}
              <div className="mb-6">
                <label className="block mb-1 font-medium">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    {...register('confirmPassword', {
                      required: 'Please confirm your password',
                      validate: value => value === password || 'Passwords do not match',
                    })}
                    className={`w-full rounded px-4 py-2 focus:outline-none block p-2.5 text-sm 
                      ${errors.confirmPassword ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700' : 'border focus:border-green-500'}`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute right-3 top-2 text-gray-500"
                  >
                    {showConfirmPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword.message}</p>}
              </div>



              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition font-semibold"
              >
                Complete Registration
              </button>
            </>
          )}





          {step === 4 && (
            <>
              <div className="text-center space-y-6">
                <h2 className="text-3xl font-bold text-green-700">Congratulations!</h2>
                <p className="text-gray-600">You have successfully registered as a Seller on KisanConnect.</p>
                <button
                  type="button"
                  onClick={() => router.push('/seller-dashboard')}
                  className="mt-6 bg-yellow-400 hover:bg-yellow-300 text-green-900 py-3 px-6 rounded-lg font-semibold"
                >
                  Login to your Account
                </button>
              </div>
            </>
          )}


        </form>
      </div>
    </div>
    </>
  );
};

export default Register;
