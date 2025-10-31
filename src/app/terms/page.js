'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Terms() {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleContinue = () => {
    if (agreed) {
      router.push('/otp');
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  const handleDecline = () => {
    router.push('/sign-up');
  };

  return (
    <main className="relative min-h-screen px-6 py-24" style={{ background: 'linear-gradient(180deg, #0a1520 0%, #050a0f 100%)' }}>
      <div className="absolute inset-0 cyber-grid opacity-10"></div>
      <div className="absolute inset-0 scan-lines"></div>

      {/* Error Notification */}
      {showError && (
        <div 
          className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 rounded-lg border-2 border-red-500 bg-red-500/10 backdrop-blur-lg animate-shake"
          style={{
            animation: 'slideDown 0.3s ease-out, shake 0.5s ease-in-out',
            boxShadow: '0 0 30px rgba(239, 68, 68, 0.5)'
          }}
        >
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-white font-semibold">Müqavilə şərtləri qəbul edilməlidir!</p>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="border-2 border-[#00ff88]/40 rounded-2xl md:p-12 p-6" style={{ 
          background: 'rgba(5, 10, 15, 0.9)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 0 40px rgba(0, 255, 136, 0.2)'
        }}>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-white">
            Müqavilə şərtləri
          </h1>

          <div className="space-y-8 text-gray-300 leading-relaxed  overflow-y-auto pr-4 custom-scrollbar">
            <div>
              <h2 className="text-xl font-bold text-[#00ff88] mb-4">
                Organizations have not reached a level of maturity in their AI infrastructure.
              </h2>
              <p className="text-sm mb-4">
                How are IT leaders changing their cloud strategies in times of uncertainty? What are the biggest barriers to achieving true corporate sustainability? What's helping to reduce burnout on software and IT teams? Where does Virt Get all of the Buffalo pocket squares? (We're still gathering data on that last one.)
              </p>
              <p className="text-sm mb-4">
                The cloud computing landscape is as dynamic as the weather. As the pace of innovation in the cloud and the availability of new tools and services continues to explode, Gartner® forecasters worldwide public cloud end-user spending to reach nearly $600 billion in 2023. It's an exciting, promising, and sometimes dizzying time.
              </p>
              <p className="text-sm">
                To help the C-suite, IT, and business decision-makers keep up with industry-shaping trends, we're kicking off the vire blog to share the latest insights across topics that matter to today's organizational leaders: business resilience, data analytics, artificial intelligence (AI) and machine learning (ML), cloud infrastructure, cybersecurity, corporate sustainability, and more.
              </p>
            </div>

            <div className="border-t border-[#00ff88]/20 pt-8">
              <p className="text-sm mb-4">
                Bonus: Every site has a complementary visual slide available to download. We'll be adding to this post each week, so bookmark it as a go-to resource for the latest cloud computing trends, statistics, and insights to shape decision-making in 2023.
              </p>
              <p className="text-sm mb-4">
                How are IT leaders changing their cloud strategies in times of uncertainty? What are the biggest barriers to achieving true corporate sustainability? What's helping to reduce burnout on software and IT teams? Where does Virt Get all of the Buffalo pocket squares? (We're still gathering data on that last one.)
              </p>
              <p className="text-sm">
                The cloud computing landscape is as dynamic as the weather. As the pace of innovation in the cloud and the availability of new tools and services continues to explode, Gartner® forecasters worldwide public cloud end-user spending to reach nearly $600 billion in 2023. It's an exciting, promising, and sometimes dizzying time.
              </p>
            </div>

            <div className="border-t border-[#00ff88]/20 pt-8">
              <h2 className="text-xl font-bold text-[#00ff88] mb-4">
                CxOs are leveraging AI to turn IT operations into a well-oiled machine.
              </h2>
              <p className="text-sm mb-4">
                How are IT leaders changing their cloud strategies in times of uncertainty? What are the biggest barriers to achieving true corporate sustainability? What's helping to reduce burnout on software and IT teams? Where does Virt Get all of the Buffalo pocket squares? (We're still gathering data on that last one.)
              </p>
              <p className="text-sm mb-4">
                The cloud computing landscape is as dynamic as the weather. As the pace of innovation in the cloud and the availability of new tools and services continues to explode, Gartner® forecasters worldwide public cloud end-user spending to reach nearly $600 billion in 2023. It's an exciting, promising, and sometimes dizzying time.
              </p>
              <p className="text-sm">
                To help the C-suite, IT, and business decision-makers keep up with industry-shaping trends, we're kicking off the vire blog to share the latest insights across topics that matter to today's organizational leaders.
              </p>
            </div>

            <div className="border-t border-[#00ff88]/20 pt-8">
              <p className="text-sm mb-4">
                Bonus: Every site has a complementary visual slide available to download. We'll be adding to this post each week, so bookmark it as a go-to resource for the latest cloud computing trends, statistics, and insights to shape decision-making in 2023.
              </p>
              <p className="text-sm mb-4">
                How are IT leaders changing their cloud strategies in times of uncertainty? What are the biggest barriers to achieving true corporate sustainability? What's helping to reduce burnout on software and IT teams? Where does Virt Get all of the Buffalo pocket squares? (We're still gathering data on that last one.)
              </p>
              <p className="text-sm">
                The cloud computing landscape is as dynamic as the weather. As the pace of innovation in the cloud and the availability of new tools and services continues to explode, Gartner® forecasters worldwide public cloud end-user spending to reach nearly $600 billion in 2023. It's an exciting, promising, and sometimes dizzying time.
              </p>
            </div>

            <div className="border-t border-[#00ff88]/20 pt-8">
              <h2 className="text-xl font-bold text-[#00ff88] mb-4">
                CxOs are leveraging AI to turn IT operations into a well-oiled machine.
              </h2>
              <p className="text-sm mb-4">
                How are IT leaders changing their cloud strategies in times of uncertainty? What are the biggest barriers to achieving true corporate sustainability? What's helping to reduce burnout on software and IT teams? Where does Virt Get all of the Buffalo pocket squares? (We're still gathering data on that last one.)
              </p>
              <p className="text-sm mb-4">
                The cloud computing landscape is as dynamic as the weather. As the pace of innovation in the cloud and the availability of new tools and services continues to explode, Gartner® forecasters worldwide public cloud end-user spending to reach nearly $600 billion in 2023. It's an exciting, promising, and sometimes dizzying time.
              </p>
              <p className="text-sm">
                To help the C-suite, IT, and business decision-makers keep up with industry-shaping trends, we're kicking off the vire blog to share the latest insights across topics that matter to today's organizational leaders.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 mt-8 mb-8">
            <input
              type="checkbox"
              id="agree"
              checked={agreed}
              onChange={(e) => {
                setAgreed(e.target.checked);
                setShowError(false);
              }}
              className="mt-1 w-5 h-5 rounded accent-[#00ff88] flex-shrink-0 cursor-pointer"
              style={{ accentColor: '#00ff88' }}
            />
            <label htmlFor="agree" className="text-sm text-gray-300 leading-relaxed cursor-pointer">
              Müqavilə şərtləri qəbul edirəm
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleDecline}
              className="py-4 border-2 border-[#00ff88] text-[#00ff88] rounded-lg font-semibold hover:bg-[#00ff88]/10 transition-all"
            >
              İmtina et
            </button>
            <button
              onClick={handleContinue}
              className={`py-4 rounded-lg font-semibold transition-all ${
                agreed 
                  ? 'bg-[#00ff88] text-black hover:bg-[#00dd77]' 
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
              style={{
                boxShadow: agreed ? '0 0 20px rgba(0, 255, 136, 0.5)' : 'none'
              }}
            >
              Davam et
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 255, 136, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 255, 136, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 255, 136, 0.7);
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translate(-50%, -20px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }

        @keyframes shake {
          0%, 100% { transform: translate(-50%, 0); }
          10%, 30%, 50%, 70%, 90% { transform: translate(-55%, 0); }
          20%, 40%, 60%, 80% { transform: translate(-45%, 0); }
        }

        .animate-shake {
          animation: slideDown 0.3s ease-out, shake 0.5s ease-in-out 0.3s;
        }
      `}</style>
    </main>
  );
}
