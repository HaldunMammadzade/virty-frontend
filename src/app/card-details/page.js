'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function CardDetails() {
  const router = useRouter();
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardType, setCardType] = useState('visa');

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
  };

  const detectCardType = (number) => {
    const firstDigit = number.charAt(0);
    if (firstDigit === '4') {
      setCardType('visa');
    } else if (firstDigit === '5') {
      setCardType('mastercard');
    }
  };

  const handleNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.replace(/\s/g, '').length <= 16) {
      setCardData({ ...cardData, number: formatted });
      detectCardType(formatted);
    }
  };

  const handleExpiryChange = (e) => {
    const formatted = formatExpiry(e.target.value);
    if (formatted.replace('/', '').length <= 4) {
      setCardData({ ...cardData, expiry: formatted });
    }
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/gi, '');
    if (value.length <= 3) {
      setCardData({ ...cardData, cvv: value });
    }
  };

  const maskCardNumber = (number) => {
    const cleaned = number.replace(/\s/g, '');
    if (cleaned.length === 0) return '•••• •••• •••• ••••';
    
    const parts = [];
    for (let i = 0; i < 16; i += 4) {
      const part = cleaned.slice(i, i + 4);
      if (part) {
        parts.push(part.padEnd(4, '•'));
      } else {
        parts.push('••••');
      }
    }
    return parts.join(' ');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cardData.number.replace(/\s/g, '').length !== 16) {
      alert('Please enter valid card number');
      return;
    }
    if (!cardData.name) {
      alert('Please enter cardholder name');
      return;
    }
    if (cardData.expiry.length !== 5) {
      alert('Please enter valid expiry date');
      return;
    }
    if (cardData.cvv.length !== 3) {
      alert('Please enter valid CVV');
      return;
    }
    
    console.log('Card Details:', cardData);
    router.push('/');
  };

  return (
    <>
      

      <main className="relative min-h-screen flex items-center justify-center px-6 py-32" style={{ background: 'linear-gradient(180deg, #0a1520 0%, #050a0f 100%)' }}>
        <div className="absolute inset-0 cyber-grid opacity-10"></div>
        <div className="absolute inset-0 scan-lines"></div>
        {/* <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00ff88]/15 rounded-full blur-[150px]"></div> */}

        <div className="w-full max-w-2xl relative z-10">
          {/* Card Display */}
          <div className="mb-12 perspective-1000">
            <div 
              className={`card-container ${isFlipped ? 'flipped' : ''}`}
              style={{
                width: '100%',
                maxWidth: '420px',
                height: '260px',
                margin: '0 auto',
                position: 'relative',
                transformStyle: 'preserve-3d',
                transition: 'transform 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              {/* Front of Card */}
              <div 
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  backfaceVisibility: 'hidden',
                  borderRadius: '20px',
                  padding: '30px',
                  background: cardType === 'visa' 
                    ? 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)'
                    : 'linear-gradient(135deg, #eb3349 0%, #f45c43 100%)',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(0, 255, 136, 0.2)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div className="flex justify-between items-start">
                  <div className="w-14 h-10 rounded-md overflow-hidden" style={{
                    background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 50%, #ffd700 100%)',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
                  }}>
                    <div className="w-full h-full" style={{
                      background: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)',
                    }}></div>
                  </div>
                  
                  {cardType === 'visa' ? (
                    <svg viewBox="0 0 141 50" className="w-20 h-auto">
                      <g fill="#ffffff">
                        <path d="M63.8 19.8L57 41.3h-7.3l6.8-21.5h7.3zm32.5.1c-1.4-.5-3.6-1.1-6.3-1.1-7 0-11.9 3.7-11.9 9 0 3.9 3.5 6.1 6.2 7.4 2.8 1.3 3.7 2.2 3.7 3.4 0 1.8-2.2 2.6-4.2 2.6-2.8 0-4.3-.4-6.6-1.4l-.9-.4-1 6.1c1.7.8 4.8 1.4 8 1.4 7.4 0 12.3-3.7 12.3-9.3 0-3.1-1.9-5.5-6-7.4-2.5-1.2-4-2.1-4-3.3 0-1.1 1.2-2.2 3.8-2.2 2.2 0 3.7.5 4.9 1l.6.3.9-5.6-.5-.5zm16.5-.1L105.1 20c-.8 0-1.4.5-1.7 1.2L92.8 41.3h7.4s1.2-3.3 1.5-4h9c.2 1 .9 4 .9 4h6.5l-5.3-21.5h-6zm-5.4 13.9c.6-1.5 2.8-7.5 2.8-7.5s.6-1.5.9-2.5l.5 2.3s1.3 6.3 1.6 7.7h-5.8zm-46.8-14l-7.1 14.6-2.7-14.1c-.3-1.4-1.5-2.4-2.8-2.4H29.9l-.1.7c2.6.5 5.5 1.4 7.2 2.4 1.1.6 1.4 1.1 1.7 2.5l5.8 22.2h7.4l11.4-27.9h-7.3z"/>
                      </g>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 131 80" className="w-16 h-auto">
                      <g fill="none">
                        <circle cx="35" cy="40" r="30" fill="#eb001b"/>
                        <circle cx="65" cy="40" r="30" fill="#f79e1b"/>
                        <path d="M50 16.5c5.6 4.5 9.2 11.5 9.2 19.5s-3.6 15-9.2 19.5c5.6-4.5 9.2-11.5 9.2-19.5s-3.6-15-9.2-19.5z" fill="#ff5f00"/>
                      </g>
                    </svg>
                  )}
                </div>

                <div className="text-white text-2xl tracking-[0.2em] font-mono my-4" style={{
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                  letterSpacing: '0.15em'
                }}>
                  {maskCardNumber(cardData.number)}
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-[10px] text-gray-300 mb-1 uppercase tracking-widest opacity-70">Card Holder</div>
                    <div className="text-white font-semibold text-base uppercase tracking-wider">
                      {cardData.name || 'YOUR NAME'}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-300 mb-1 uppercase tracking-widest opacity-70">Expires</div>
                    <div className="text-white font-semibold text-base tracking-wider">
                      {cardData.expiry || 'MM/YY'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Back of Card */}
              <div 
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  borderRadius: '20px',
                  background: cardType === 'visa'
                    ? 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)'
                    : 'linear-gradient(135deg, #eb3349 0%, #f45c43 100%)',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
                }}
              >
                <div className="w-full h-12 bg-black mt-6"></div>
                
                <div className="px-8 mt-6">
                  <div className="bg-white/90 rounded h-10 flex items-center justify-end px-4" style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.03) 10px, rgba(0,0,0,0.03) 20px)',
                  }}>
                    <span className="text-black font-mono text-lg tracking-widest italic">
                      {cardData.cvv || '•••'}
                    </span>
                  </div>
                  <p className="text-white text-[10px] mt-2 text-right uppercase tracking-widest opacity-70">CVV</p>
                </div>

                <div className="absolute bottom-6 right-8">
                  {cardType === 'visa' ? (
                    <svg viewBox="0 0 141 50" className="w-16 h-auto opacity-50">
                      <g fill="#ffffff">
                        <path d="M63.8 19.8L57 41.3h-7.3l6.8-21.5h7.3zm32.5.1c-1.4-.5-3.6-1.1-6.3-1.1-7 0-11.9 3.7-11.9 9 0 3.9 3.5 6.1 6.2 7.4 2.8 1.3 3.7 2.2 3.7 3.4 0 1.8-2.2 2.6-4.2 2.6-2.8 0-4.3-.4-6.6-1.4l-.9-.4-1 6.1c1.7.8 4.8 1.4 8 1.4 7.4 0 12.3-3.7 12.3-9.3 0-3.1-1.9-5.5-6-7.4-2.5-1.2-4-2.1-4-3.3 0-1.1 1.2-2.2 3.8-2.2 2.2 0 3.7.5 4.9 1l.6.3.9-5.6-.5-.5zm16.5-.1L105.1 20c-.8 0-1.4.5-1.7 1.2L92.8 41.3h7.4s1.2-3.3 1.5-4h9c.2 1 .9 4 .9 4h6.5l-5.3-21.5h-6zm-5.4 13.9c.6-1.5 2.8-7.5 2.8-7.5s.6-1.5.9-2.5l.5 2.3s1.3 6.3 1.6 7.7h-5.8zm-46.8-14l-7.1 14.6-2.7-14.1c-.3-1.4-1.5-2.4-2.8-2.4H29.9l-.1.7c2.6.5 5.5 1.4 7.2 2.4 1.1.6 1.4 1.1 1.7 2.5l5.8 22.2h7.4l11.4-27.9h-7.3z"/>
                      </g>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 131 80" className="w-12 h-auto opacity-50">
                      <g fill="none">
                        <circle cx="35" cy="40" r="30" fill="#eb001b"/>
                        <circle cx="65" cy="40" r="30" fill="#f79e1b"/>
                        <path d="M50 16.5c5.6 4.5 9.2 11.5 9.2 19.5s-3.6 15-9.2 19.5c5.6-4.5 9.2-11.5 9.2-19.5s-3.6-15-9.2-19.5z" fill="#ff5f00"/>
                      </g>
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="border-2 border-[#00ff88]/40 rounded-2xl p-10" style={{ 
            background: 'rgba(5, 10, 15, 0.9)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 0 40px rgba(0, 255, 136, 0.2)'
          }}>
            <h2 className="text-3xl font-bold text-center mb-8 text-white">Card details</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Kartın 16 rəqəmli"
                  value={cardData.number}
                  onChange={handleNumberChange}
                  className="w-full bg-transparent border-b-2 border-[#00ff88]/50 text-[#00ff88] placeholder-[#00ff88]/40 py-3 text-lg outline-none focus:border-[#00ff88] transition-all font-mono"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="AA/İİ"
                  value={cardData.expiry}
                  onChange={handleExpiryChange}
                  className="w-full bg-transparent border-b-2 border-[#00ff88]/50 text-[#00ff88] placeholder-[#00ff88]/40 py-3 text-lg outline-none focus:border-[#00ff88] transition-all font-mono"
                  required
                />
                <input
                  type="text"
                  placeholder="CCV"
                  value={cardData.cvv}
                  onChange={handleCvvChange}
                  onFocus={() => setIsFlipped(true)}
                  onBlur={() => setIsFlipped(false)}
                  className="w-full bg-transparent border-b-2 border-[#00ff88]/50 text-[#00ff88] placeholder-[#00ff88]/40 py-3 text-lg outline-none focus:border-[#00ff88] transition-all font-mono"
                  required
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Kart sahibinin adı"
                  value={cardData.name}
                  onChange={(e) => setCardData({ ...cardData, name: e.target.value.toUpperCase() })}
                  className="w-full bg-transparent border-b-2 border-[#00ff88]/50 text-[#00ff88] placeholder-[#00ff88]/40 py-3 text-lg outline-none focus:border-[#00ff88] transition-all uppercase"
                  required
                />
              </div>

              <p className="text-xs text-gray-400 text-center">
                Kart məlumatları yalnız sizin cihazınızda saxlanılır
              </p>

              <button
                type="submit"
                className="w-full bg-[#00ff88] text-black py-4 rounded-lg text-lg font-bold hover:bg-[#00dd77] transition-all"
                style={{
                  boxShadow: '0 0 25px rgba(0, 255, 136, 0.6)'
                }}
              >
                Verify
              </button>
            </form>
          </div>
        </div>
      </main>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }

        input::placeholder {
          text-transform: none;
        }
      `}</style>
    </>
  );
}
