import React from 'react';
import {Audio, interpolate, staticFile, useCurrentFrame} from 'remotion';

export const Scene10WhyGreenOff: React.FC = () => {
  const frame = useCurrentFrame();

  const pulse = (Math.sin(frame / 6) + 1) / 2;

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
      <Audio src={staticFile('audio/scene-10.mp3')} />

      <div
        style={{
          background: '#FEF2F2',
          color: '#DC2626',
          fontSize: 14,
          fontWeight: 800,
          padding: '6px 18px',
          borderRadius: 999,
          letterSpacing: 1.5,
          marginBottom: 10
        }}
      >
        EXPLANATION
      </div>

      <div
        style={{
          fontSize: 38,
          fontWeight: 900,
          color: '#0F172A',
          marginBottom: 36
        }}
      >
        Why Doesn't the Green LED Glow?
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 40,
          width: '100%',
          maxWidth: 1300,
          alignItems: 'center'
        }}
      >
        {/* Visual Current Path Diagram */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 24,
            padding: 36,
            border: '2px solid #E2E8F0',
            boxShadow: '0 12px 36px rgba(15, 23, 42, 0.08)'
          }}
        >
          <div style={{fontSize: 16, fontWeight: 800, color: '#64748B', marginBottom: 24}}>
            CURRENT PATHWAY COMPARISON
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 20
            }}
          >
            {/* Direct Wire Path */}
            <div
              style={{
                background: '#ECFDF5',
                border: '2px solid #10B981',
                borderRadius: 16,
                padding: '20px 24px',
                boxShadow: `0 0 ${15 + pulse * 10}px rgba(16, 185, 129, 0.4)`
              }}
            >
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <span style={{fontWeight: 900, fontSize: 18, color: '#065F46'}}>
                  1. PARALLEL WIRE (SHORT CIRCUIT)
                </span>
                <span
                  style={{
                    background: '#10B981',
                    color: '#FFFFFF',
                    fontSize: 12,
                    fontWeight: 800,
                    padding: '4px 10px',
                    borderRadius: 999
                  }}
                >
                  FULL CURRENT FLOWS
                </span>
              </div>
              <div style={{fontSize: 15, color: '#047857', marginTop: 8, lineHeight: 1.5}}>
                The connecting wire has almost zero resistance. Electric current readily travels through this direct path.
              </div>
            </div>

            {/* Green LED Path */}
            <div
              style={{
                background: '#F8FAFC',
                border: '2px dashed #94A3B8',
                borderRadius: 16,
                padding: '20px 24px',
                opacity: 0.8
              }}
            >
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <span style={{fontWeight: 900, fontSize: 18, color: '#475569'}}>
                  2. LED – GREEN PATH
                </span>
                <span
                  style={{
                    background: '#64748B',
                    color: '#FFFFFF',
                    fontSize: 12,
                    fontWeight: 800,
                    padding: '4px 10px',
                    borderRadius: 999
                  }}
                >
                  NO CURRENT (BYPASSED)
                </span>
              </div>
              <div style={{fontSize: 15, color: '#64748B', marginTop: 8, lineHeight: 1.5}}>
                Because the current completely bypasses the Green LED through the wire, the Green LED receives no current and stays completely OFF.
              </div>
            </div>
          </div>
        </div>

        {/* Workbook Teaching Takeaway Card */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 24,
            padding: 36,
            border: '2px solid #E2E8F0',
            boxShadow: '0 12px 36px rgba(15, 23, 42, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: 20
          }}
        >
          <div style={{fontSize: 16, fontWeight: 800, color: '#C026D3', letterSpacing: 1}}>
            WORKBOOK TAKEAWAY
          </div>

          <div style={{fontSize: 24, fontWeight: 900, color: '#0F172A', lineHeight: 1.3}}>
            Why Red LED Still Glows Brightly
          </div>

          <div style={{fontSize: 17, color: '#475569', lineHeight: 1.6}}>
            All the circuit current flows through <strong>LED – Red</strong>, then bypasses <strong>LED – Green</strong> through the direct wire connection back to the battery.
          </div>

          <div
            style={{
              background: '#FEF3C7',
              border: '1.5px solid #F59E0B',
              borderRadius: 14,
              padding: '16px 20px',
              fontSize: 16,
              color: '#92400E',
              lineHeight: 1.5,
              fontWeight: 600
            }}
          >
            Since the parallel wire effectively shorts out the Green LED, LED – Red receives the full 3V supply voltage and glows with full brightness!
          </div>
        </div>
      </div>
    </div>
  );
};
