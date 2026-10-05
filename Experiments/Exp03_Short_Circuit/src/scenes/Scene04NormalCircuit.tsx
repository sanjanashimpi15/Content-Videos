import React from 'react';
import {Audio, staticFile} from 'remotion';
import {EpodModule} from '../components/EpodModule';
import {CubicSegment, JumperWire} from '../components/JumperWire';
import {HeaderBanner, InfoCard, StatusBadge} from '../components/Labels';

export const EXP03_RED_WIRE: CubicSegment[] = [
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

export const EXP03_BLACK_WIRE: CubicSegment[] = [
  {
    p0: {x: 580, y: 695},
    p1: {x: 520, y: 860},
    p2: {x: 740, y: 900},
    p3: {x: 960, y: 900}
  },
  {
    p0: {x: 960, y: 900},
    p1: {x: 1180, y: 900},
    p2: {x: 1400, y: 860},
    p3: {x: 1340, y: 695}
  }
];

export const Scene04NormalCircuit: React.FC = () => {
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
        expNumber="EXPERIMENT 03"
        title="Baseline: Normal Operating Circuit"
        subtitle="Battery powers LED under normal closed circuit conditions"
      />

      <InfoCard
        title="Normal Operation"
        items={[
          "Battery (P) connects to LED (P) [Red wire]",
          "Battery (N) connects to LED (N) [Black wire]",
          "Current flows smoothly through LED diode",
          "Observation: Red LED glows bright and steady",
          "Next step: We will attach the 3rd jumper wire"
        ]}
        x={60}
        y={150}
        width={340}
        accentColor="#10B981"
      />

      <EpodModule
        type="battery"
        x={580}
        y={560}
        title="3V BATTERY EPOD"
      />

      <EpodModule
        type="led-red"
        x={1340}
        y={560}
        title="LED – RED EPOD"
        ledOn={true}
      />

      {/* Red wire */}
      <JumperWire
        color="#EF4444"
        segments={EXP03_RED_WIRE}
        startFrame={0}
        durationInFrames={0}
        strokeWidth={11}
        showMovingConnector={false}
        highlightOnConnect={false}
      />

      {/* Black wire */}
      <JumperWire
        color="#1E293B"
        segments={EXP03_BLACK_WIRE}
        startFrame={0}
        durationInFrames={0}
        strokeWidth={11}
        showMovingConnector={false}
        highlightOnConnect={false}
      />

      <StatusBadge status="CLOSED CIRCUIT" state="success" />
    </div>
  );
};
