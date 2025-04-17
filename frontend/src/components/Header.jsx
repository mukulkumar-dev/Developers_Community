"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { LogOut } from "lucide-react";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Docs", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Projects", href: "/projectShowcase" },
    { label: "Discussion", href: "/discussionShowcase" },
  ];

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/check`,
          {
            credentials: "include",
          }
        );

        const data = await res.json();

        setIsLoggedIn(data.isLoggedIn); 
      } catch (err) {
        console.log("Error checking login status:", err);
        setIsLoggedIn(false); 
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (res.ok) {
        setIsLoggedIn(false);
        window.location.href = "/";
      } else {
        console.log("Logout failed");
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white bg-opacity-20 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/">
          <img
            src="https://img.icons8.com/?size=100&id=fyrdMrvxBV9y&format=png&color=000000"
            alt="Logo"
            width={44}
            className="cursor-pointer"
          />
        </Link>

        <nav className="hidden md:flex gap-10 text-black">
          {navItems.map(({ label, href }) => (
            <Link key={label} href={href}>
              <span
                className="text-xl hover:text-blue-700 cursor-pointer transition duration-200"
                role="link"
                aria-label={label}
              >
                {label}
              </span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-xl p-2 border border-red-500 rounded-md bg-red-500 hover:bg-red-600 text-white"
              title="Log Out"
            >
              <LogOut size={20} />
            </button>
          ) : (
            <>
              <Link href="/login">
                <button className="px-4 py-2 border border-blue-500 rounded-md bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium">
                  Log In
                </button>
              </Link>
              <Link href="/signup">
                <button className="px-4 py-2 border border-blue-500 rounded-md bg-white hover:bg-blue-100 text-blue-600 text-sm font-medium">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
