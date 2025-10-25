'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ToastContainer';

export default function SignUp() {
  const router = useRouter();
  const { showToast } = useToast();
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
      showToast('Please verify you are not a robot', 'warning');
      return;
    }
    if (!agreedToTerms) {
      showToast('Please agree to the terms and conditions', 'error');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }

    sessionStorage.setItem('signupData', JSON.stringify(formData));
    showToast('Registration successful! Redirecting...', 'success');
    
    setTimeout(() => {
      router.push('/terms');
    }, 1000);
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
    <main className="relative min-h-screen flex items-center justify-center px-6 py-32" style={{ background: '#0a1824' }}>
        <div className="w-full max-w-[650px] relative z-10">
          <div className="border-2 border-[#00ff88] rounded-3xl cyber-card overflow-hidden" style={{ 
            background: '#0F1111',
            boxShadow: '0 0 60px rgba(0, 255, 136, 0.4)'
          }}>
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

            <form onSubmit={handleSubmit} className="px-10 py-6">
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
