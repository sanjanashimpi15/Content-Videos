import React from 'react';
import {Audio, staticFile} from 'remotion';
import {HeaderBanner} from '../components/Labels';

export const Scene08FuseConcept: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#F8FAFC',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}
    >
      <Audio src={staticFile('audio/scene-08.mp3')} />

      <HeaderBanner
        expNumber="EXPERIMENT 04"
        title="Educational Concept: Working of a Real Fuse"
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
        {/* Card 1: Protection Role */}
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
          <div style={{fontSize: 14, fontWeight: 800, color: '#0284C7', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8}}>
            Protective Device
          </div>
          <div style={{fontSize: 24, fontWeight: 900, color: '#1E293B', marginBottom: 16}}>
            Safety Fuse
          </div>
          <div style={{fontSize: 16, color: '#475569', lineHeight: 1.6, flex: 1}}>
            <p>• Connected <strong>in the initial path</strong> of a circuit before valuable output devices.</p>
            <p>• Protects sensitive electrical components and home appliances from damage or fire.</p>
            <p>• Acts as a deliberate weak link designed to fail safely.</p>
          </div>
          <div style={{background: '#F0F9FF', padding: '12px 16px', borderRadius: 12, fontSize: 14, fontWeight: 700, color: '#0369A1'}}>
            🛡 Connected in Initial Path
          </div>
        </div>

        {/* Card 2: Surge / Fluctuation */}
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
            Fluctuation Event
          </div>
          <div style={{fontSize: 24, fontWeight: 900, color: '#1E293B', marginBottom: 16}}>
            Current Surges
          </div>
          <div style={{fontSize: 16, color: '#475569', lineHeight: 1.6, flex: 1}}>
            <p>• Due to power fluctuations or faults, supplied voltage and current can suddenly rise.</p>
            <p>• Higher current forces excess power into appliances, causing overheating and burn-out.</p>
            <p>• The fuse detects this overload instantaneously.</p>
          </div>
          <div style={{background: '#FEF2F2', padding: '12px 16px', borderRadius: 12, fontSize: 14, fontWeight: 700, color: '#B91C1C'}}>
            ⚡ Excess Current Surge
          </div>
        </div>

        {/* Card 3: Melting Filament */}
        <div
          style={{
            flex: 1,
            background: '#FFFFFF',
            borderRadius: 24,
            padding: '32px 28px',
            boxShadow: '0 12px 32px rgba(0,0,0,0.06)',
            border: '2px solid #86EFAC',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div style={{fontSize: 14, fontWeight: 800, color: '#15803D', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8}}>
            Operating Principle
          </div>
          <div style={{fontSize: 24, fontWeight: 900, color: '#1E293B', marginBottom: 16}}>
            Melting Filament
          </div>
          <div style={{fontSize: 16, color: '#475569', lineHeight: 1.6, flex: 1}}>
            <p>• Inside a fuse is a thin filament made of zinc, copper, silver, aluminum, or alloys.</p>
            <p>• When current increases, the filament <strong>melts from the heat</strong>.</p>
            <p>• Melting breaks the connection, creating an open circuit and halting electricity.</p>
          </div>
          <div style={{background: '#F0FDF4', padding: '12px 16px', borderRadius: 12, fontSize: 14, fontWeight: 700, color: '#15803D'}}>
            ✓ Melts ➔ Creates Open Circuit
          </div>
        </div>
      </div>
    </div>
  );
};
