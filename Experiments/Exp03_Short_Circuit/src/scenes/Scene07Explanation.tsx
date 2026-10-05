import React from 'react';
import {Audio, staticFile} from 'remotion';
import {HeaderBanner} from '../components/Labels';

export const Scene07Explanation: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#F8FAFC',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}
    >
      <Audio src={staticFile('audio/scene-07.mp3')} />

      <HeaderBanner
        expNumber="EXPERIMENT 03"
        title="Physics of a Short Circuit"
        subtitle="Source Information: K2 Emico Circito Guidebook"
      />

      <div
        style={{
          position: 'absolute',
          top: 180,
          left: 80,
          right: 80,
          bottom: 80,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'stretch',
          gap: 40
        }}
      >
        {/* Card 1: Direct Passage */}
        <div
          style={{
            flex: 1,
            background: '#FFFFFF',
            borderRadius: 24,
            padding: '32px 28px',
            boxShadow: '0 12px 32px rgba(0,0,0,0.06)',
            border: '2px solid #E2E8F0',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div style={{fontSize: 14, fontWeight: 800, color: '#3B82F6', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8}}>
            Circuit Behavior
          </div>
          <div style={{fontSize: 24, fontWeight: 900, color: '#1E293B', marginBottom: 16}}>
            Direct Passage
          </div>
          <div style={{fontSize: 16, color: '#475569', lineHeight: 1.6, flex: 1}}>
            <p>• In a short circuit, there is a direct passage between the positive and negative poles.</p>
            <p>• All electrical current rushes through this direct path because there is <strong>no resistance or obstruction</strong>.</p>
            <p>• The load (LED) is starved of current and turns off.</p>
          </div>
          <div style={{background: '#EFF6FF', padding: '12px 16px', borderRadius: 12, fontSize: 14, fontWeight: 700, color: '#1D4ED8'}}>
            ⚡ Path of Lowest Resistance
          </div>
        </div>

        {/* Card 2: Heat Hazard */}
        <div
          style={{
            flex: 1,
            background: '#FFFFFF',
            borderRadius: 24,
            padding: '32px 28px',
            boxShadow: '0 12px 32px rgba(0,0,0,0.06)',
            border: '2px solid #FCA5A5',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div style={{fontSize: 14, fontWeight: 800, color: '#EF4444', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8}}>
            Electrical Hazard
          </div>
          <div style={{fontSize: 24, fontWeight: 900, color: '#1E293B', marginBottom: 16}}>
            Extreme Heat
          </div>
          <div style={{fontSize: 16, color: '#475569', lineHeight: 1.6, flex: 1}}>
            <p>• When massive current flows without resistance, intense heat is rapidly generated.</p>
            <p>• In household wiring (220V/110V), short circuits cause spark hazards and <strong>fires</strong>.</p>
            <p>• This is why circuit breakers and fuses are mandatory in electrical design.</p>
          </div>
          <div style={{background: '#FEF2F2', padding: '12px 16px', borderRadius: 12, fontSize: 14, fontWeight: 700, color: '#B91C1C'}}>
            🔥 Rapid Heat Generation
          </div>
        </div>

        {/* Card 3: Kit Safety */}
        <div
          style={{
            flex: 1,
            background: '#FFFFFF',
            borderRadius: 24,
            padding: '32px 28px',
            boxShadow: '0 12px 32px rgba(0,0,0,0.06)',
            border: '2px solid #FDE68A',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div style={{fontSize: 14, fontWeight: 800, color: '#D97706', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8}}>
            Safety in Kit
          </div>
          <div style={{fontSize: 24, fontWeight: 900, color: '#1E293B', marginBottom: 16}}>
            Low Voltage Safety
          </div>
          <div style={{fontSize: 16, color: '#475569', lineHeight: 1.6, flex: 1}}>
            <p>• No fire is generated in this kit because we use a <strong>3V power source</strong> with safe low current.</p>
            <p>• However, the 3V battery will heat up and chemical leakage will occur if kept shorted.</p>
            <p>• Always disconnect promptly!</p>
          </div>
          <div style={{background: '#FFFBEB', padding: '12px 16px', borderRadius: 12, fontSize: 14, fontWeight: 700, color: '#B45309'}}>
            ⚠ Chemical Leak Risk If Kept Shorted
          </div>
        </div>
      </div>
    </div>
  );
};
