"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Home, Info, Phone, HelpCircle, LogIn, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserButton, useUser } from "@clerk/nextjs";

const navItems = [
  { name: "Home", path: "/", icon: <Home className="w-5 h-5" /> },
  { name: "About", path: "/about", icon: <Info className="w-5 h-5" /> },
  { name: "Contact", path: "/contact", icon: <Phone className="w-5 h-5" /> },
  { name: "FAQ's", path: "/faq", icon: <HelpCircle className="w-5 h-5" /> },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn } = useUser();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-blue-100/40 shadow-md transition duration-500">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-extrabold text-blue-900 tracking-wide hover:scale-105 transition"
        >
          E-PARTMENT
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex gap-4 items-center">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={clsx(
                "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300",
                pathname === item.path
                  ? "bg-blue-700 text-white shadow-lg"
                  : "text-blue-900 hover:bg-blue-200"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop User Section */}
        <div className="hidden sm:flex items-center gap-4">
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <Link
              href="/sign-up"
              className="ml-4 px-4 py-2 rounded-full text-sm font-semibold bg-blue-600 text-white hover:bg-red-600 transition-all duration-300"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="sm:hidden flex items-center gap-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-blue-900 hover:text-blue-700 transition"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="sm:hidden bg-blue-50/80 backdrop-blur-md px-6 pb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={clsx(
                  "flex items-center gap-2 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300",
                  pathname === item.path
                    ? "bg-blue-700 text-white"
                    : "text-blue-900 hover:bg-blue-200"
                )}
              >
                {item.icon} {item.name}
              </Link>
            ))}
            {isSignedIn ? (
              <div className="mt-2 flex justify-center">
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <Link
                href="/sign-up"
                onClick={() => setIsOpen(false)}
                className="mt-2 block text-center w-full px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-red-600 transition"
              >
                Login
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
