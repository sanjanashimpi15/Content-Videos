import React from 'react';
import {Audio, staticFile} from 'remotion';
import {InfoCard} from '../components/Labels';

export const Scene11Tinkering: React.FC = () => {
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
        padding: '40px 60px',
        fontFamily: 'Inter, system-ui, sans-serif',
        boxSizing: 'border-box'
      }}
    >
      <Audio src={staticFile('audio/scene-11.mp3')} />

      <div
        style={{
          background: '#FDF4FF',
          color: '#C026D3',
          fontSize: 14,
          fontWeight: 800,
          padding: '6px 18px',
          borderRadius: 999,
          letterSpacing: 1.5,
          marginBottom: 8
        }}
      >
        WORKBOOK TINKERING & SUMMARY
      </div>

      <div
        style={{
          fontSize: 38,
          fontWeight: 900,
          color: '#0F172A',
          marginBottom: 36
        }}
      >
        Tinkering Activities & Key Conclusions
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: 36,
          maxWidth: 1300,
          width: '100%'
        }}
      >
        {/* Left: Workbook Tinkering Steps */}
        <InfoCard
          badge="WORKBOOK TINKERING"
          title="Tinkering Activities"
          points={[
            "1. Connect circuit as shown in the diagram.",
            "2. Reverse LED – Red by swapping its P and N connections."
          ]}
          style={{flex: 1}}
        />

        {/* Right: Final Clean Summary Card */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 24,
            padding: 32,
            border: '2px solid #C026D3',
            boxShadow: '0 12px 36px rgba(192, 38, 211, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <div style={{fontSize: 14, fontWeight: 800, color: '#C026D3', letterSpacing: 1}}>
            EXPERIMENT 07 SUMMARY
          </div>
          <div style={{fontSize: 26, fontWeight: 900, color: '#0F172A', marginTop: 8}}>
            Complex Circuit
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              marginTop: 24
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                fontSize: 16,
                fontWeight: 700,
                color: '#334155'
              }}
            >
              <div style={{width: 10, height: 10, borderRadius: '50%', background: '#C026D3'}} />
              Mixed Series + Parallel
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                fontSize: 16,
                fontWeight: 700,
                color: '#334155'
              }}
            >
              <div style={{width: 10, height: 10, borderRadius: '50%', background: '#EF4444'}} />
              Red LED ON (glows bright)
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                fontSize: 16,
                fontWeight: 700,
                color: '#334155'
              }}
            >
              <div style={{width: 10, height: 10, borderRadius: '50%', background: '#64748B'}} />
              Green LED OFF (short-circuit path bypasses current)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
