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
        fontFamily: 'Inter, system-ui, sans-serif',
        padding: '0 80px'
      }}
    >
      <Audio src={staticFile('audio/scene-11.mp3')} />

      <div
        style={{
          fontSize: 16,
          fontWeight: 800,
          color: '#059669',
          letterSpacing: 2,
          marginBottom: 12
        }}
      >
        TINKERING & SUMMARY
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
            "1. Connect the circuit as shown in the diagram with 4 jump wires.",
            "2. Disconnect P of LED – Green and observe the Red LED glowing with full brightness.",
            "3. Reverse LED – Green (P to N, N to P). Because an LED is uni-directional, only the Green LED turns off while the Red LED remains unaffected!"
          ]}
          style={{flex: 1}}
        />

        <InfoCard
          badge="SUMMARY RECAP"
          title="Experiment 06 Summary"
          points={[
            "Parallel Circuit: Multiple independent paths connected across the same two points.",
            "Voltage Rule: Full 3V battery voltage is delivered to each parallel component.",
            "Independence: Removing or disconnecting one component leaves the other operating normally."
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
          EXPERIMENT 06 — LEDs IN PARALLEL: FULL VOLTAGE ACROSS BOTH BRANCHES
        </span>
      </div>
    </div>
  );
};
