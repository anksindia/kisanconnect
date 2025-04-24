'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import Button from './Button';
import Link from 'next/link';

const Navbar1st = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  const hideLogin = pathname === '/login' || pathname === '/register';

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
          <Link href={"register"}><li className="text-gray-700 font-semibold hover:text-green-700 cursor-pointer">
            Continue as Seller
          </li></Link>
          {!hideLogin && (
            <li>
              <Link href={"/login"}><Button button="Login / Sign Up"/></Link>
            </li>
          )}
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
          <Link href={"register"}><li className="text-gray-700 font-semibold hover:text-green-700 cursor-pointer">
              Continue as Seller
            </li></Link>
            {!hideLogin && (
              <li>
                <Link href={"/login"}><Button button="Login / Sign Up"/></Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar1st;
