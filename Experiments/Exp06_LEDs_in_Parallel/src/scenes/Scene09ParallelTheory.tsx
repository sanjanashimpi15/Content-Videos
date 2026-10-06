import React from 'react';
import {Audio, staticFile} from 'remotion';
import {InfoCard} from '../components/Labels';

export const Scene09ParallelTheory: React.FC = () => {
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
      <Audio src={staticFile('audio/scene-09.mp3')} />

      <div
        style={{
          fontSize: 16,
          fontWeight: 800,
          color: '#059669',
          letterSpacing: 2,
          marginBottom: 12
        }}
      >
        WORKBOOK LESSON
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
        How Voltage & Current Behave in Parallel
      </div>

      <div style={{display: 'flex', gap: 36, width: '100%', maxWidth: 1150}}>
        <InfoCard
          badge="DEFINITION"
          title="Components in Parallel"
          points={[
            "Two or more components are in 'Parallel' if connected to the SAME two points (Battery P & Battery N).",
            "Electricity has MULTIPLE independent paths to travel through.",
            "Each path operates independently of the other branch."
          ]}
          style={{flex: 1}}
        />

        <InfoCard
          badge="ELECTRICAL RULES"
          title="Voltage vs. Current"
          points={[
            "VOLTAGE REMAINS SAME: Both LEDs receive the full 3.0 Volts of the battery directly.",
            "CURRENT GETS DIVIDED: The battery's total current splits between the Red and Green branches.",
            "Because both receive full voltage, both LEDs illuminate brightly!"
          ]}
          style={{flex: 1}}
        />
      </div>
    </div>
  );
};
