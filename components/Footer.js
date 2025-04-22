'use client';
import React from 'react';
import { Mail, MapPin, Phone, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-green-700 text-white pt-12 pb-6 px-6 sm:px-10 lg:px-24">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 sm:grid-cols-2 gap-8">

        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold mb-3">KisanConnect</h2>
          <p className="text-sm">
          Connecting you to the roots of freshness and fairness.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-amber-300 cursor-pointer">Home</li>
            <li className="hover:text-amber-300 cursor-pointer">Explore</li>
            <li className="hover:text-amber-300 cursor-pointer">Sell Produce</li>
            <li className="hover:text-amber-300 cursor-pointer">FAQs</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={16} /> support@kisanconnect.app
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} /> +91 98765 43210
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} /> Uttarakhand, India
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 mt-2">
            <Facebook className="hover:text-amber-300 cursor-pointer" />
            <Instagram className="hover:text-amber-300 cursor-pointer" />
            <Twitter className="hover:text-amber-300 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-6 border-white/20" />

      {/* Bottom Note */}
      <div className="text-center text-sm">
        © {new Date().getFullYear()} KisanConnect. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
