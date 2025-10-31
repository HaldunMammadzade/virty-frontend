"use client";
import { useState } from "react";
import Image from "next/image";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <section
      className="relative py-20 px-6 lg:px-12"
      style={{
        background: "linear-gradient(180deg, #0a1520e6 0%, #050a0f 100%)",
      }}
    >
      <div className="absolute inset-0 cyber-grid opacity-5"></div>

      <div className="max-w-[1400px] mx-auto">
        <div
          className="border-2 border-[#00ff88]/30 rounded-3xl md:p-12 p-5 md:p-16 lg:p-20"
          style={{
            background: "rgba(10, 21, 32, 0.4)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
            {/* Left Side - Text Content */}
            <div className="flex flex-col justify-center space-y-8">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <Image
                  src="/images/virty-logo.png"
                  alt="VIRTY Logo"
                  width={150}
                  height={100}
                  className="object-cover"
                  priority
                />
              </div>

              {/* Heading */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
                Your gateway to
                <br />
                infinite digital worlds
              </h2>

              {/* Description */}
              <p className="text-gray-400 text-lg leading-relaxed">
                Connect with the future of human interaction through immersive
                virtual experiences.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button className="cyber-btn-primary">Enter</button>
                <button className="cyber-btn-secondary">Client Download</button>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="flex flex-col justify-center">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="cyber-input"
                    required
                  />
                </div>

                {/* Email Input */}
                <div>
                  <input
                    type="email"
                    placeholder="name+surname@domain.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="cyber-input"
                    required
                  />
                </div>

                {/* Message Textarea */}
                <div>
                  <textarea
                    placeholder="Send you message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows="6"
                    className="cyber-input resize-none"
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full cyber-btn-primary py-4 text-lg"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
