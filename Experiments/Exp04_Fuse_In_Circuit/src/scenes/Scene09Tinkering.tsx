import React from 'react';
import {Audio, staticFile} from 'remotion';
import {HeaderBanner} from '../components/Labels';

export const Scene09Tinkering: React.FC = () => {
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
      <Audio src={staticFile('audio/scene-09.mp3')} />

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
            color: '#0284C7',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: 8
          }}
        >
          Workbook Tinkering & Exploration
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
          Experiment 04 Complete
        </h2>

        <div style={{display: 'flex', flexDirection: 'column', gap: 18, textAlign: 'left'}}>
          <div
            style={{
              background: '#F0F9FF',
              border: '1.5px solid #BAE6FD',
              borderRadius: 16,
              padding: '16px 24px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 16
            }}
          >
            <div style={{fontSize: 24}}>✏️</div>
            <div>
              <div style={{fontSize: 18, fontWeight: 800, color: '#0369A1'}}>
                Tinkering Activity 1: Break the Pencil Lead
              </div>
              <div style={{fontSize: 15, color: '#334155', marginTop: 4, lineHeight: 1.5}}>
                Snapping the graphite lead breaks continuity, creating an open circuit that immediately extinguishes the LED.
              </div>
            </div>
          </div>

          <div
            style={{
              background: '#F0FDF4',
              border: '1.5px solid #BBF7D0',
              borderRadius: 16,
              padding: '16px 24px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 16
            }}
          >
            <div style={{fontSize: 24}}>🔌</div>
            <div>
              <div style={{fontSize: 18, fontWeight: 800, color: '#15803D'}}>
                Tinkering Activity 2: Substitute with 1-Strand Wire
              </div>
              <div style={{fontSize: 15, color: '#334155', marginTop: 4, lineHeight: 1.5}}>
                Replacing the broken lead with a single-strand copper wire restores conductivity, and the red LED illuminates once again!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
