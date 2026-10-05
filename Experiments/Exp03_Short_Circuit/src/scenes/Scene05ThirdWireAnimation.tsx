import React from 'react';
import {Audio, staticFile, useCurrentFrame} from 'remotion';
import {EpodModule} from '../components/EpodModule';
import {CubicSegment, JumperWire} from '../components/JumperWire';
import {HeaderBanner, InfoCard, StatusBadge} from '../components/Labels';
import {EXP03_BLACK_WIRE, EXP03_RED_WIRE} from './Scene04NormalCircuit';

export const EXP03_SHORT_WIRE: CubicSegment[] = [
  {
    p0: {x: 1340, y: 425},
    p1: {x: 1520, y: 425},
    p2: {x: 1620, y: 500},
    p3: {x: 1620, y: 560}
  },
  {
    p0: {x: 1620, y: 560},
    p1: {x: 1620, y: 620},
    p2: {x: 1520, y: 695},
    p3: {x: 1340, y: 695}
  }
];

export const Scene05ThirdWireAnimation: React.FC = () => {
  const frame = useCurrentFrame();
  const isShortConnected = frame >= 100;

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
        expNumber="EXPERIMENT 03"
        title="Connecting Third Jump Wire (P ➔ N)"
        subtitle="Connecting extra wire directly across LED terminals"
      />

      <InfoCard
        title="Step 3: Direct Bridge"
        items={[
          "Insert 3rd wire into LED (P) terminal",
          "Guide wire down the right side",
          "Snap connector into LED (N) terminal",
          isShortConnected ? "Direct zero-resistance path formed!" : "Moving connector toward (N)...",
          isShortConnected ? "LED immediately turns OFF!" : "Watch the LED as wire snaps in..."
        ]}
        x={60}
        y={150}
        width={340}
        accentColor="#F59E0B"
      />

      <EpodModule
        type="battery"
        x={580}
        y={560}
        title="3V BATTERY EPOD"
      />

      {/* LED turns OFF the instant 3rd wire connects at frame 100 */}
      <EpodModule
        type="led-red"
        x={1340}
        y={560}
        title="LED – RED EPOD"
        ledOn={!isShortConnected}
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

      {/* 3rd Shorting Jump Wire (Gold/Yellow) */}
      <JumperWire
        color="#F59E0B"
        segments={EXP03_SHORT_WIRE}
        startFrame={20}
        durationInFrames={80}
        strokeWidth={11}
        highlightOnConnect={true}
      />

      <StatusBadge
        status={isShortConnected ? "SHORT CIRCUIT" : "CLOSED CIRCUIT"}
        state={isShortConnected ? "error" : "success"}
      />
    </div>
  );
};
