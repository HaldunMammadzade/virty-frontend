'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a1520]/90 backdrop-blur-lg border-b border-[#00ff88]/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[#00ff88] rounded flex items-center justify-center transition-all group-hover:shadow-lg group-hover:shadow-[#00ff88]/50">
              <span className="text-black font-bold text-xl">V</span>
            </div>
            <span className="text-2xl font-bold text-[#00ff88] tracking-wide neon-text">VIRTY</span>
          </Link>

          {/* Desktop Navigation */}
          {/* <div className="hidden md:flex items-center gap-12">
            <Link href="/" className="text-white hover:text-[#00ff88] transition-colors text-base font-medium">
              Home
            </Link>
            <Link href="/features" className="text-white hover:text-[#00ff88] transition-colors text-base font-medium">
              Features
            </Link>
            <Link href="/about" className="text-white hover:text-[#00ff88] transition-colors text-base font-medium">
              About
            </Link>
          </div> */}

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link 
              href="/"
              className="cyber-btn-secondary w-full sm:w-auto"
            >
              Client Download
            </Link>
            <Link 
              href="/sign-in"
              className="cyber-btn-primary"
            >
              Sign In 
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#00ff88]"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3 border-t border-[#00ff88]/10 pt-4">
            <Link href="/" className="block py-2 text-white hover:text-[#00ff88] transition-colors">
              Home
            </Link>
            <Link href="/features" className="block py-2 text-white hover:text-[#00ff88] transition-colors">
              Features
            </Link>
            <Link href="/about" className="block py-2 text-white hover:text-[#00ff88] transition-colors">
              About
            </Link>
            <div className="pt-3 space-y-2">
              <Link 
                href="/sign-in"
                className="block text-center px-6 py-2.5 border-2 border-white text-white rounded-lg"
              >
                Sign In
              </Link>
              <Link 
                href="/sign-up"
                className="block text-center cyber-btn-primary"
              >
                Client Download
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
