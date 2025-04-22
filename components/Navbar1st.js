'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react'; 
const Navbar1st = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="shadow-md bg-white sticky top-0 z-50">
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center cursor-pointer gap-2">
          <Image src="/kisanconnect.png" alt="KisanConnect Logo" width={40} height={40} />
          <span className="text-xl font-bold text-green-700">KisanConnect</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6">
          <li className="text-gray-700 font-semibold hover:text-green-700 cursor-pointer">
            Continue as Seller
          </li>
          <li>
            <button className="bg-green-600 hover:bg-green-700 font-semibold text-white px-4 py-2 rounded-md">
              Login / Sign Up
            </button>
          </li>
        </ul>

        {/* Mobile Menu Icon */}
        <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4">
          <ul className="flex flex-col gap-4">
            <li className="text-gray-700 font-semibold hover:text-green-700 cursor-pointer">
              Continue as Seller
            </li>
            <li>
              <button className="w-full bg-green-600 hover:bg-green-700 font-semibold text-white px-4 py-2 rounded-md">
                Login / Sign Up
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar1st;
