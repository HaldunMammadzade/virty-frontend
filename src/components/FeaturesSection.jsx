'use client';

export default function FeaturesSection() {
  const features = [
    {
      icon: (
        <svg className="w-12 h-12 text-[#00ff88]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Virtual events and spaces',
      description: 'Collect and participate in immersive virtual events, transcending geographical boundaries to connect globally.',
    },
    {
      icon: (
        <svg className="w-12 h-12 text-[#00ff88]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Career discovery and learning',
      description: 'Explore professional pathways through interactive experiences. Gain skills in simulated environments.',
    },
    {
      icon: (
        <svg className="w-12 h-12 text-[#00ff88]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
      title: 'Immersive 3D experience',
      description: 'Navigate hyper-realistic digital landscapes with intuitive controls and engaging interactions.',
    },
  ];

  return (
    <section className="relative py-32 px-6 lg:px-12" style={{ background: 'linear-gradient(180deg, #050a0f 0%, #0a1520 100%)' }}>
      <div className="absolute inset-0 cyber-grid opacity-5"></div>
      
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="mb-8">
            <span className="section-label">Transform</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white leading-tight">
            Unlock infinite digital{' '}
            <span className="text-[#00ff88] neon-text">possibilities</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Experience the next generation of virtual interaction across multiple domains. Engage in immersive learning, host groundbreaking events, and explore limitless environments.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="feature-card group">
              <div className="flex flex-col items-center">
                {/* Icon */}
                <div className="mb-6 p-4 rounded-full bg-[#00ff88]/10 group-hover:bg-[#00ff88]/20 transition-all">
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-4 text-[#00ff88] group-hover:neon-text transition-all">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed text-center">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-16">
          <button className="cyber-btn-primary">Discover</button>
          <button className="cyber-btn-secondary flex items-center justify-center gap-2">
            Join
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
