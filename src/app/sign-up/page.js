"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ToastContainer";
import CountrySelector from "@/components/CountrySelector";
import { auth } from "@/lib/api";

export default function SignUp() {
  const router = useRouter();
  const { showToast } = useToast();
const countries = [
  { 
    code: '+994', 
    flag: '🇦🇿', 
    name: 'Azerbaijan',
    mask: '## ###-##-##',  
    placeholder: '70 555 26 96'
  },
  { 
    code: '+90', 
    flag: '🇹🇷', 
    name: 'Turkey',
    mask: '### ###-##-##',  
    placeholder: '555 123 45 67'
  },
  { 
    code: '+7', 
    flag: '🇷🇺', 
    name: 'Russia',
    mask: '### ###-##-##',  
    placeholder: '912 345-67-89'
  },
  { 
    code: '+1', 
    flag: '🇺🇸', 
    name: 'USA',
    mask: '(###) ###-####',  
    placeholder: '(555) 123-4567'
  },
];
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  const [formData, setFormData] = useState({
    name: "",
    city: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isRobot, setIsRobot] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isRobot) {
      showToast("Please verify you are not a robot", "warning");
      return;
    }
    if (!agreedToTerms) {
      showToast("Please agree to the terms and conditions", "error");
      return;
    }

    const cleanPhone = formData.phone.replace(/[^0-9]/g, "");
    if (cleanPhone.length < 9) {
      showToast("Please enter a valid phone number", "error");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      showToast("Passwords do not match", "error");
      return;
    }

    setIsLoading(true);

    try {
      // Format phone number according to selected country mask
      const formattedPhone = formData.phoneDisplay || formatPhoneNumber(cleanPhone, selectedCountry.mask);
      
      const registerData = {
        userName: formData.name,
        city: formData.city,
        countryCode: selectedCountry.code,
        number: formattedPhone, // Send formatted phone number
        email: formData.email,
        password: formData.password,
        repeatPassword: formData.confirmPassword,
        hasAcceptedTerms: agreedToTerms,
        recaptchaToken: "recaptcha-token-placeholder", // TODO: Add actual reCAPTCHA token
      };

      const response = await auth.register(registerData);
      
      showToast("Registration successful! Please login...", "success");

      setTimeout(() => {
        router.push("/sign-in");
      }, 1000);
    } catch (error) {
      console.error("Registration error:", error);
      showToast(
        error.message || error.data?.detail || "Registration failed. Please try again.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle = {
    width: "-webkit-fill-available",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid rgba(0, 255, 136, 0.5)",
    color: "#00ff88",
    padding: "10px 4px",
    fontSize: "15px",
    outline: "none",
    transition: "all 0.3s ease",
  };



const formatPhoneNumber = (value, mask) => {
  const numbers = value.replace(/\D/g, '');
  let formatted = '';
  let numberIndex = 0;
  
  for (let i = 0; i < mask.length && numberIndex < numbers.length; i++) {
    if (mask[i] === '#') {
      formatted += numbers[numberIndex];
      numberIndex++;
    } else {
      formatted += mask[i];
    }
  }
  
  return formatted;
};

const handlePhoneChange = (e) => {
  const input = e.target.value;
  
  const numbers = input.replace(/\D/g, '');
  
  const formatted = formatPhoneNumber(numbers, selectedCountry.mask);
  
  setFormData({
    ...formData,
    phone: numbers,
    phoneDisplay: formatted
  });
};


  const formatPhone = (value) => {
    const cleaned = value.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{2})(\d{2})$/);
    if (match) {
      return `${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
    }
    return cleaned;
  };

  return (
    <>
      <main
        className="relative min-h-screen flex items-center justify-center px-6 py-32"
        style={{ background: "#0a1824" }}
      >
        <div className="w-full max-w-[650px] relative z-10">
          <div
            className="border-2 border-[#00ff88] rounded-3xl cyber-card overflow-hidden"
            style={{
              background: "#0F1111",
              boxShadow: "0 0 60px rgba(0, 255, 136, 0.4)",
            }}
          >
            <div className="flex items-center justify-center gap-3 pt-10 pb-8">
              <div
                className="w-16 h-16 bg-[#00ff88] rounded-lg flex items-center justify-center"
                style={{
                  boxShadow: "0 0 40px rgba(0, 255, 136, 0.8)",
                }}
              >
                <span className="text-black font-bold text-3xl">V</span>
              </div>
              <span
                className="text-5xl font-bold text-[#00ff88]"
                style={{
                  textShadow: "0 0 30px rgba(0, 255, 136, 1)",
                }}
              >
                VIRTY
              </span>
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

            <form onSubmit={handleSubmit} className="md:px-10 px-4 md:py-6 py-3">
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Name Surname"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  style={inputStyle}
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  style={inputStyle}
                  required
                />
              </div>

              <div className="mb-3 flex gap-3 items-end">
                <div style={{ flexShrink: 0 }}>
                  <CountrySelector
                  style={inputStyle}
                    selectedCountry={selectedCountry}
                    onSelect={setSelectedCountry}
                    countries={countries}
                  />
                </div>
                <div style={{width: '100%'}}>
                  <input
                    type="tel"
                    value={formData.phoneDisplay || ''}
                     onChange={handlePhoneChange}
                    placeholder={selectedCountry.placeholder}
                    style={{ width: "-webkit-fill-available"
                    }}
                    className=" px-4 py-3 bg-transparent border-b border-[#00ff88]/50 text-[#00ff88]  placeholder-gray-500 focus:outline-none focus:border-[#00ff88] "
                  />
                </div>
              </div>

              <div className="mb-3">
                <input
                  type="email"
                  placeholder="E-mail"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  style={inputStyle}
                  required
                />
              </div>

              <div className="mb-3 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  style={{ ...inputStyle, paddingRight: "40px" }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#00ff88]/70 hover:text-[#00ff88]"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
              </div>

              <div className="mb-5 relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Repeat Password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  style={{ ...inputStyle, paddingRight: "40px" }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#00ff88]/70 hover:text-[#00ff88]"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
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
                  style={{ accentColor: "#00ff88" }}
                  required
                />
                <label
                  htmlFor="terms"
                  className="text-xs text-gray-400 leading-tight"
                >
                  Sifarişimi yerləşdirərək və ya sifarişimi tamamlayaraq,
                  İstifadəçi razılaşması və məxfilik siyasəti ilə tanış olduğumu
                  təstiq edirəm.
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
                    style={{ accentColor: "#00ff88" }}
                  />
                  <label htmlFor="robot" className="text-sm text-white">
                    I am not a robot
                  </label>
                </div>
                <div className="flex flex-col items-end">
                  <svg
                    className="w-7 h-7 text-[#00ff88] mb-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  <span className="text-[9px] text-gray-500">reCAPTCHA</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#00ff88] text-black py-4 rounded-lg text-base font-bold hover:bg-[#00dd77] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  boxShadow: "0 0 25px rgba(0, 255, 136, 0.6)",
                }}
              >
                {isLoading ? "Registering..." : "Sign up"}
              </button>
            </form>

            <div className="text-center py-5 border-t border-[#00ff88]/20">
              <p className="text-sm text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/sign-in"
                  className="text-[#00ff88] hover:underline font-semibold"
                >
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
