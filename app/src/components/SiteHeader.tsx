"use client";

import { useState } from "react";
import Link from "next/link";
import { useShop } from "@/context/ShopContext";

export const SiteHeader = () => {
  const [logoLoaded, setLogoLoaded] = useState(true);
  const { cart, currentUserRole, username, signOut } = useShop();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);


  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-pink-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-pink-700">
          {logoLoaded ? (
            <img
              src="/velvet-vine-logo.png"
              alt="Velvet & Vine Logo"
              className="h-16 w-16 object-contain"
              onError={() => setLogoLoaded(false)}
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center text-sm font-bold text-pink-700">
              VV
            </div>
          )}
          <span className="text-2xl font-bold">Velvet & Vine</span>
        </Link>

        <div className="flex items-center gap-4">
          {username ? (
            <>
              <span className="text-sm text-pink-700">Hello, {username}</span>
              <button
                onClick={signOut}
                className="rounded-lg border border-pink-300 px-2 py-1 text-sm text-pink-700 hover:bg-pink-100"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link href="/signin" className="rounded-lg border border-pink-300 px-2 py-1 text-sm text-pink-700 hover:bg-pink-100">
              Sign In
            </Link>
          )}
        </div>

        <nav className="flex gap-3 text-sm font-semibold text-pink-700">
          {currentUserRole === "customer" && <Link href="/">Shop</Link>}
          {currentUserRole === "customer" && <Link href="/cart">Cart</Link>}
          <Link href="/orders">Orders</Link>
          <Link href="/profile">Profile</Link>
          {currentUserRole === "admin" && <Link href="/admin">Admin</Link>}
          {currentUserRole === "rider" && <Link href="/rider">Delivery Driver</Link>}
        </nav>

        {currentUserRole === "customer" && (
          <div className="rounded-full bg-pink-600 px-3 py-1 text-white">Cart: {cartCount}</div>
        )}
      </div>
    </header>
  );
};
