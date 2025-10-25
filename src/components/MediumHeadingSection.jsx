'use client';

export default function MediumHeadingSection() {
  return (
    <section className="relative py-32 px-6 lg:px-12 overflow-hidden" style={{ background: '#050a0f' }}>
      {/* Dark Matrix Background */}
      <div className="absolute inset-0" style={{
        backgroundImage: `
          radial-gradient(circle at 30% 40%, rgba(0, 255, 136, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 70% 60%, rgba(0, 255, 136, 0.1) 0%, transparent 50%)
        `,
      }}></div>

      {/* Animated green particles/code effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 255, 136, 0.05) 2px,
            rgba(0, 255, 136, 0.05) 4px
          )`,
          animation: 'scan 10s linear infinite'
        }}></div>
      </div>

      {/* Top Green Glow */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-[#00ff88]/10 to-transparent blur-3xl"></div>

      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-8 relative z-10">
            <h2 className="text-5xl md:text-6xl font-bold leading-tight text-white">
              Medium length heading<br />
              goes here
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="cyber-btn-primary">
                Discover
              </button>
              <button className="cyber-btn-secondary">
                Learn more
              </button>
            </div>
          </div>

          {/* Right Side - Visual Matrix Effect */}
          <div className="relative h-[500px] rounded-2xl overflow-hidden">
            {/* Dark base with green matrix overlay */}
            <div className="absolute inset-0 bg-black/70 rounded-2xl"></div>
            
            {/* Green code rain simulation */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#00ff88]/20 via-[#00ff88]/10 to-transparent"></div>
            
            {/* Horizontal scan lines */}
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(
                0deg,
                rgba(0, 255, 136, 0.1) 0px,
                rgba(0, 255, 136, 0.1) 1px,
                transparent 1px,
                transparent 3px
              )`
            }}></div>

            {/* Glowing accent bars */}
            <div className="absolute top-1/3 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00ff88] to-transparent opacity-60"></div>
            <div className="absolute top-2/3 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00ff88] to-transparent opacity-40"></div>

            {/* Center glow */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#00ff88]/20 rounded-full blur-[120px]"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
