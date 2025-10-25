'use client';

export default function FeatureCard({ icon, title, description }) {
  return (
    <div className="cyber-card rounded-xl p-8 group cursor-pointer">
      <div className="flex flex-col items-center text-center">
        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-neon-green/10 flex items-center justify-center mb-6 group-hover:neon-glow transition-all">
          <div className="text-neon-green text-3xl">{icon}</div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold mb-4 text-neon-green group-hover:neon-text transition-all">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
