import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface StepBadgeProps {
  step: string;
  title: string;
}

export const StepBadge: React.FC<StepBadgeProps> = ({ step, title }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
  const translateY = interpolate(frame, [0, 15], [-20, 0], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'absolute',
        top: 48,
        left: 64,
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        opacity,
        transform: `translateY(${translateY}px)`,
        zIndex: 50,
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          backgroundColor: '#0284C7',
          color: '#FFFFFF',
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: 1.5,
          textTransform: 'uppercase',
          padding: '6px 14px',
          borderRadius: 20,
          width: 'fit-content',
          boxShadow: '0 4px 12px rgba(2, 132, 199, 0.25)',
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: '#38BDF8',
          }}
        />
        {step}
      </div>
      <h1
        style={{
          margin: 0,
          fontSize: 34,
          fontWeight: 800,
          color: '#0F172A',
          letterSpacing: -0.5,
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        {title}
      </h1>
    </div>
  );
};

interface CalloutProps {
  x: number;
  y: number;
  title: string;
  subtitle?: string;
  direction?: 'left' | 'right';
  delay?: number;
}

export const Callout: React.FC<CalloutProps> = ({
  x,
  y,
  title,
  subtitle,
  direction = 'right',
  delay = 10,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const anim = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  if (frame < delay) return null;

  const isRight = direction === 'right';
  const cardX = isRight ? x + 110 : x - 280;
  const cardY = y - 35;

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 60,
      }}
    >
      {/* Target Pin on component */}
      <div
        style={{
          position: 'absolute',
          left: x,
          top: y,
          transform: `translate(-50%, -50%) scale(${anim})`,
        }}
      >
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: '50%',
            backgroundColor: '#0284C7',
            border: '3px solid #FFFFFF',
            boxShadow: '0 0 0 3px rgba(2, 132, 199, 0.4), 0 4px 12px rgba(0,0,0,0.2)',
          }}
        />
      </div>

      {/* SVG Leader line */}
      <svg
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <line
          x1={x}
          y1={y}
          x2={isRight ? x + 90 : x - 90}
          y2={y}
          stroke="#0284C7"
          strokeWidth={2.5}
          strokeDasharray="4 3"
          opacity={anim}
        />
        <line
          x1={isRight ? x + 90 : x - 90}
          y1={y}
          x2={isRight ? x + 110 : x - 110}
          y2={cardY + 28}
          stroke="#0284C7"
          strokeWidth={2.5}
          opacity={anim}
        />
      </svg>

      {/* Callout Card */}
      <div
        style={{
          position: 'absolute',
          left: cardX,
          top: cardY,
          transform: `scale(${anim})`,
          transformOrigin: isRight ? 'left center' : 'right center',
          backgroundColor: '#FFFFFF',
          border: '1.5px solid #E2E8F0',
          borderRadius: 12,
          padding: '10px 18px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
        }}
      >
        <div
          style={{
            fontSize: 16,
            fontWeight: 800,
            color: '#0F172A',
            letterSpacing: 0.5,
            textTransform: 'uppercase',
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: '#64748B',
              marginTop: 2,
            }}
          >
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
};

interface SubtitleProps {
  text: string;
}

export const Subtitle: React.FC<SubtitleProps> = ({ text }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
  const translateY = interpolate(frame, [0, 15], [15, 0], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 54,
        left: '50%',
        transform: `translateX(-50%) translateY(${translateY}px)`,
        opacity,
        zIndex: 50,
        maxWidth: 1200,
        width: '90%',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(15, 23, 42, 0.88)',
          backdropFilter: 'blur(12px)',
          color: '#F8FAFC',
          fontSize: 24,
          fontWeight: 600,
          lineHeight: 1.45,
          textAlign: 'center',
          padding: '16px 36px',
          borderRadius: 16,
          boxShadow: '0 20px 35px -10px rgba(15, 23, 42, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
        }}
      >
        {text}
      </div>
    </div>
  );
};
