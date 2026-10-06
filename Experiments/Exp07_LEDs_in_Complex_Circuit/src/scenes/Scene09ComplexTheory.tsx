import React from 'react';
import {Audio, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

export const Scene09ComplexTheory: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const branchAnim = spring({
    frame: Math.max(0, frame - 40),
    fps,
    config: {damping: 12, stiffness: 90}
  });

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
      <Audio src={staticFile('audio/scene-09.mp3')} />

      <div
        style={{
          background: '#FDF4FF',
          color: '#C026D3',
          fontSize: 14,
          fontWeight: 800,
          padding: '6px 18px',
          borderRadius: 999,
          letterSpacing: 1.5,
          marginBottom: 10
        }}
      >
        CIRCUIT ANALYSIS
      </div>

      <div
        style={{
          fontSize: 38,
          fontWeight: 900,
          color: '#0F172A',
          marginBottom: 36
        }}
      >
        What Makes This a Complex Circuit?
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: 48,
          width: '100%',
          maxWidth: 1500,
          alignItems: 'center'
        }}
      >
        {/* Left Side: Visual Branching Architecture Diagram */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 24,
            padding: 36,
            boxShadow: '0 12px 36px rgba(15, 23, 42, 0.08)',
            border: '2px solid #E2E8F0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <div style={{fontSize: 16, fontWeight: 800, color: '#64748B', letterSpacing: 1, marginBottom: 20}}>
            CIRCUIT TOPOLOGY DIAGRAM
          </div>

          {/* Battery Top */}
          <div
            style={{
              background: '#EFF6FF',
              border: '2px solid #3B82F6',
              borderRadius: 12,
              padding: '10px 24px',
              fontSize: 18,
              fontWeight: 800,
              color: '#1D4ED8'
            }}
          >
            3V Battery (+)
          </div>

          {/* Arrow down */}
          <div style={{fontSize: 24, color: '#94A3B8', margin: '4px 0'}}>↓</div>

          {/* Red LED */}
          <div
            style={{
              background: '#FEF2F2',
              border: '2px solid #EF4444',
              borderRadius: 12,
              padding: '12px 28px',
              fontSize: 20,
              fontWeight: 900,
              color: '#DC2626',
              boxShadow: '0 0 16px rgba(239, 68, 68, 0.25)'
            }}
          >
            LED – Red (In Series)
          </div>

          {/* Arrow down to branch node */}
          <div style={{fontSize: 20, color: '#94A3B8', margin: '4px 0'}}>↓ [Branch Node]</div>

          {/* Branch Fork */}
          <div
            style={{
              display: 'flex',
              gap: 40,
              marginTop: 6,
              transform: `scale(${branchAnim})`
            }}
          >
            {/* Green LED Path */}
            <div
              style={{
                background: '#F1F5F9',
                border: '2px dashed #94A3B8',
                borderRadius: 12,
                padding: '16px 20px',
                textAlign: 'center',
                width: 200
              }}
            >
              <div style={{fontSize: 13, fontWeight: 700, color: '#64748B'}}>PATH A</div>
              <div style={{fontSize: 17, fontWeight: 800, color: '#475569', marginTop: 4}}>
                LED – Green
              </div>
              <div style={{fontSize: 12, color: '#DC2626', fontWeight: 700, marginTop: 4}}>
                High Resistance (OFF)
              </div>
            </div>

            {/* Wire Bypass Path */}
            <div
              style={{
                background: '#ECFDF5',
                border: '2px solid #10B981',
                borderRadius: 12,
                padding: '16px 20px',
                textAlign: 'center',
                width: 200,
                boxShadow: '0 0 16px rgba(16, 185, 129, 0.2)'
              }}
            >
              <div style={{fontSize: 13, fontWeight: 700, color: '#059669'}}>PATH B (PARALLEL)</div>
              <div style={{fontSize: 17, fontWeight: 800, color: '#065F46', marginTop: 4}}>
                Direct Wire Bypass
              </div>
              <div style={{fontSize: 12, color: '#059669', fontWeight: 700, marginTop: 4}}>
                Current flows here!
              </div>
            </div>
          </div>

          {/* Arrow down to return node */}
          <div style={{fontSize: 20, color: '#94A3B8', margin: '8px 0'}}>↘ ↙ [Merge Node]</div>

          {/* Battery Negative */}
          <div
            style={{
              background: '#F1F5F9',
              border: '2px solid #64748B',
              borderRadius: 12,
              padding: '10px 24px',
              fontSize: 18,
              fontWeight: 800,
              color: '#334155'
            }}
          >
            3V Battery (–) Return
          </div>
        </div>

        {/* Right Side: Key Workbook Principles */}
        <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 20,
              padding: 24,
              border: '2px solid #E2E8F0',
              boxShadow: '0 8px 24px rgba(0,0,0,0.04)'
            }}
          >
            <div style={{fontSize: 14, fontWeight: 800, color: '#C026D3', letterSpacing: 1}}>
              WORKBOOK DEFINITION
            </div>
            <div style={{fontSize: 22, fontWeight: 900, color: '#0F172A', marginTop: 6}}>
              Mixed Series & Parallel
            </div>
            <div style={{fontSize: 16, color: '#475569', marginTop: 8, lineHeight: 1.6}}>
              A <strong>Complex circuit</strong> combines both Series and Parallel connections in a single network.
            </div>
          </div>

          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 20,
              padding: 24,
              border: '2px solid #E2E8F0',
              boxShadow: '0 8px 24px rgba(0,0,0,0.04)'
            }}
          >
            <div style={{fontSize: 14, fontWeight: 800, color: '#2563EB', letterSpacing: 1}}>
              PARALLEL WITH A WIRE
            </div>
            <div style={{fontSize: 22, fontWeight: 900, color: '#0F172A', marginTop: 6}}>
              LED – Green Branch
            </div>
            <div style={{fontSize: 16, color: '#475569', marginTop: 8, lineHeight: 1.6}}>
              LED – Green is connected in <strong>parallel with a jumper wire</strong>. Together, these two are connected in <strong>series with LED – Red</strong>.
            </div>
          </div>

          <div
            style={{
              background: '#FAF5FF',
              borderRadius: 20,
              padding: 24,
              border: '2px solid #C026D3',
              boxShadow: '0 8px 24px rgba(192, 38, 211, 0.08)'
            }}
          >
            <div style={{fontSize: 14, fontWeight: 800, color: '#7E22CE', letterSpacing: 1}}>
              IMPORTANT CONCLUSION
            </div>
            <div style={{fontSize: 20, fontWeight: 900, color: '#581C87', marginTop: 6}}>
              Neither Pure Series Nor Pure Parallel
            </div>
            <div style={{fontSize: 16, color: '#6B21A8', marginTop: 8, lineHeight: 1.6}}>
              The two LEDs are <strong>NEITHER simply in Series NOR simply in Parallel</strong> with each other!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
