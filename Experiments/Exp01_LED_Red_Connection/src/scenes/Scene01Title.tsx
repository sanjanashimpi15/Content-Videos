import React from 'react';
import {Audio, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

export const Scene01Title: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const titleScale = spring({
    frame,
    fps,
    config: {damping: 14, stiffness: 120}
  });

  const subtitleOpacity = interpolate(frame, [25, 45], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#F8FAFC',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}
    >
      <Audio src={staticFile('audio/scene-01.mp3')} />

      {/* Decorative subtle background grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          opacity: 0.45
        }}
      />

      <div
        style={{
          transform: `scale(${titleScale})`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 10
        }}
      >
        <div
          style={{
            background: '#EEF2FF',
            color: '#3730A3',
            fontSize: 16,
            fontWeight: 800,
            letterSpacing: '0.15em',
            padding: '8px 24px',
            borderRadius: 30,
            marginBottom: 24,
            border: '1px solid #C7D2FE'
          }}
        >
          K2 EMICO CIRCUITO GUIDEBOOK
        </div>

        <div
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: '#6366F1',
            letterSpacing: '0.12em',
            marginBottom: 10,
            textTransform: 'uppercase'
          }}
        >
          Experiment 01
        </div>

        <h1
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: '#0F172A',
            letterSpacing: '-0.03em',
            margin: '0 0 24px 0',
            textAlign: 'center'
          }}
        >
          LED – Red Connection
        </h1>

        <div
          style={{
            opacity: subtitleOpacity,
            maxWidth: 780,
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: 16,
            padding: '16px 36px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
            display: 'flex',
            alignItems: 'center',
            gap: 16
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: '#EF4444',
              boxShadow: '0 0 12px #EF4444'
            }}
          />
          <div style={{fontSize: 22, color: '#334155', fontWeight: 600}}>
            <span style={{fontWeight: 800, color: '#0F172A'}}>Objective: </span>
            To glow a Red LED & understand how an LED works
          </div>
        </div>
      </div>
    </div>
  );
};
