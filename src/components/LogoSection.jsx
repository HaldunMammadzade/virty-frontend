import Image from "next/image";

export default function LogoSection() {
  return (
    <section className="relative py-32 px-6 lg:px-12" style={{ background: '#050a0f' }}>
      <div className="absolute inset-0 cyber-grid opacity-5"></div>
      
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Logo Display */}
          <div className="relative flex  justify-center ">
            <div className="cyber-card  flex items-center justify-center bg-black/60 rounded-3xl border-2 border-[#00ff88]/20">
              {/* V Logo with Multiple Layers */}
              <div className="relative w-full max-w-md aspect-square">
                
                <Image
                  src="/images/virty.png"
                  alt="VIRTY Logo"
                  width={700}
                  height={700}
                  className="object-cover"
                  style={{ 
                    filter: 'drop-shadow(0 0 40px rgba(0, 255, 136, 0.8))',
                  }}
                  priority
                />
                
                {/* Pulsing Glow */}
                <div className="absolute inset-0 bg-[#00ff88]/20 rounded-full blur-[100px] pulse-glow"></div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-8">
            <div>
              <span className="section-label">Immersive</span>
            </div>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white">
              Redefine your digital{' '}
              <span className="text-[#00ff88] neon-text">existence</span>
            </h2>

            <p className="text-white text-lg leading-relaxed">
              VIRTY transforms how humans connect and create. We build virtual environments that transcend traditional boundaries of interaction and learning.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
              <div>
                <h4 className="text-[#00ff88] font-semibold text-lg mb-3">Subheading one</h4>
                <p className="text-white  text-sm leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim.
                </p>
              </div>
              <div>
                <h4 className="text-[#00ff88] font-semibold text-lg mb-3">Subheading two</h4>
                <p className="text-white  text-sm leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim.
                </p>
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row gap-4">
              <button className="cyber-btn-primary">
                Enter
              </button>
              <button className="cyber-btn-secondary flex items-center justify-center gap-2">
                Explore
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
