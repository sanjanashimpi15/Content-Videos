import React from 'react';
import {Audio, staticFile} from 'remotion';
import {EpodModule} from '../components/EpodModule';
import {CubicSegment, JumperWire} from '../components/JumperWire';
import {HeaderBanner, InfoCard, StatusBadge} from '../components/Labels';

export const RED_WIRE_SEGMENTS: CubicSegment[] = [
  {
    p0: {x: 580, y: 425},
    p1: {x: 520, y: 240},
    p2: {x: 740, y: 190},
    p3: {x: 960, y: 190}
  },
  {
    p0: {x: 960, y: 190},
    p1: {x: 1180, y: 190},
    p2: {x: 1400, y: 240},
    p3: {x: 1340, y: 425}
  }
];

export const Scene05FirstConnection: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#F8FAFC',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}
    >
      <Audio src={staticFile('audio/scene-05.mp3')} />

      <HeaderBanner
        expNumber="EXPERIMENT 01"
        title="First Connection: Positive (P ➔ P)"
        subtitle="Connect Red jump wire from Battery P to LED P"
      />

      <InfoCard
        title="Step 1: P ➔ P"
        items={[
          "Insert red wire into Battery (P)",
          "Guide wire across to LED ePod",
          "Snap connector into LED (P) terminal",
          "Observe: Circuit is still open"
        ]}
        x={60}
        y={150}
        width={340}
        accentColor="#EF4444"
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
        ledOn={false}
      />

      <JumperWire
        color="#EF4444"
        segments={RED_WIRE_SEGMENTS}
        startFrame={30}
        durationInFrames={80}
        strokeWidth={11}
        highlightOnConnect={true}
      />

      <StatusBadge status="OPEN CIRCUIT" state="warning" />
    </div>
  );
};
