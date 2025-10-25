"use client";

export default function MediumHeadingSection() {
  return (
    <section
      className="relative py-20 px-6 lg:px-12 overflow-hidden"
      style={{
        backgroundColor: "#050a0f",
        backgroundImage: "url('/images/virty-cover2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark Matrix Background */}
      {/* <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
          radial-gradient(circle at 30% 40%, rgba(0, 255, 136, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 70% 60%, rgba(0, 255, 136, 0.1) 0%, transparent 50%)
        `,
        }}
      ></div> */}

      {/* Animated green particles/code effect */}
      {/* <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 255, 136, 0.05) 2px,
            rgba(0, 255, 136, 0.05) 4px
          )`,
            animation: "scan 10s linear infinite",
          }}
        ></div>
      </div> */}

       <div className="absolute inset-0 bg-black/60"></div>

      {/* Top Green Glow */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-[#00ff88]/10 to-transparent blur-3xl"></div>

      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-baseline">
          
          <div className="space-y-8 relative z-10">
            <h2 className="text-5xl md:text-6xl font-bold leading-tight text-white">
              Medium length heading goes here
              
              
            </h2>
          </div>

          <div className="relative  rounded-2xl overflow-hidden">
            <p className="text-white text-lg leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique. Duis cursus,
              mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam
              libero vitae erat.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-16">
              <button className="cyber-btn-primary">Discover</button>
              <button className="cyber-btn-secondary">Learn more</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
