'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ShoppingCart, UserCircle } from 'lucide-react';

const Navbar2nd = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="shadow-md bg-white sticky top-0 z-50">
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center cursor-pointer gap-2">
          <Image
            src="/kisanconnect.png"
            alt="KisanConnect Logo"
            width={40}
            height={40}
            style={{ width: 'auto', height: 'auto' }}
          />
          <span className="text-xl font-bold text-green-700">KisanConnect</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6">
          <li className="text-gray-700 font-semibold hover:text-green-700 cursor-pointer">
            Orders
          </li>
          <li className="text-gray-700 hover:text-green-700 cursor-pointer">
            <ShoppingCart size={22} />
          </li>
          <li className="text-gray-700 hover:text-green-700 cursor-pointer">
            <UserCircle size={22} />
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
              Orders
            </li>
            <li className="flex items-center gap-2 text-gray-700 hover:text-green-700 cursor-pointer">
              <ShoppingCart size={20} /> Cart
            </li>
            <li className="flex items-center gap-2 text-gray-700 hover:text-green-700 cursor-pointer">
              <UserCircle size={20} /> Account
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar2nd;
