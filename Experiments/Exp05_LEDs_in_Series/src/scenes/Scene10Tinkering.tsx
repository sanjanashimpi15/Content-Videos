import React from 'react';
import {Audio, staticFile} from 'remotion';
import {InfoCard} from '../components/Labels';

export const Scene10Tinkering: React.FC = () => {
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
        fontFamily: 'Inter, system-ui, sans-serif',
        padding: '0 80px'
      }}
    >
      <Audio src={staticFile('audio/scene-10.mp3')} />

      <div
        style={{
          fontSize: 16,
          fontWeight: 800,
          color: '#4F46E5',
          letterSpacing: 2,
          marginBottom: 12
        }}
      >
        TINKERING & EXPLORATION
      </div>

      <div
        style={{
          fontSize: 48,
          fontWeight: 900,
          color: '#0F172A',
          marginBottom: 44,
          textAlign: 'center'
        }}
      >
        Workbook Tinkering Activities
      </div>

      <div style={{display: 'flex', gap: 36, width: '100%', maxWidth: 1150}}>
        <InfoCard
          badge="WORKBOOK TINKERING"
          title="Try in Your Kit"
          points={[
            "1. Connect the circuit as shown in the diagram.",
            "2. Interchange the positions of both LEDs (Green first, then Red). Observe that neither glows.",
            "3. Replace the 3V Battery with a 5V USB power source from the kit — now the higher voltage can glow both LEDs!"
          ]}
          style={{flex: 1}}
        />

        <InfoCard
          badge="SUMMARY RECAP"
          title="Experiment 05 Summary"
          points={[
            "Series Circuit: Components connected end-to-end in a single electrical loop.",
            "Voltage Rule: Total voltage divides across all series components.",
            "Single 3V Battery: ~1.5V per LED is insufficient to activate either LED."
          ]}
          style={{flex: 1}}
        />
      </div>

      {/* Clean Final State Bar */}
      <div
        style={{
          marginTop: 40,
          background: '#0F172A',
          color: '#F8FAFC',
          padding: '14px 44px',
          borderRadius: 999,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          boxShadow: '0 10px 30px rgba(15, 23, 42, 0.2)'
        }}
      >
        <span style={{color: '#10B981', fontSize: 20, fontWeight: 900}}>✓</span>
        <span style={{fontSize: 18, fontWeight: 800, letterSpacing: 1}}>
          EXPERIMENT 05 — LEDs IN SERIES: VOLTAGE DIVIDES IN SERIES CIRCUITS
        </span>
      </div>
    </div>
  );
};
