'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { X, ShoppingCart, UserCircle } from 'lucide-react';
import Button from './Button';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSellerLoggedIn, setIsSellerLoggedIn] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  // Seller logout handler
  const handleLogout = () => {
    sessionStorage.removeItem('phone');
    sessionStorage.removeItem('sessionKey');
    setIsSellerLoggedIn(false);
    router.push('/seller-login');
  };

  // On mount check seller session
  useEffect(() => {
    const phone = sessionStorage.getItem('phone');
    const sessionKey = sessionStorage.getItem('sessionKey');
    if (phone && sessionKey) {
      setIsSellerLoggedIn(true);
    }
  }, []);

  // Buyer redirect to /marketplace if logged in and on login page
  useEffect(() => {
    if (session && pathname === '/login') {
      router.push('/marketplace');
    }
  }, [session, pathname, router]);

  const hideLoginButton = pathname === '/login' || pathname === '/BecomeSeller';
  const hideBuyerOptions = ['/login', '/', '/seller', '/BecomeSeller'].includes(pathname);
  const hideContinueAsSeller = isSellerLoggedIn || ['/seller', '/BecomeSeller'].includes(pathname);

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
          {/* Buyer options */}
          {session && !hideBuyerOptions && (
            <>
              <li className="text-gray-700 hover:text-green-700 cursor-pointer">
                <ShoppingCart size={22} />
              </li>
              <li className="relative text-gray-700 hover:text-green-700 cursor-pointer" onClick={toggleUserMenu}>
                <UserCircle size={22} />
                {isUserMenuOpen && (
                  <ul className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md py-2">
                    <Link href="/BecomeSeller"><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Account</li></Link>
                    <Link href="/orders"><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Orders</li></Link>
                    <li onClick={() => signOut()} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Sign Out</li>
                  </ul>
                )}
              </li>
            </>
          )}

          {/* Seller Logout */}
          {isSellerLoggedIn && (
            <li>
              <button
                onClick={handleLogout}
                className="bg-red-100 hover:bg-red-200 text-red-700 font-medium px-4 py-2 rounded-lg transition"
              >
                Logout
              </button>
            </li>
          )}

          {/* Continue as Seller (Only if not seller & not already on seller pages) */}
          {!hideContinueAsSeller && (
            <Link href="/BecomeSeller">
              <li className="text-green-700 font-semibold hover:text-gray-700 cursor-pointer">
                Continue as Seller
              </li>
            </Link>
          )}

          {/* Login Button (only if not logged in and not on login page) */}
          {!session && !isSellerLoggedIn && !hideLoginButton && (
            <li>
              <Link href="/login">
                <Button button="Login" />
              </Link>
            </li>
          )}
        </ul>

        {/* Mobile Icons */}
        <div className="flex items-center gap-4 md:hidden">
          {!hideBuyerOptions && (
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
            {!hideContinueAsSeller && (
              <Link href="/BecomeSeller">
                <li className="text-gray-700 font-semibold hover:text-green-700 cursor-pointer">
                  Continue as Seller
                </li>
              </Link>
            )}
            {!hideBuyerOptions && (
              <>
                <Link href="/orders"><li className="text-gray-700 font-semibold hover:text-green-700 cursor-pointer">Orders</li></Link>
                <Link href="/BecomeSeller"><li className="text-gray-700 font-semibold hover:text-green-700 cursor-pointer">Account</li></Link>
              </>
            )}
            {!session && !isSellerLoggedIn && !hideLoginButton && (
              <li><Link href="/login"><Button button="Login" /></Link></li>
            )}
            {isSellerLoggedIn && (
              <li>
                <button
                  onClick={handleLogout}
                  className="text-red-700 font-semibold hover:text-red-800 cursor-pointer"
                >
                  Logout
                </button>
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
