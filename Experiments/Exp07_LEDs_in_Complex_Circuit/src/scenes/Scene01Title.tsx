import React from 'react';
import {Audio, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

export const Scene01Title: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const titleScale = spring({
    frame,
    fps,
    config: {damping: 12, stiffness: 100}
  });

  const subtitleOpacity = interpolate(frame, [15, 30], [0, 1], {extrapolateRight: 'clamp'});

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#F8FAFC',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}
    >
      <Audio src={staticFile('audio/scene-01.mp3')} />

      <div
        style={{
          background: '#FDF4FF',
          color: '#C026D3',
          fontSize: 16,
          fontWeight: 800,
          padding: '8px 24px',
          borderRadius: 999,
          letterSpacing: 2,
          marginBottom: 24,
          border: '1.5px solid #F0ABFC'
        }}
      >
        K2 CIRCUITO GUIDEBOOK
      </div>

      <div
        style={{
          transform: `scale(${titleScale})`,
          textAlign: 'center'
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: '#64748B',
            letterSpacing: 3,
            marginBottom: 8
          }}
        >
          EXPERIMENT 07
        </div>
        <div
          style={{
            fontSize: 68,
            fontWeight: 900,
            color: '#0F172A',
            letterSpacing: -1
          }}
        >
          LEDs in Complex Circuit
        </div>
      </div>

      <div
        style={{
          opacity: subtitleOpacity,
          marginTop: 24,
          fontSize: 22,
          color: '#475569',
          fontWeight: 600,
          background: '#FFFFFF',
          padding: '12px 36px',
          borderRadius: 999,
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          border: '1px solid #E2E8F0'
        }}
      >
        Studying Mixed Series and Parallel Connections
      </div>
    </div>
  );
};
