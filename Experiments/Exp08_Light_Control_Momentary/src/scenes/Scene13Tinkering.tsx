import React from 'react';
import {Audio, staticFile} from 'remotion';
import {InfoCard} from '../components/Labels';

export const Scene13Tinkering: React.FC = () => {
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
      <Audio src={staticFile('audio/scene-13.mp3')} />

      <div
        style={{
          background: '#EEF2FF',
          color: '#4F46E5',
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
        Tinkering Activities & Final Conclusion
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
        {/* Left: Workbook Tinkering Tasks */}
        <InfoCard
          badge="WORKBOOK TINKERING"
          title="Tinkering Activities"
          points={[
            "1. Connect circuit as shown in the workbook guide.",
            "2. Reverse the Tact switch (swap terminals A and B) and observe the switch still works seamlessly.",
            "3. Create a circuit to glow two LEDs together when the switch is pressed."
          ]}
          style={{flex: 1}}
        />

        {/* Right: Clean Summary Card */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 24,
            padding: 32,
            border: '2px solid #4F46E5',
            boxShadow: '0 12px 36px rgba(79, 70, 229, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <div style={{fontSize: 14, fontWeight: 800, color: '#4F46E5', letterSpacing: 1}}>
            EXPERIMENT 08 SUMMARY
          </div>
          <div style={{fontSize: 26, fontWeight: 900, color: '#0F172A', marginTop: 8}}>
            Momentary Control
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
              <div style={{width: 10, height: 10, borderRadius: '50%', background: '#4F46E5'}} />
              Tact switch operates as a push-to-make momentary contact
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
              <div style={{width: 10, height: 10, borderRadius: '50%', background: '#10B981'}} />
              Press = Circuit CLOSED → LED ON
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
              Release = Circuit OPEN → LED OFF
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
