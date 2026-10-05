import React from 'react';
import {Audio, staticFile} from 'remotion';
import {EpodModule} from '../components/EpodModule';
import {JumperWire} from '../components/JumperWire';
import {HeaderBanner, InfoCard, StatusBadge} from '../components/Labels';
import {RED_WIRE_SEGMENTS} from './Scene05FirstConnection';
import {BLACK_WIRE_SEGMENTS} from './Scene06SecondConnection';

export const Scene07LedGlows: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#F8FAFC',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}
    >
      <Audio src={staticFile('audio/scene-07.mp3')} />

      <HeaderBanner
        expNumber="EXPERIMENT 01"
        title="Result: LED Starts Glowing!"
        subtitle="Current flows through the complete closed loop"
      />

      <InfoCard
        title="Observation"
        items={[
          "The Red LED glows as soon as connection is complete",
          "Continuous current from positive pole through LED to negative pole",
          "Will glow until Battery drains or a wire is disconnected",
          "Confirms a fully functional closed electrical circuit"
        ]}
        x={60}
        y={150}
        width={360}
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
        segments={RED_WIRE_SEGMENTS}
        startFrame={0}
        durationInFrames={0}
        strokeWidth={11}
        showMovingConnector={false}
        highlightOnConnect={false}
      />

      {/* Black wire */}
      <JumperWire
        color="#1E293B"
        segments={BLACK_WIRE_SEGMENTS}
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
