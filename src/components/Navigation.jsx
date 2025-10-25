"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a1520e6]/90 backdrop-blur-lg border-b border-[#00ff88]/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" onClick={handleLinkClick}>
            <Image
              src="/images/virty-logo.png"
              alt="VIRTY Logo"
              width={150}
              height={100}
              className="object-cover"
              priority
            />
          </Link>

          {/* Auth Buttons (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/" className="cyber-btn-secondary w-full sm:w-auto">
              Client Download
            </Link>
            <Link href="/sign-in" className="cyber-btn-primary">
              Sign In
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#00ff88]"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu (Animated) */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? "max-h-[400px] opacity-100 pt-4 pb-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="space-y-3 border-t border-[#00ff88]/10">
            <Link
              href="/"
              onClick={handleLinkClick}
              className="block py-2 text-white hover:text-[#00ff88] transition-colors"
            >
              Home
            </Link>
            <Link
              href="/features"
              onClick={handleLinkClick}
              className="block py-2 text-white hover:text-[#00ff88] transition-colors"
            >
              Features
            </Link>
            <Link
              href="/about"
              onClick={handleLinkClick}
              className="block py-2 text-white hover:text-[#00ff88] transition-colors"
            >
              About
            </Link>

            <div className="pt-3 space-y-2">
              <Link
                href="/sign-in"
                onClick={handleLinkClick}
                className="block text-center px-6 py-2.5 border-2 border-white text-white rounded-lg hover:border-[#00ff88] hover:text-[#00ff88] transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                onClick={handleLinkClick}
                className="block text-center cyber-btn-primary"
              >
                Client Download
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
