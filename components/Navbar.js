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
  const [mounted, setMounted] = useState(false); 

  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  useEffect(() => {
    setMounted(true);
    const phone = sessionStorage.getItem('phone');
    const sessionKey = sessionStorage.getItem('sessionKey');
    if (phone && sessionKey) {
      setIsSellerLoggedIn(true);
    }
  }, []);

  if (!mounted) return null; 

  const isMarketplace = pathname === '/marketplace';
  const isSellerDashboard = pathname === '/seller-dashboard';
  const isSellerLoginOrRegister = ['/seller-login', '/register'].includes(pathname);
  const hideLoginButton = ['/login', '/BecomeSeller'].includes(pathname);
  const hideBuyerMenu = ['/login', '/BecomeSeller', '/seller-login'].includes(pathname);

  const handleSellerLogout = () => {
    sessionStorage.removeItem('phone');
    sessionStorage.removeItem('sessionKey');
    setIsSellerLoggedIn(false);
    router.push('/seller-login');
  };

  const handleBuyerLogout = () => {
    signOut();
  };

  const handleShopNow = () => {
    if (isSellerLoggedIn) {
      handleSellerLogout();
    } else if (session) {
      handleBuyerLogout();
    }
    router.push('/login');
  };

  const handleBecomeSeller = () => {
    if (session) {
      handleBuyerLogout();
    } else if (isSellerLoggedIn) {
      handleSellerLogout();
    }
    router.push('/BecomeSeller');
  };

  return (
    <header className="shadow-md bg-white sticky top-0 z-50">
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/kisanconnect.png" alt="KisanConnect Logo" width={40} height={40} />
          <span className="text-xl font-bold text-green-700">KisanConnect</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6">
          {isMarketplace && (
            <Link href="/cart">
              <li className="text-gray-700 hover:text-green-700 cursor-pointer">
                <ShoppingCart size={22} />
              </li>
            </Link>
          )}

          {session && !hideBuyerMenu && (
            <li className="relative text-gray-700 hover:text-green-700 cursor-pointer" onClick={toggleUserMenu}>
              <UserCircle size={22} />
              {isUserMenuOpen && (
                <ul className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md py-2 z-10">
                  <Link href="/BecomeSeller"><li className="px-4 py-2 hover:bg-gray-100">Account</li></Link>
                  <Link href="/orders"><li className="px-4 py-2 hover:bg-gray-100">Orders</li></Link>
                  <li onClick={handleBuyerLogout} className="px-4 py-2 hover:bg-gray-100">Logout as Buyer</li>
                </ul>
              )}
            </li>
          )}

          {isSellerLoggedIn && (
            <li>
              <button
                onClick={handleSellerLogout}
                className="bg-red-100 hover:bg-red-200 text-red-700 font-medium px-4 py-2 rounded-lg transition"
              >
                Logout as Seller
              </button>
            </li>
          )}

          {!isSellerLoggedIn && !isSellerLoginOrRegister && !isSellerDashboard && (
            <li onClick={handleBecomeSeller} className="text-green-700 font-semibold hover:text-gray-700 cursor-pointer">
              Continue as Seller
            </li>
          )}

          {isSellerLoggedIn && isSellerDashboard && (
            <Link href="/marketplace">
              <li className="text-green-700 font-semibold hover:text-gray-700 cursor-pointer">
                Start Buying
              </li>
            </Link>
          )}

          {!session && !isSellerLoggedIn && !hideLoginButton && (
            <li>
              <Button button="Shop Now" onClick={handleShopNow} />
            </li>
          )}

        </ul>

        {/* Mobile Icons */}
        <div className="flex items-center gap-4 md:hidden">
          {isMarketplace && (
            <Link href="/cart">
              <ShoppingCart size={24} className="text-gray-700 hover:text-green-700" />
            </Link>
          )}
          <div onClick={toggleMenu}>
            {isOpen ? <X size={28} className="text-gray-700" /> : <UserCircle size={28} className="text-gray-700" />}
          </div>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4">
          <ul className="flex flex-col gap-4">
            {!isSellerLoggedIn && !isSellerLoginOrRegister && !isSellerDashboard && (
              <li onClick={handleBecomeSeller} className="text-green-700 font-semibold hover:text-gray-700 cursor-pointer">
                Continue as Seller
              </li>
            )}
            {isSellerLoggedIn && isSellerDashboard && (
              <Link href="/marketplace">
                <li className="text-gray-700 font-semibold hover:text-green-700 cursor-pointer">
                  Start Buying
                </li>
              </Link>
            )}
            {session && !hideBuyerMenu && (
              <>
                <Link href="/orders"><li className="text-gray-700 hover:text-green-700">Orders</li></Link>
                <Link href="/BecomeSeller"><li className="text-gray-700 hover:text-green-700">Account</li></Link>
                <li onClick={handleBuyerLogout} className="text-red-600 hover:text-red-800">Logout as Buyer</li>
              </>
            )}
            {isSellerLoggedIn && (
              <li>
                <button onClick={handleSellerLogout} className="text-red-700 hover:text-red-800">
                  Logout as Seller
                </button>
              </li>
            )}
            {!session && !isSellerLoggedIn && !hideLoginButton && (
              <li>
                <Button button="Shop Now" onClick={handleShopNow} />
              </li>
            )}

          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
