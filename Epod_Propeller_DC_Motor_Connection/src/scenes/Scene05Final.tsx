import React from 'react';
import { Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { Callout, StepBadge, Subtitle } from '../components/Labels';
import { Motor } from '../components/Motor';
import { Propeller } from '../components/Propeller';

export const Scene05Final: React.FC = () => {
  const frame = useCurrentFrame();

  // Camera pulls back slightly for final assembled view
  const cameraZoom = interpolate(frame, [0, 45], [1.25, 1.12], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

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
      <StepBadge step="Step 5" title="Completed Motor & Propeller Assembly" />

      {/* Real Kit Photo Reference Card */}
      <div
        style={{
          position: 'absolute',
          top: 48,
          right: 64,
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          padding: '14px 20px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.08)',
          border: '1.5px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          zIndex: 40,
        }}
      >
        <Img
          src={staticFile('assets/final-motor-propeller.png')}
          style={{
            width: 70,
            height: 110,
            objectFit: 'contain',
          }}
        />
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#64748B' }}>
            KIT REFERENCE
          </div>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#0F172A' }}>
            Final Connection
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#10B981', marginTop: 2 }}>
            Propeller on Shaft
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
            top: 560,
            transformStyle: 'preserve-3d',
            transform: `scale(${cameraZoom}) rotateX(54deg) rotateZ(-12deg)`,
          }}
        >
          {/* DC Motor at base (Z = 0) with shaft fully inside hub */}
          <Motor
            shaftInsertionProgress={1}
            showWires={true}
            shaftVisible={true}
          />

          {/* Blue Propeller fully seated against collar at Z = 12 */}
          <Propeller
            z={12}
            rotation={0}
            showOpening={false}
            highlightHub={false}
          />
        </div>
      </div>

      {/* Connection Verified Success Badge */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 160,
          transform: 'translateX(-50%)',
          backgroundColor: '#ECFDF5',
          border: '2px solid #10B981',
          color: '#065F46',
          borderRadius: 30,
          padding: '10px 28px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.25)',
          zIndex: 50,
        }}
      >
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: '50%',
            backgroundColor: '#10B981',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 15,
            fontWeight: 800,
          }}
        >
          ✓
        </div>
        <span
          style={{
            fontSize: 16,
            fontWeight: 800,
            letterSpacing: 0.8,
            textTransform: 'uppercase',
          }}
        >
          Propeller Securely Fitted to Motor Shaft
        </span>
      </div>

      {/* Callout 1: Mounted Propeller */}
      <Callout
        x={780}
        y={460}
        title="Blue Propeller"
        subtitle="Mounted firmly on shaft"
        direction="left"
        delay={10}
      />

      {/* Callout 2: Motor Base */}
      <Callout
        x={1120}
        y={600}
        title="DC Motor"
        subtitle="Shaft fully engaged inside hub"
        direction="right"
        delay={20}
      />

      {/* Narration Subtitle */}
      <Subtitle text="The propeller is now fitted onto the DC motor shaft." />
    </div>
  );
};
