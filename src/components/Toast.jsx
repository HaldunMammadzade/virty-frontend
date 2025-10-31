'use client';
import { useEffect, useState, useRef, useCallback } from 'react';

export default function Toast({ message, type = 'error', onClose }) {
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(100);
  const timerRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const startTimeRef = useRef(null);
  const remainingTimeRef = useRef(4000);
  const isPausedRef = useRef(false);

  // Start timer once on mount
  useEffect(() => {
    startTimeRef.current = Date.now();
    
    const startAnimation = () => {
      timerRef.current = setTimeout(() => {
        onClose();
      }, remainingTimeRef.current);

      progressIntervalRef.current = setInterval(() => {
        if (isPausedRef.current) return;
        
        const elapsed = Date.now() - startTimeRef.current;
        const remaining = Math.max(0, remainingTimeRef.current - elapsed);
        const progressPercent = (remaining / 4000) * 100;
        setProgress(progressPercent);

        if (remaining <= 0) {
          clearInterval(progressIntervalRef.current);
        }
      }, 16);
    };

    startAnimation();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, []); // Empty dependency - only run once on mount

  // Handle pause/resume separately
  useEffect(() => {
    if (isHovered) {
      // Pause
      isPausedRef.current = true;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      const elapsed = Date.now() - startTimeRef.current;
      remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsed);
    } else {
      // Resume
      if (isPausedRef.current) {
        isPausedRef.current = false;
        startTimeRef.current = Date.now();
        
        timerRef.current = setTimeout(() => {
          onClose();
        }, remainingTimeRef.current);
      }
    }
  }, [isHovered, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'info':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const getColors = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'rgba(16, 185, 129, 0.15)',
          border: '#10b981',
          text: '#10b981',
          icon: '#10b981',
          glow: 'rgba(16, 185, 129, 0.4)'
        };
      case 'warning':
        return {
          bg: 'rgba(251, 191, 36, 0.15)',
          border: '#fbbf24',
          text: '#fbbf24',
          icon: '#fbbf24',
          glow: 'rgba(251, 191, 36, 0.4)'
        };
      case 'info':
        return {
          bg: 'rgba(59, 130, 246, 0.15)',
          border: '#3b82f6',
          text: '#3b82f6',
          icon: '#3b82f6',
          glow: 'rgba(59, 130, 246, 0.4)'
        };
      default:
        return {
          bg: 'rgba(239, 68, 68, 0.15)',
          border: '#ef4444',
          text: '#ef4444',
          icon: '#ef4444',
          glow: 'rgba(239, 68, 68, 0.4)'
        };
    }
  };

  const colors = getColors();

  return (
    <div 
      className="toast-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="toast-content"
        style={{
          background: colors.bg,
          border: `2px solid ${colors.border}`,
      //     borderRadius: '16px',
          padding: '16px 20px',
          backdropFilter: 'blur(20px)',
          boxShadow: `0 8px 32px ${colors.glow}, 0 0 60px ${colors.glow}`,
          minWidth: '320px',
          maxWidth: '420px',
          cursor: 'pointer',
        }}
      >
        <div className="flex items-start gap-4">
          <div 
            className="flex-shrink-0"
            style={{
              color: colors.icon,
              animation: 'iconPulse 2s ease-in-out infinite',
            }}
          >
            {getIcon()}
          </div>

          <div className="flex-1">
            <p 
              className="font-semibold text-base leading-relaxed"
              style={{ color: colors.text }}
            >
              {message}
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex-shrink-0 hover:opacity-70 transition-opacity"
            style={{ color: colors.icon }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div 
          className="progress-bar"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: colors.border,
            borderRadius: '0 0 14px 14px',
            transformOrigin: 'left',
            transform: `scaleX(${progress / 100})`,
            transition: 'transform 0.016s linear',
          }}
        />
      </div>

      <style>{`
        @keyframes iconPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }

        .toast-content {
          position: relative;
          overflow: hidden;
        }

        .toast-content::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            45deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          transform: rotate(45deg);
          animation: shine 3s ease-in-out infinite;
        }

        @keyframes shine {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(100%) translateY(100%) rotate(45deg);
          }
        }
      `}</style>
    </div>
  );
}
