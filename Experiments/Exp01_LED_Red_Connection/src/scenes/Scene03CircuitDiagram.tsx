import React from 'react';
import {Audio, staticFile} from 'remotion';
import {CircuitDiagramCard} from '../components/CircuitDiagramCard';
import {HeaderBanner, InfoCard} from '../components/Labels';

export const Scene03CircuitDiagram: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#F8FAFC',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}
    >
      <Audio src={staticFile('audio/scene-03.mp3')} />

      <HeaderBanner
        expNumber="EXPERIMENT 01"
        title="Official Circuit Diagram"
        subtitle="Review schematic before physical assembly"
      />

      <div
        style={{
          position: 'absolute',
          top: 170,
          left: 80,
          right: 80,
          bottom: 60,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 60
        }}
      >
        {/* Left: Circuit Diagram Card */}
        <CircuitDiagramCard
          expTitle="Exp 01: LED – Red Connection"
          sourceFile="assets/circuit-diagram.png"
          width={820}
        />

        {/* Right: Connection Table Card */}
        <InfoCard
          title="Connection Table"
          items={[
            "3V Battery (P) ➔ LED – Red (P) [Red wire]",
            "3V Battery (N) ➔ LED – Red (N) [Black wire]",
            "Positive pole connects to Positive node",
            "Negative pole connects to Negative node",
            "Forms a closed conductive loop"
          ]}
          width={480}
          accentColor="#EF4444"
          isStatic={true}
        />
      </div>
    </div>
  );
};
