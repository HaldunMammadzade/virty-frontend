"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { tokenManager, auth } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      const tokens = tokenManager.getTokens();
      const expired = tokenManager.isAccessTokenExpired();
      
      if (tokens?.accessToken && !expired) {
        setIsAuthenticated(true);
        // Get email from sessionStorage if available
        const signupData = sessionStorage.getItem("signupData");
        if (signupData) {
          try {
            const data = JSON.parse(signupData);
            setUserEmail(data.email || "");
          } catch (e) {
            console.error("Error parsing signup data:", e);
          }
        }
      } else {
        setIsAuthenticated(false);
        setUserEmail("");
      }
    };

    checkAuth();
    
    // Check auth status periodically
    const interval = setInterval(checkAuth, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    try {
      await auth.logout();
      setIsAuthenticated(false);
      setUserEmail("");
      sessionStorage.removeItem("signupData");
      router.push("/");
      setIsOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
      // Still clear local state even if API call fails
      setIsAuthenticated(false);
      setUserEmail("");
      sessionStorage.removeItem("signupData");
      router.push("/");
      setIsOpen(false);
    }
  };

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

          {/* Auth Buttons / User Menu (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-[#00ff88]/10 border border-[#00ff88]/30">
                  <div className="w-8 h-8 rounded-full bg-[#00ff88] flex items-center justify-center">
                    <span className="text-black font-bold text-sm">
                      {userEmail ? userEmail.charAt(0).toUpperCase() : "U"}
                    </span>
                  </div>
                  <span className="text-white text-sm max-w-[150px] truncate">
                    {userEmail || "User"}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-[#00ff88] border border-[#00ff88]/50 rounded-lg hover:bg-[#00ff88]/10 transition-all"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/" className="cyber-btn-secondary w-full sm:w-auto">
                  Client Download
                </Link>
                <Link href="/sign-in" className="cyber-btn-primary">
                  Sign In
                </Link>
              </>
            )}
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
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#00ff88]/10 border border-[#00ff88]/30">
                    <div className="w-10 h-10 rounded-full bg-[#00ff88] flex items-center justify-center">
                      <span className="text-black font-bold">
                        {userEmail ? userEmail.charAt(0).toUpperCase() : "U"}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">
                        {userEmail || "User"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-center px-6 py-2.5 border-2 border-[#00ff88] text-[#00ff88] rounded-lg hover:bg-[#00ff88]/10 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
