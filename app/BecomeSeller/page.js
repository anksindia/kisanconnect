'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaRegMoneyBillAlt, FaUniversity, FaLanguage, FaHeadset, FaUsers, FaLeaf } from "react-icons/fa";

const BecomeSeller = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-[80vh] text-white py-32" style={{ backgroundImage: "url('/img.webp')" }}>
        
        <div className="relative max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          <div className="max-w-xl z-10">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">Start Selling on KisanConnect</h1>
            <p className="text-lg mb-8 text-gray-200">Connect directly with buyers, grow your farm business, and make profits without middlemen!</p>
            <Link href="/register">
              <button className="bg-yellow-400 hover:bg-yellow-300 text-green-900 font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105">Start Selling</button>
            </Link>
          </div>
        </div>
      </section>


      {/* Steps Section */}
      <section className="relative py-20">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>

        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-green-800 mb-16">Start Selling in Simple Steps</h2>
          <div className="grid md:grid-cols-4 gap-10">
            {[
              { title: "Register", desc: "Create your free seller account easily.", icon: "/register.svg" },
              { title: "List Produce", desc: "Upload fresh produce details and prices.", icon: "/crop.svg" },
              { title: "Start Selling", desc: "Get direct orders from nearby buyers.", icon: "/shoper.svg" },
              { title: "Grow Income", desc: "Expand your reach & build loyal customers.", icon: "/money.svg" },
            ].map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-white shadow-md rounded-full w-64 h-64 p-8 mx-auto hover:shadow-xl hover:ring-4 hover:ring-yellow-300 transition-all duration-300"
              >
                <Image
                  src={step.icon}
                  alt={step.title}
                  width={64}
                  height={64}
                  className="mb-4 transition-transform duration-300 hover:scale-110"
                  priority
                />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-green-800 mb-4">Seller Benefits</h2>

          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Zero Registration Fees",
                description: "Start selling without any upfront costs or hidden charges",
                icon: <FaRegMoneyBillAlt className="text-green-500 text-4xl" />
              },
              {
                title: "Direct Bank Payments",
                description: "Receive payments straight to your bank account with no delays",
                icon: <FaUniversity className="text-green-500 text-4xl" />
              },
              {
                title: "Local Language Support",
                description: "Get assistance in your preferred regional language",
                icon: <FaLanguage className="text-green-500 text-4xl" />
              },
              {
                title: "Dedicated Support",
                description: "24/7 expert help for all your selling needs",
                icon: <FaHeadset className="text-green-500 text-4xl" />
              },
              {
                title: "Wide Buyer Network",
                description: "Access to thousands of verified buyers across India",
                icon: <FaUsers className="text-green-500 text-4xl" />
              },
              {
                title: "Organic Promotion",
                description: "Special marketplace for organic and local products",
                icon: <FaLeaf className="text-green-500 text-4xl" />
              },
            ].map((benefit, i) => (
              <div
                key={i}
                className="bg-gray-50 p-8 rounded-xl border border-gray-100 hover:border-green-200 transition-all duration-300 hover:shadow-md"
              >
                <div className="flex items-center mb-5">
                  <div className="p-3 bg-green-50 rounded-lg mr-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">{benefit.title}</h3>
                </div>
                <p className="text-gray-600 pl-16">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Call to Action */}
      <section className="relative py-20 bg-green-700 [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#047857_100%)]">

        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="p-8 md:p-10 rounded-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">Ready to Grow Your Farming Business?</h2>
            <p className="text-lg text-green-800 mb-8 max-w-2xl mx-auto">
              Join thousands of farmers who are selling directly to buyers and getting better prices
            </p>
            <div className="flex justify-center">
              <Link href="/register">
                <button className="bg-yellow-400 hover:bg-yellow-300 text-green-900  font-semibold py-3 px-10 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl">
                  Start Selling Today
                </button>
              </Link>
            </div>
            <div className="mt-6 flex justify-center items-center space-x-2 text-green-900">
              <FaUsers className="text-lg" />
              <span className="text-sm font-medium">10,000+ farmers already selling</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BecomeSeller
