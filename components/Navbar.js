'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { X, ShoppingCart, UserCircle } from 'lucide-react';
import Button from './Button';
import Link from 'next/link';
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  const hideLoginButton = pathname === '/login' || pathname === '/BecomeSeller';
  const hideAccountAndOrders = pathname === '/login' || pathname === '/' || pathname === '/seller' || pathname === '/BecomeSeller';

  useEffect(() => {
    if (session && pathname === '/login') {
      router.push('/marketplace');
    }
  }, [session, pathname, router]);

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
          {session && !hideAccountAndOrders && (
            <>
              <li className="text-gray-700 hover:text-green-700 cursor-pointer">
                <ShoppingCart size={22} />
              </li>
              <li className="relative text-gray-700 hover:text-green-700 cursor-pointer" onClick={toggleUserMenu}>
                <UserCircle size={22} />
                {isUserMenuOpen && (
                  <ul className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md py-2">
                    <Link href="/BecomeSeller">
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Account</li>
                    </Link>
                    <Link href="/orders">
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Orders</li>
                    </Link>
                    <li
                      onClick={() => signOut()}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      Sign Out
                    </li>
                  </ul>
                )}
              </li>
            </>
          )}

          {/* Continue as Seller always visible */}
          <Link href="/BecomeSeller">
            <li className="text-green-700 font-semibold hover:text-gray-700 cursor-pointer">
              Continue as Seller
            </li>
          </Link>

          {!session && !hideLoginButton && (
            <li>
              <Link href="/login">
                <Button button="Login" />
              </Link>
            </li>
          )}
        </ul>

        {/* Mobile Icons */}
        <div className="flex items-center gap-4 md:hidden">
          {!hideAccountAndOrders && (
            <Link href="/cart">
              <ShoppingCart size={24} className="text-gray-700 hover:text-green-700" />
            </Link>
          )}
          <div onClick={toggleMenu}>
            {isOpen ? <X size={28} className="text-gray-700" /> : <UserCircle size={28} className="text-gray-700" />}
          </div>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4">
          <ul className="flex flex-col gap-4">
            {/* Continue as Seller always visible */}
            <Link href="/BecomeSeller">
              <li className="text-gray-700 font-semibold hover:text-green-700 cursor-pointer">
                Continue as Seller
              </li>
            </Link>

            {!hideAccountAndOrders && (
              <>
                <Link href="/orders">
                  <li className="text-gray-700 font-semibold hover:text-green-700 cursor-pointer">
                    Orders
                  </li>
                </Link>
                <Link href="/BecomeSeller">
                  <li className="text-gray-700 font-semibold hover:text-green-700 cursor-pointer">
                    Account
                  </li>
                </Link>
              </>
            )}

            {!session && !hideLoginButton && (
              <li>
                <Link href="/login">
                  <Button button="Login" />
                </Link>
              </li>
            )}

            {session && (
              <li>
                <button
                  onClick={() => signOut()}
                  className="text-gray-700 font-semibold hover:text-green-700 cursor-pointer"
                >
                  Sign Out
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
