'use client';
import { useState, useRef, useEffect } from 'react';

// const countries = [
//   { code: '+994', flag: '🇦🇿', name: 'Azerbaijan', mask: '99 999 99 99', placeholder: '__ ___ __ __' },
//   { code: '+90', flag: '🇹🇷', name: 'Turkey', mask: '999 999 9999', placeholder: '___ ___ ____' },
//   { code: '+1', flag: '🇺🇸', name: 'USA', mask: '(999) 999-9999', placeholder: '(___) ___-____' },
//   { code: '+44', flag: '🇬🇧', name: 'UK', mask: '9999 999999', placeholder: '____ ______' },
//   { code: '+7', flag: '🇷🇺', name: 'Russia', mask: '(999) 999-99-99', placeholder: '(___) ___-__-__' },
//   { code: '+49', flag: '🇩🇪', name: 'Germany', mask: '999 99999999', placeholder: '___ ________' },
//   { code: '+33', flag: '🇫🇷', name: 'France', mask: '9 99 99 99 99', placeholder: '_ __ __ __ __' },
//   { code: '+971', flag: '🇦🇪', name: 'UAE', mask: '99 999 9999', placeholder: '__ ___ ____' },
//   { code: '+966', flag: '🇸🇦', name: 'Saudi Arabia', mask: '99 999 9999', placeholder: '__ ___ ____' },
//   { code: '+91', flag: '🇮🇳', name: 'India', mask: '99999 99999', placeholder: '_____ _____' },
// ];

export default function CountrySelector({ selectedCountry, onSelect, countries }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.code.includes(searchQuery)
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-transparent border-b border-[#00ff88]/50  hover:border-[#00ff88] transition-all"
        style={{ minWidth: '100px' }}
      >
        <span className="text-2xl">{selectedCountry.flag}</span>
        <span className="text-[#00ff88]  text-sm">{selectedCountry.code}</span>
        <svg 
          className="w-4 h-4 text-[#00ff88] transition-transform" 
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div 
          className="absolute top-full left-0 mt-2 w-72 bg-[#0a1520] border-2 border-[#00ff88]/40 rounded-xl shadow-2xl z-50 overflow-hidden"
          style={{
            backdropFilter: 'blur(20px)',
            boxShadow: '0 0 40px rgba(0, 255, 136, 0.3)',
            animation: 'slideDown 0.3s ease-out'
          }}
        >
          {/* Search */}
          <div className="p-3 border-b border-[#00ff88]/20">
            <input
              type="text"
              placeholder="Search country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border border-[#00ff88]/30 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-[#00ff88]"
              autoFocus
            />
          </div>

          {/* Countries List */}
          <div className="max-h-64 overflow-y-auto custom-scrollbar">
            {filteredCountries.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => {
                  onSelect(country);
                  setIsOpen(false);
                  setSearchQuery('');
                }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#00ff88]/10 transition-all text-left"
              >
                <span className="text-2xl">{country.flag}</span>
                <div className="flex-1">
                  <div className="text-white text-sm font-medium">{country.name}</div>
                  <div className="text-gray-400 text-xs">{country.code}</div>
                </div>
                {selectedCountry.code === country.code && (
                  <svg className="w-5 h-5 text-[#00ff88]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      <style>{`

      .relative {
      position: relative;}

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 255, 136, 0.1);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 255, 136, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 255, 136, 0.7);
        }
      `}</style>
    </div>
   
  );
}
