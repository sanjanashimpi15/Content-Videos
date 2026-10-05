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
        expNumber="EXPERIMENT 04"
        title="Official Circuit Diagram"
        subtitle="Review fuse-in-circuit schematic from workbook"
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
          expTitle="Exp 04: A Fuse in a Circuit"
          sourceFile="assets/circuit-diagram.png"
          width={820}
        />

        <InfoCard
          title="Connection Table"
          items={[
            "3V Battery (P) ➔ Pencil Lead [Left Terminal]",
            "LED – Red (P) ➔ Pencil Lead [Right Terminal]",
            "3V Battery (N) ➔ LED – Red (N) [Black Wire]",
            "Pencil lead is in series with the positive line",
            "Acts as the protective fuse filament"
          ]}
          width={480}
          accentColor="#0284C7"
          isStatic={true}
        />
      </div>
    </div>
  );
};
