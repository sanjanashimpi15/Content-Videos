import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { Callout, StepBadge, Subtitle } from '../components/Labels';
import { Propeller } from '../components/Propeller';

export const Scene02Propeller: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Gentle floating entrance
  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const propY = interpolate(entrance, [0, 1], [620, 520]);
  const propScale = interpolate(entrance, [0, 1], [0.85, 1.35]);

  // Gentle 3D floating hover motion
  const floatZ = Math.sin(frame * 0.08) * 12;

  // Center Hub highlight activates after frame 45
  const isHubHighlighted = frame >= 45;

  return (
    <div
      style={{
        position: 'relative',
        width: 1920,
        height: 1080,
        backgroundColor: '#F8FAFC',
        overflow: 'hidden',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      {/* Background STEM Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle, #CBD5E1 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.45,
        }}
      />

      {/* Step Badge */}
      <StepBadge step="Step 2" title="Introduce the Propeller" />

      {/* Real Kit Photo Reference Inset Card */}
      <div
        style={{
          position: 'absolute',
          top: 48,
          right: 64,
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          padding: '12px 18px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.08)',
          border: '1.5px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          zIndex: 40,
        }}
      >
        <Img
          src={staticFile('assets/pulley-propeller.png')}
          style={{
            width: 130,
            height: 80,
            objectFit: 'contain',
          }}
        />
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#64748B' }}>
            KIT REFERENCE
          </div>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#0F172A' }}>
            Pulley & Propeller
          </div>
        </div>
      </div>

      {/* 3D Angled Perspective Stage */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          perspective: 1200,
          perspectiveOrigin: '50% 50%',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 960,
            top: propY,
            transformStyle: 'preserve-3d',
            transform: `scale(${propScale}) rotateX(48deg) rotateZ(18deg)`,
          }}
        >
          <Propeller
            z={floatZ}
            rotation={0}
            showOpening={true}
            highlightHub={isHubHighlighted}
          />
        </div>
      </div>

      {/* Callout 1: Propeller Blade */}
      <Callout
        x={730}
        y={420}
        title="Blue Propeller"
        subtitle="4 curved aerodynamic blades"
        direction="left"
        delay={15}
      />

      {/* Callout 2: Center Hub Opening */}
      {frame >= 45 && (
        <Callout
          x={960}
          y={490}
          title="Center Hub"
          subtitle="Receptive bore fits motor shaft"
          direction="right"
          delay={45}
        />
      )}

      {/* Narration Subtitle */}
      <Subtitle text="Next, take the blue propeller and identify the opening at its center." />
    </div>
  );
};
