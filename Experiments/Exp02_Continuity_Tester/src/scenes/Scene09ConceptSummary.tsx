import React from 'react';
import {Audio, staticFile} from 'remotion';
import {HeaderBanner} from '../components/Labels';

export const Scene09ConceptSummary: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#F8FAFC',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}
    >
      <Audio src={staticFile('audio/scene-09.mp3')} />

      <HeaderBanner
        expNumber="EXPERIMENT 02"
        title="Educational Summary: Open vs Closed Circuits"
        subtitle="Understanding electrical continuity and materials"
      />

      <div
        style={{
          position: 'absolute',
          top: 180,
          left: 100,
          right: 100,
          bottom: 80,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'stretch',
          gap: 60
        }}
      >
        {/* Open Circuit Card */}
        <div
          style={{
            flex: 1,
            background: '#FFFFFF',
            borderRadius: 24,
            padding: '36px 32px',
            boxShadow: '0 12px 32px rgba(0,0,0,0.06)',
            border: '2px solid #FCA5A5',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div
            style={{
              background: '#FEE2E2',
              color: '#B91C1C',
              fontWeight: 900,
              fontSize: 16,
              letterSpacing: '0.08em',
              padding: '6px 18px',
              borderRadius: 20,
              alignSelf: 'flex-start',
              marginBottom: 16
            }}
          >
            OPEN CIRCUIT
          </div>

          <div style={{fontSize: 26, fontWeight: 900, color: '#1E293B', marginBottom: 16}}>
            Incomplete Path (LED OFF)
          </div>

          <div style={{fontSize: 16, color: '#475569', lineHeight: 1.7, flex: 1}}>
            <p>• A break or gap exists anywhere in the conductive circuit.</p>
            <p>• Electricity <strong>cannot flow</strong> across insulators or open air.</p>
            <p>• Examples: Air gap, Paper, Plastic box.</p>
            <p>• <strong>Result:</strong> No electrical current reaches the LED.</p>
          </div>

          <div
            style={{
              background: '#FEF2F2',
              border: '1px solid #FCA5A5',
              borderRadius: 14,
              padding: '12px 18px',
              fontSize: 15,
              fontWeight: 800,
              color: '#B91C1C'
            }}
          >
            ✕ Broken Loop ➔ LED OFF
          </div>
        </div>

        {/* Closed Circuit Card */}
        <div
          style={{
            flex: 1,
            background: '#FFFFFF',
            borderRadius: 24,
            padding: '36px 32px',
            boxShadow: '0 12px 32px rgba(0,0,0,0.06)',
            border: '2px solid #86EFAC',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div
            style={{
              background: '#DCFCE7',
              color: '#15803D',
              fontWeight: 900,
              fontSize: 16,
              letterSpacing: '0.08em',
              padding: '6px 18px',
              borderRadius: 20,
              alignSelf: 'flex-start',
              marginBottom: 16
            }}
          >
            CLOSED CIRCUIT
          </div>

          <div style={{fontSize: 26, fontWeight: 900, color: '#1E293B', marginBottom: 16}}>
            Complete Path (LED ON)
          </div>

          <div style={{fontSize: 16, color: '#475569', lineHeight: 1.7, flex: 1}}>
            <p>• An unbroken conducting loop exists from positive to negative.</p>
            <p>• Electricity <strong>flows freely</strong> through conductive materials.</p>
            <p>• Examples: Touching wire ends, Steel ring / metals.</p>
            <p>• <strong>Result:</strong> Current flows and powers the red LED.</p>
          </div>

          <div
            style={{
              background: '#F0FDF4',
              border: '1px solid #86EFAC',
              borderRadius: 14,
              padding: '12px 18px',
              fontSize: 15,
              fontWeight: 800,
              color: '#15803D'
            }}
          >
            ✓ Complete Loop ➔ LED GLOWS
          </div>
        </div>
      </div>
    </div>
  );
};
