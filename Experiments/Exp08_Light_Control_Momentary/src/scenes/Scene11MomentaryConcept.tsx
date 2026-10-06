import React from 'react';
import {Audio, staticFile, useCurrentFrame} from 'remotion';

export const Scene11MomentaryConcept: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#F8FAFC',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '50px 80px',
        fontFamily: 'Inter, system-ui, sans-serif',
        boxSizing: 'border-box'
      }}
    >
      <Audio src={staticFile('audio/scene-11.mp3')} />

      <div
        style={{
          background: '#EEF2FF',
          color: '#4F46E5',
          fontSize: 14,
          fontWeight: 800,
          padding: '6px 18px',
          borderRadius: 999,
          letterSpacing: 1.5,
          marginBottom: 10
        }}
      >
        CORE CONCEPT
      </div>

      <div
        style={{
          fontSize: 38,
          fontWeight: 900,
          color: '#0F172A',
          marginBottom: 36
        }}
      >
        What Is Momentary Control?
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 40,
          width: '100%',
          maxWidth: 1300,
          alignItems: 'stretch'
        }}
      >
        {/* Card 1: Pressed State */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 24,
            padding: 36,
            border: '2px solid #3B82F6',
            boxShadow: '0 12px 36px rgba(59, 130, 246, 0.08)',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div
            style={{
              background: '#EFF6FF',
              color: '#2563EB',
              fontSize: 13,
              fontWeight: 800,
              padding: '4px 12px',
              borderRadius: 999,
              width: 'fit-content',
              marginBottom: 14
            }}
          >
            ACTIVE STATE
          </div>

          <div style={{fontSize: 26, fontWeight: 900, color: '#0F172A', marginBottom: 12}}>
            While Switch Is Pressed
          </div>

          <div style={{fontSize: 16, color: '#475569', lineHeight: 1.6, marginBottom: 24}}>
            Physical pressure forces internal contacts together. Current completes the loop from Battery through Tact Switch into Red LED.
          </div>

          <div
            style={{
              marginTop: 'auto',
              background: '#FEF2F2',
              border: '1.5px solid #EF4444',
              borderRadius: 14,
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: 12
            }}
          >
            <div style={{width: 12, height: 12, borderRadius: '50%', background: '#EF4444'}} />
            <span style={{fontWeight: 800, fontSize: 16, color: '#991B1B'}}>
              LED Output: GLOWS ON
            </span>
          </div>
        </div>

        {/* Card 2: Released State */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 24,
            padding: 36,
            border: '2px solid #CBD5E1',
            boxShadow: '0 12px 36px rgba(15, 23, 42, 0.05)',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div
            style={{
              background: '#F1F5F9',
              color: '#64748B',
              fontSize: 13,
              fontWeight: 800,
              padding: '4px 12px',
              borderRadius: 999,
              width: 'fit-content',
              marginBottom: 14
            }}
          >
            RESTING STATE
          </div>

          <div style={{fontSize: 26, fontWeight: 900, color: '#0F172A', marginBottom: 12}}>
            The Moment It Is Released
          </div>

          <div style={{fontSize: 16, color: '#475569', lineHeight: 1.6, marginBottom: 24}}>
            An internal spring instantly separates the contacts. The circuit breaks open and current drops to zero immediately.
          </div>

          <div
            style={{
              marginTop: 'auto',
              background: '#F8FAFC',
              border: '1.5px solid #94A3B8',
              borderRadius: 14,
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: 12
            }}
          >
            <div style={{width: 12, height: 12, borderRadius: '50%', background: '#94A3B8'}} />
            <span style={{fontWeight: 800, fontSize: 16, color: '#475569'}}>
              LED Output: TURNS OFF
            </span>
          </div>
        </div>
      </div>

      {/* Summary Footer */}
      <div
        style={{
          marginTop: 40,
          background: '#0F172A',
          color: '#FFFFFF',
          padding: '16px 40px',
          borderRadius: 999,
          fontSize: 18,
          fontWeight: 800,
          boxShadow: '0 10px 25px rgba(15, 23, 42, 0.2)'
        }}
      >
        Momentary Control = Output active ONLY while input is held
      </div>
    </div>
  );
};
