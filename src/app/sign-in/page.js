'use client';
import { useState } from 'react';
import Link from 'next/link';
import ContactSection from '@/components/ContactSection';
export default function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const inputStyle = {
    width: '100%',
    background: 'transparent',
    border: '1px solid rgba(0, 255, 136, 0.5)',
    color: '#00ff88',
    padding: '10px 4px',
    fontSize: '15px',
    outline: 'none',
    transition: 'all 0.3s ease'
  };

  return (
    <>
      {/* Main */}
      <main className="relative min-h-screen flex items-center justify-center px-6 py-32" style={{ background: '#0a1824' }}>
  
        {/* Card */}
        <div className="w-full max-w-[650px] relative z-10 ">
          <div className="border-2 border-[#00ff88] rounded-3xl cyber-card overflow-hidden" style={{ 
            background: '#0F1111',
            boxShadow: '0 0 60px rgba(0, 255, 136, 0.4)'
          }}>
            {/* Logo */}
            <div className="flex items-center justify-center gap-3 pt-10 pb-8">
              <div className="w-16 h-16 bg-[#00ff88] rounded-lg flex items-center justify-center" style={{
                boxShadow: '0 0 40px rgba(0, 255, 136, 0.8)'
              }}>
                <span className="text-black font-bold text-3xl">V</span>
              </div>
              <span className="text-5xl font-bold text-[#00ff88]" style={{
                textShadow: '0 0 30px rgba(0, 255, 136, 1)'
              }}>VIRTY</span>
            </div>

            {/* Tabs */}
            <div className="grid grid-cols-2">
              <div className="py-4 text-center font-semibold bg-[#00ff88] text-black border-b border-r border-[#00ff88]/30">
                Sign in
              </div>
              <Link 
                href="/sign-up"
                className="py-4 text-center font-semibold text-white/50 hover:text-white/70 transition-all bg-black/50 border-b border-[#00ff88]/30"
              >
                Sign up
              </Link>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-10 py-8">
              {/* Email */}
              <div className="mb-5">
                <input
                  type="email"
                  placeholder="E-mail"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  style={inputStyle}
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-6 relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  style={{...inputStyle, paddingRight: '40px'}}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#00ff88]/70 hover:text-[#00ff88]"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>

              {/* Forgot Password */}
              <div className="text-right mb-8">
                <Link href="#" className="text-sm text-gray-400 hover:text-[#00ff88] transition-colors">
                  Forgot password?
                </Link>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full bg-[#00ff88] text-black py-4 rounded-lg text-base font-bold hover:bg-[#00dd77] transition-all"
                style={{
                  boxShadow: '0 0 25px rgba(0, 255, 136, 0.6)'
                }}
              >
                Sign in
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4 my-8">
                <div className="flex-1 h-px bg-[#00ff88]/20"></div>
                <span className="text-sm text-gray-400">or</span>
                <div className="flex-1 h-px bg-[#00ff88]/20"></div>
              </div>

              {/* Social Login Buttons */}
              <div className="space-y-3">
                <button 
                  type="button"
                  className="w-full py-3 px-4 border border-[#00ff88]/30 rounded-lg text-white hover:bg-[#00ff88]/10 transition-all flex items-center justify-center gap-3"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span className="text-sm font-medium">Continue with Google</span>
                </button>

                <button 
                  type="button"
                  className="w-full py-3 px-4 border border-[#00ff88]/30 rounded-lg text-white hover:bg-[#00ff88]/10 transition-all flex items-center justify-center gap-3"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  <span className="text-sm font-medium">Continue with GitHub</span>
                </button>
              </div>
            </form>

            {/* Bottom */}
            <div className="text-center py-5 border-t border-[#00ff88]/20">
              <p className="text-sm text-gray-400">
                Don`t have an account?{' '}
                <Link href="/sign-up" className="text-[#00ff88] hover:underline font-semibold">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
       
      </main>
       <ContactSection/>
    </>
  );
}
