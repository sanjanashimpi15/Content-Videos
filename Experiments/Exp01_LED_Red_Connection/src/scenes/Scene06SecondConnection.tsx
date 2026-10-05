import React from 'react';
import {Audio, staticFile, useCurrentFrame} from 'remotion';
import {EpodModule} from '../components/EpodModule';
import {CubicSegment, JumperWire} from '../components/JumperWire';
import {HeaderBanner, InfoCard, StatusBadge} from '../components/Labels';
import {RED_WIRE_SEGMENTS} from './Scene05FirstConnection';

export const BLACK_WIRE_SEGMENTS: CubicSegment[] = [
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

export const Scene06SecondConnection: React.FC = () => {
  const frame = useCurrentFrame();
  const isConnected = frame >= 105;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#F8FAFC',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}
    >
      <Audio src={staticFile('audio/scene-06.mp3')} />

      <HeaderBanner
        expNumber="EXPERIMENT 01"
        title="Second Connection: Negative (N ➔ N)"
        subtitle="Connect Black jump wire from Battery N to LED N"
      />

      <InfoCard
        title="Step 2: N ➔ N"
        items={[
          "Insert black wire into Battery (N)",
          "Guide wire across lower route",
          "Snap connector into LED (N) terminal",
          isConnected ? "Loop closed! Current begins flowing" : "Completing electrical path..."
        ]}
        x={60}
        y={150}
        width={340}
        accentColor="#1E293B"
      />

      <EpodModule
        type="battery"
        x={580}
        y={560}
        title="3V BATTERY EPOD"
        highlightP={isConnected}
        highlightN={true}
      />

      <EpodModule
        type="led-red"
        x={1340}
        y={560}
        title="LED – RED EPOD"
        highlightP={isConnected}
        highlightN={true}
        ledOn={isConnected}
      />

      {/* Red wire held in place */}
      <JumperWire
        color="#EF4444"
        segments={RED_WIRE_SEGMENTS}
        startFrame={0}
        durationInFrames={0}
        strokeWidth={11}
        showMovingConnector={false}
        highlightOnConnect={false}
      />

      {/* Black wire animating */}
      <JumperWire
        color="#1E293B"
        segments={BLACK_WIRE_SEGMENTS}
        startFrame={25}
        durationInFrames={80}
        strokeWidth={11}
        highlightOnConnect={true}
      />

      <StatusBadge
        status={isConnected ? "CLOSED CIRCUIT" : "OPEN CIRCUIT"}
        state={isConnected ? "success" : "warning"}
      />
    </div>
  );
};
