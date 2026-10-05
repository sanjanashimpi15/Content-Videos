import React from 'react';
import {Audio, staticFile} from 'remotion';

export const Scene10Recap: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#F8FAFC',
        fontFamily: 'Inter, system-ui, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Audio src={staticFile('audio/scene-10.mp3')} />

      {/* Decorative background grid */}
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
          background: '#FFFFFF',
          borderRadius: 28,
          padding: '44px 56px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.08)',
          border: '2px solid #E2E8F0',
          maxWidth: 820,
          textAlign: 'center',
          zIndex: 10
        }}
      >
        <div
          style={{
            fontSize: 16,
            fontWeight: 800,
            color: '#6366F1',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: 8
          }}
        >
          Experiment Summary
        </div>

        <h2
          style={{
            fontSize: 44,
            fontWeight: 900,
            color: '#0F172A',
            letterSpacing: '-0.02em',
            margin: '0 0 28px 0'
          }}
        >
          Experiment 01 Complete
        </h2>

        <div style={{display: 'flex', flexDirection: 'column', gap: 16, textAlign: 'left', marginBottom: 32}}>
          <div
            style={{
              background: '#F0FDF4',
              border: '1px solid #BBF7D0',
              borderRadius: 14,
              padding: '14px 20px',
              fontSize: 18,
              color: '#166534',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 12
            }}
          >
            <span>✓</span>
            <span>LED glows when P connects to P and N connects to N (Closed Circuit)</span>
          </div>

          <div
            style={{
              background: '#EEF2FF',
              border: '1px solid #C7D2FE',
              borderRadius: 14,
              padding: '14px 20px',
              fontSize: 18,
              color: '#3730A3',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 12
            }}
          >
            <span>✓</span>
            <span>LED is uni-directional: Reversing connections stops current flow</span>
          </div>

          <div
            style={{
              background: '#FEF3C7',
              border: '1px solid #FDE68A',
              borderRadius: 14,
              padding: '14px 20px',
              fontSize: 18,
              color: '#92400E',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 12
            }}
          >
            <span>⚡</span>
            <span>Important: Remove jump wire after experiment to save battery electricity!</span>
          </div>
        </div>
      </div>
    </div>
  );
};
