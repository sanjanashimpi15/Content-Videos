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
        expNumber="EXPERIMENT 02"
        title="Official Circuit Diagram"
        subtitle="Review continuity tester schematic from workbook"
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
          expTitle="Exp 02: Continuity Tester"
          sourceFile="assets/circuit-diagram.png"
          width={820}
        />

        <InfoCard
          title="Connection Table"
          items={[
            "3V Battery (P) ➔ LED – Red (P) [Red Jump Wire]",
            "3V Battery (N) ➔ 1–strand wire (Open Probe A)",
            "LED – Red (N) ➔ 1–strand wire (Open Probe B)",
            "Creates two exposed testing terminals",
            "Circuit stays OPEN until probes touch a conductor"
          ]}
          width={480}
          accentColor="#3B82F6"
          isStatic={true}
        />
      </div>
    </div>
  );
};
