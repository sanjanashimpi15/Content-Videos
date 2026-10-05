import React from 'react';
import {Audio, staticFile} from 'remotion';
import {EpodModule} from '../components/EpodModule';
import {HeaderBanner, InfoCard} from '../components/Labels';

export const Scene04Positioning: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#F8FAFC',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}
    >
      <Audio src={staticFile('audio/scene-04.mp3')} />

      <HeaderBanner
        expNumber="EXPERIMENT 01"
        title="Positioning Components"
        subtitle="Align both ePods vertically with P terminals at the top"
      />

      <InfoCard
        title="Setup Guide"
        items={[
          "Place 3V Battery on the left",
          "Place LED – Red on the right",
          "Ensure both (P) terminals face upward",
          "Both sockets are aligned horizontally"
        ]}
        x={60}
        y={150}
        width={340}
        accentColor="#3B82F6"
      />

      <EpodModule
        type="battery"
        x={580}
        y={560}
        title="3V BATTERY EPOD"
        highlightP={true}
      />

      <EpodModule
        type="led-red"
        x={1340}
        y={560}
        title="LED – RED EPOD"
        highlightP={true}
      />
    </div>
  );
};
