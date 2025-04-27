"use client"
import Navbar1st from '@/components/Navbar';
import React from 'react';
import { useSession, signIn, signOut } from "next-auth/react"

const Login = () => {
  return (
    <>
      <Navbar1st />
      <div className="flex items-start justify-center min-h-80 py-10 bg-gradient-to-br from-gray-100 to-gray-200 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Welcome</h2>
            <p className="text-sm text-gray-500">Login or Signup to continue</p>
          </div>

          <div className="space-y-4">
            {/* GitHub */}
            <button onClick={()=>signIn("github")} className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2 text-gray-700 hover:bg-gray-100 transition">
              <img
                src="https://www.svgrepo.com/show/512317/github-142.svg"
                alt="GitHub"
                className="h-5 w-5"
              />
              <span className="text-sm font-medium">Continue with GitHub</span>
            </button>

            {/* Google */}
            <button className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2 text-gray-700 hover:bg-gray-100 transition">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="h-5 w-5"
              />
              <span className="text-sm font-medium">Continue with Google</span>
            </button>

            {/* LinkedIn */}
            <button className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2 text-gray-700 hover:bg-gray-100 transition">
              <img
                src="https://www.svgrepo.com/show/448234/linkedin.svg"
                alt="LinkedIn"
                className="h-5 w-5"
              />
              <span className="text-sm font-medium">Continue with LinkedIn</span>
            </button>
          </div>

          <p className="text-xs text-center text-gray-400 mt-6">
            By continuing, you agree to our Terms and Privacy Policy.
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;

