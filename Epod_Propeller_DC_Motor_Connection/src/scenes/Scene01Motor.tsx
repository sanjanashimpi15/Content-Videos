import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { Callout, StepBadge, Subtitle } from '../components/Labels';
import { Motor } from '../components/Motor';

export const Scene01Motor: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Gentle entrance animation for motor
  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const motorY = interpolate(entrance, [0, 1], [620, 560]);
  const motorScale = interpolate(entrance, [0, 1], [0.9, 1.25]);

  // Shaft highlight activates after frame 70
  const isShaftHighlighted = frame >= 70 && frame <= 210;

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
      <StepBadge step="Step 1" title="Introduce the DC Motor" />

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
          src={staticFile('assets/dc-motor.png')}
          style={{
            width: 80,
            height: 95,
            objectFit: 'contain',
          }}
        />
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#64748B' }}>
            KIT REFERENCE
          </div>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#0F172A' }}>
            DC Motor
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
            top: motorY,
            transformStyle: 'preserve-3d',
            transform: `scale(${motorScale}) rotateX(52deg) rotateZ(-12deg)`,
          }}
        >
          <Motor
            highlightShaft={isShaftHighlighted}
            shaftInsertionProgress={0}
            showWires={true}
            shaftVisible={true}
          />
        </div>
      </div>

      {/* 2D Overlay Callout 1: DC Motor Body */}
      <Callout
        x={780}
        y={600}
        title="DC Motor"
        subtitle="Cylindrical metal housing"
        direction="left"
        delay={25}
      />

      {/* 2D Overlay Callout 2: Motor Shaft */}
      {frame >= 70 && (
        <Callout
          x={960}
          y={440}
          title="Motor Shaft"
          subtitle="Central steel output shaft"
          direction="right"
          delay={70}
        />
      )}

      {/* Narration Subtitle */}
      <Subtitle text="First, we have the DC motor. The propeller will be fitted onto the shaft of the motor." />
    </div>
  );
};
