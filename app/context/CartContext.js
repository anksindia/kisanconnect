'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Unique cart key for matching products
  const createCartKey = (product) => {
    return `${product._id}-${product.name}-${product.sellerName}`
      .toLowerCase()
      .replace(/\s+/g, '-');
  };

  // Load from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const parsed = JSON.parse(storedCart);
      const updated = parsed.map((item) => ({
        ...item,
        cartKey: item.cartKey || createCartKey(item),
      }));
      setCartItems(updated);
    }
  }, []);

  // Persist cart on change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    const cartKey = createCartKey(product);
    setCartItems((prev) => {
      const existing = prev.find((item) => item.cartKey === cartKey);
      if (existing) {
        return prev.map((item) =>
          item.cartKey === cartKey
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, cartKey }];
    });
  };

  const removeFromCart = (productOrKey) => {
    const cartKey =
      typeof productOrKey === 'string'
        ? productOrKey
        : productOrKey.cartKey || createCartKey(productOrKey);
    setCartItems((prev) => prev.filter((item) => item.cartKey !== cartKey));
  };

  const updateQuantity = (cartKey, newQty) => {
    if (newQty < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.cartKey === cartKey ? { ...item, quantity: newQty } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
