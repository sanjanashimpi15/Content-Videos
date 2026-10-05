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
        expNumber="EXPERIMENT 03"
        title="Official Circuit Diagram"
        subtitle="Review short circuit schematic from workbook"
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
        <CircuitDiagramCard
          expTitle="Exp 03: Short Circuit"
          sourceFile="assets/circuit-diagram.png"
          width={820}
        />

        <InfoCard
          title="Connection Table"
          items={[
            "3V Battery (P) ➔ LED – Red (P) [Red wire]",
            "3V Battery (N) ➔ LED – Red (N) [Black wire]",
            "LED – Red (P) ➔ LED – Red (N) [3rd Wire!]",
            "Extra wire is in parallel across LED terminals",
            "Creates direct zero-resistance bypass path"
          ]}
          width={480}
          accentColor="#F59E0B"
          isStatic={true}
        />
      </div>
    </div>
  );
};
