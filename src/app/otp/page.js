'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ToastContainer';
import { auth } from '@/lib/api';

export default function OTP() {
  const router = useRouter();
  const { showToast } = useToast();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    const signupData = sessionStorage.getItem('signupData');
    if (signupData) {
      const data = JSON.parse(signupData);
      setEmail(data.email);
    }
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split('').forEach((char, idx) => {
      if (idx < 6) newOtp[idx] = char;
    });
    setOtp(newOtp);

    const lastFilledIndex = Math.min(pastedData.length, 5);
    inputRefs.current[lastFilledIndex]?.focus();
  };

  const handleVerify = async () => {
    const code = otp.join('');
    if (code.length !== 6) {
      showToast('Please enter complete OTP code', 'error');
      return;
    }

    if (!email) {
      showToast('Email not found. Please go back to sign up.', 'error');
      return;
    }

    setIsLoading(true);

    try {
      await auth.verifyEmail({
        email: email,
        otpCode: code,
      });

      showToast('Email verified successfully! Redirecting...', 'success');
      
      setTimeout(() => {
        router.push('/');
      }, 1000);
    } catch (error) {
      console.error('Verification error:', error);
      showToast(
        error.message || error.data?.detail || 'Verification failed. Please check your OTP code.',
        'error'
      );
      // Clear OTP on error
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      showToast('Email not found. Please go back to sign up.', 'error');
      return;
    }

    setIsResending(true);

    try {
      await auth.resendOTP({ email });
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
      showToast('OTP code resent. Please check your email.', 'success');
    } catch (error) {
      console.error('Resend OTP error:', error);
      showToast(
        error.message || error.data?.detail || 'Failed to resend OTP. Please try again.',
        'error'
      );
    } finally {
      setIsResending(false);
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center px-6" style={{ background: 'linear-gradient(180deg, #0a1520 0%, #050a0f 100%)' }}>
      <div className="absolute inset-0 cyber-grid opacity-10"></div>
      <div className="absolute inset-0 scan-lines"></div>
      {/* <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00ff88]/15 rounded-full blur-[150px]"></div> */}

      <div className="w-full max-w-xl relative z-10">
        <div className="border-2 border-[#00ff88] rounded-3xl p-12" style={{ 
          background: 'rgba(0, 0, 0, 0.85)',
          boxShadow: '0 0 60px rgba(0, 255, 136, 0.4)'
        }}>
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-white mb-4">Get your code</h1>
            <p className="text-gray-400 text-sm mb-2">
              We send OTP code to your e-mail address
            </p>
            <p className="text-[#00ff88] text-sm font-semibold">
              {email || 'haqibhuseynoton@gmail.com'}
            </p>
          </div>

          <div className="flex justify-center gap-3 mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="md:w-14 md:h-16 w-10 h-15 text-center text-2xl font-bold bg-transparent border-2 rounded-lg outline-none transition-all"
                style={{
                  borderColor: digit ? '#00ff88' : 'rgba(0, 255, 136, 0.3)',
                  color: '#00ff88',
                  boxShadow: digit ? '0 0 20px rgba(0, 255, 136, 0.4)' : 'none',
                }}
              />
            ))}
          </div>

          <div className="text-center mb-8">
            <button
              onClick={handleResend}
              disabled={isResending}
              className="text-sm text-gray-400 hover:text-[#00ff88] transition-colors underline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isResending ? 'Sending...' : 'Resend OTP code'}
            </button>
          </div>

          <button
            onClick={handleVerify}
            disabled={isLoading}
            className="w-full bg-[#00ff88] text-black py-4 rounded-lg text-lg font-bold hover:bg-[#00dd77] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              boxShadow: '0 0 25px rgba(0, 255, 136, 0.6)'
            }}
          >
            {isLoading ? 'Verifying...' : 'Verify'}
          </button>
        </div>
      </div>

      <style jsx>{`
        input:focus {
          animation: pulse 0.5s ease-in-out;
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      `}</style>
    </main>
  );
}
