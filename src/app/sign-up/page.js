'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isRobot, setIsRobot] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isRobot) {
      alert('Please verify you are not a robot');
      return;
    }
    if (!agreedToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }
    console.log('Sign up:', formData);
  };

  const inputStyle = {
    width: '100%',
    background: 'transparent',
    // border: 'none',
    border: '1px solid rgba(0, 255, 136, 0.5)',
   
    color: '#00ff88',
    padding: '10px 4px',
    fontSize: '15px',
    outline: 'none',
    transition: 'all 0.3s ease'
  };

  return (
    <>
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a1520]/90 backdrop-blur-lg border-b border-[#00ff88]/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-[#00ff88] rounded flex items-center justify-center">
                <span className="text-black font-bold text-xl">V</span>
              </div>
              <span className="text-2xl font-bold text-[#00ff88] tracking-wide neon-text">VIRTY</span>
            </Link>

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

            <div className="flex items-center gap-4">
              <Link 
                href="/"
                className="hidden sm:block px-6 py-2.5 border-2 border-white text-white hover:bg-white/10 transition-all rounded-lg text-sm font-semibold"
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
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="relative min-h-screen flex items-center justify-center px-6 py-32" style={{ background: '#0a1824' }}>
        {/* Glow Effect */}
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00ff88]/15 rounded-full blur-[150px]"></div>

        {/* Card */}
        <div className="w-full max-w-[650px] relative z-10">
          <div className="border-2 border-[#00ff88] roundedcyber-card-3xl overflow-hidden" style={{ 
            background: 'rgba(0, 0, 0, 0.85)',
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
              <Link 
                href="/sign-in"
                className="py-4 text-center font-semibold text-white/50 hover:text-white/70 transition-all bg-black/50 border-r border-b border-[#00ff88]/30"
              >
                Sign in
              </Link>
              <div className="py-4 text-center font-semibold bg-[#00ff88] text-black border-b border-[#00ff88]/30">
                Sign up
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-10 py-6">
              {/* Name Surname */}
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Name Surname"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  style={inputStyle}
                  required
                />
              </div>

              {/* City */}
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  style={inputStyle}
                  required
                />
              </div>

              {/* +994 */}
              <div className="mb-3">
                <input
                  type="tel"
                  placeholder="+994"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  style={inputStyle}
                  required
                />
              </div>

              {/* E-mail */}
              <div className="mb-3">
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
              <div className="mb-3 relative">
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

              {/* Repeat Password */}
              <div className="mb-5 relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Repeat Password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  style={{...inputStyle, paddingRight: '40px'}}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#00ff88]/70 hover:text-[#00ff88]"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-2 mb-4">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded accent-[#00ff88] flex-shrink-0"
                  style={{ accentColor: '#00ff88' }}
                  required
                />
                <label htmlFor="terms" className="text-xs text-gray-400 leading-tight">
                  Sifarişimi yerləşdirərək və ya sifarişimi tamamlayaraq, İstifadəçi razılaşması və məxfilik siyasəti ilə tanış olduğumu təstiq edirəm.
                </label>
              </div>

              {/* reCAPTCHA */}
              <div className="flex items-center justify-between px-4 py-3 border border-[#00ff88]/40 rounded-lg bg-black/40 mb-5">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="robot"
                    checked={isRobot}
                    onChange={(e) => setIsRobot(e.target.checked)}
                    className="w-5 h-5 rounded accent-[#00ff88]"
                    style={{ accentColor: '#00ff88' }}
                  />
                  <label htmlFor="robot" className="text-sm text-white">
                    I am not a robot
                  </label>
                </div>
                <div className="flex flex-col items-end">
                  <svg className="w-7 h-7 text-[#00ff88] mb-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-[9px] text-gray-500">reCAPTCHA</span>
                </div>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full bg-[#00ff88] text-black py-4 rounded-lg text-base font-bold hover:bg-[#00dd77] transition-all"
                style={{
                  boxShadow: '0 0 25px rgba(0, 255, 136, 0.6)'
                }}
              >
                Sign up
              </button>
            </form>

            {/* Bottom */}
            <div className="text-center py-5 border-t border-[#00ff88]/20">
              <p className="text-sm text-gray-400">
                Already have an account?{' '}
                <Link href="/sign-in" className="text-[#00ff88] hover:underline font-semibold">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
