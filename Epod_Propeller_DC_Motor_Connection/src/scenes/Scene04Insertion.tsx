import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { Callout, StepBadge, Subtitle } from '../components/Labels';
import { PropellerInsertion } from '../components/PropellerInsertion';

export const Scene04Insertion: React.FC = () => {
  const frame = useCurrentFrame();

  // Camera zoom during insertion: starts at 1.05, zooms in to 1.25 during the critical slide, then settles to 1.18
  const cameraZoom = interpolate(
    frame,
    [0, 50, 150, 230],
    [1.05, 1.25, 1.25, 1.15],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

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
      <StepBadge step="Step 4" title="Insert Propeller onto Motor Shaft" />

      {/* Mechanical Status Overlay Badge */}
      <div
        style={{
          position: 'absolute',
          top: 48,
          right: 64,
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          padding: '12px 20px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.08)',
          border: '1.5px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          zIndex: 40,
        }}
      >
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            backgroundColor: frame >= 160 ? '#10B981' : '#0284C7',
            boxShadow: `0 0 10px ${frame >= 160 ? '#10B981' : '#0284C7'}`,
          }}
        />
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B' }}>
            ACTION
          </div>
          <div style={{ fontSize: 15, fontWeight: 800, color: '#0F172A' }}>
            {frame < 60
              ? 'Approaching Shaft Tip'
              : frame < 160
              ? 'Sliding Hub onto Shaft'
              : 'Securely Mounted'}
          </div>
        </div>
      </div>

      {/* Camera-controlled container for dynamic zoom */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          transform: `scale(${cameraZoom})`,
          transformOrigin: '960px 520px',
        }}
      >
        {/* Reusable HERO Mechanical Insertion Component */}
        <PropellerInsertion
          startFrame={5}
          durationInFrames={220}
          motorX={960}
          motorY={580}
          scale={1.2}
          startRotation={15}
          endRotation={0}
          showGuides={true}
        />
      </div>

      {/* Dynamic Callout during the sliding motion */}
      {frame >= 70 && frame < 155 && (
        <Callout
          x={960}
          y={440}
          title="Sliding Down Shaft"
          subtitle="Shaft enters propeller center bore"
          direction="right"
          delay={70}
        />
      )}

      {/* Completion Callout after settling */}
      {frame >= 165 && (
        <Callout
          x={960}
          y={580}
          title="Fitted onto Shaft"
          subtitle="Propeller hub firmly seated against collar"
          direction="right"
          delay={165}
        />
      )}

      {/* Narration Subtitle */}
      <Subtitle text="Carefully slide the center hub of the propeller onto the motor shaft until it is firmly in place." />
    </div>
  );
};
