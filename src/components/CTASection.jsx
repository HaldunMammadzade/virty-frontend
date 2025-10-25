'use client';

export default function CTASection() {
  return (
    <section className="relative py-32 px-4">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-dark-blue to-dark-bg"></div>
      <div className="absolute inset-0 cyber-grid opacity-20"></div>
      <div className="absolute inset-0 scan-lines"></div>

      <div className="relative max-w-7xl mx-auto">
        <div className="cyber-card rounded-3xl p-12 md:p-16 text-center overflow-hidden">
          {/* Glowing background effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-neon-green/10 via-transparent to-neon-cyan/10"></div>
          
          <div className="relative z-10">
            {/* Headline */}
            <div className="mb-8">
              <span className="text-sm font-semibold uppercase tracking-wider text-neon-green">
                Medium length heading goes here
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Your gateway to <br />
              <span className="text-neon-green neon-text">infinite digital worlds</span>
            </h2>

            <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
              Connect with the future of immersive digital experiences. Download VIRTY and step through the portal today.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="cyber-button rounded-lg px-8 py-4 text-lg font-semibold w-full sm:w-auto">
                Enter
              </button>
              <button className="px-8 py-4 border-2 border-neon-green text-neon-green hover:bg-neon-green/10 transition-all rounded-lg text-lg font-semibold w-full sm:w-auto">
                Client Download
              </button>
            </div>

            {/* Decorative elements */}
            <div className="mt-16 flex justify-center gap-8 text-gray-600">
              <div className="w-2 h-2 rounded-full bg-neon-green/50"></div>
              <div className="w-2 h-2 rounded-full bg-neon-green/50"></div>
              <div className="w-2 h-2 rounded-full bg-neon-green/50"></div>
              <div className="w-2 h-2 rounded-full bg-neon-green"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
