'use client';
import { useState, useEffect } from 'react';

export default function HeroSection() {

  return (
    <section style={{
        backgroundColor: "#050a0f",
        backgroundImage: "url('/images/virty-cover1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">

        
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-20 text-center">
        {/* Main Logo Text */}
        <div className="mb-8">
          <h1 className="hero-title neon-text mb-6" style={{ 
            fontSize: 'clamp(70px, 12vw, 160px)',
            fontWeight: 800,
            letterSpacing: '0.1em',
            lineHeight: 0.9,
          }}>
            VIRTY
          </h1>
        </div>

        {/* Subtitle */}
        <h2 className="hero-subtitle text-white mb-6" style={{
          fontSize: 'clamp(26px, 4vw, 42px)',
          fontWeight: 600,
          letterSpacing: '0.02em',
        }}>
          The portal to cyberspace
        </h2>

        {/* Description */}
        <p className="text-white text-base md:text-lg mb-12 max-w-3xl mx-auto leading-relaxed px-4">
          Break free from physical limitations. Explore infinite digital landscapes where imagination becomes reality.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <button className="cyber-btn-primary w-full sm:w-auto">
            Enter
          </button>
          <button className="cyber-btn-secondary w-full sm:w-auto">
            Client Download
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-20">
          {['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4'].map((tab, idx) => (
            <button
              key={idx}
              className="tab-button"
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Fade Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050a0f] to-transparent pointer-events-none"></div>
    </section>
  );
}
