import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";
import { CartProvider } from "./context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "KisanConnect | Bridging Farmers and Buyers",
  description: "KisanConnect is a platform that connects local farmers directly with buyers. Discover and buy fresh, organic produce straight from the source, empowering communities and eliminating middlemen.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionWrapper>
          <CartProvider>
        {children}
        </CartProvider>
        <Footer/>
        </SessionWrapper>
      </body>
    </html>
  );
}
