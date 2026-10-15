import React from 'react';
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Callout, StepBadge, Subtitle } from '../components/Labels';
import { Motor } from '../components/Motor';
import { Propeller } from '../components/Propeller';

export const Scene03Alignment: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const motorX = 960;
  const motorY = 560;

  // Motor entrance
  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const currentMotorY = interpolate(entrance, [0, 1], [620, motorY]);

  // Propeller moves along Z axis toward alignment position: Z = 380 down to 210
  const propZ = interpolate(frame, [15, 75], [380, 210], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Rotation eases into 0 degrees
  const currentRotation = interpolate(frame, [15, 75], [26, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.quad),
  });

  const isAligned = frame >= 75;

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
      <StepBadge step="Step 3" title="Align Propeller with Motor Shaft" />

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
            left: motorX,
            top: currentMotorY,
            transformStyle: 'preserve-3d',
            transform: 'scale(1.2) rotateX(54deg) rotateZ(-12deg)',
          }}
        >
          {/* DC Motor at base (Z = 0) with shaft */}
          <Motor
            highlightShaft={isAligned}
            shaftInsertionProgress={0}
            showWires={true}
            shaftVisible={true}
          />

          {/* Blue Propeller hovering above shaft tip along Z axis */}
          <Propeller
            z={propZ}
            rotation={currentRotation}
            showOpening={true}
            highlightHub={isAligned}
          />
        </div>
      </div>

      {/* Alignment Status Card */}
      {isAligned && (
        <div
          style={{
            position: 'absolute',
            left: motorX + 140,
            top: 360,
            backgroundColor: '#0F172A',
            color: '#38BDF8',
            fontSize: 14,
            fontWeight: 800,
            letterSpacing: 1.2,
            textTransform: 'uppercase',
            padding: '8px 18px',
            borderRadius: 10,
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)',
            border: '1.5px solid #0284C7',
            zIndex: 60,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: '#10B981',
              boxShadow: '0 0 8px #10B981',
            }}
          />
          CENTER HUB ALIGNED WITH SHAFT
        </div>
      )}

      {/* Callout 1: Propeller Hub */}
      <Callout
        x={960}
        y={360}
        title="Center Hub"
        subtitle="Opening aligned directly over shaft"
        direction="left"
        delay={45}
      />

      {/* Callout 2: Motor Shaft */}
      <Callout
        x={960}
        y={460}
        title="Motor Shaft"
        subtitle="Receives propeller center hub"
        direction="right"
        delay={45}
      />

      {/* Narration Subtitle */}
      <Subtitle text="Align the center of the propeller with the shaft of the DC motor." />
    </div>
  );
};
