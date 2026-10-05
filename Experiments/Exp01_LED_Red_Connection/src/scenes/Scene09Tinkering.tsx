import React from 'react';
import {Audio, staticFile} from 'remotion';
import {EpodModule} from '../components/EpodModule';
import {JumperWire} from '../components/JumperWire';
import {HeaderBanner, InfoCard, StatusBadge} from '../components/Labels';
import {RED_WIRE_SEGMENTS} from './Scene05FirstConnection';
import {BLACK_WIRE_SEGMENTS} from './Scene06SecondConnection';

export const Scene09Tinkering: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#F8FAFC',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}
    >
      <Audio src={staticFile('audio/scene-09.mp3')} />

      <HeaderBanner
        expNumber="EXPERIMENT 01"
        title="Tinkering: Reverse the LED"
        subtitle="Workbook Investigation #2: Testing reverse bias"
      />

      <InfoCard
        title="Tinkering Result"
        items={[
          "Condition: Reverse the LED ePod",
          "Battery (P) is now connected to LED (N)",
          "Battery (N) is now connected to LED (P)",
          "Observation: LED does NOT glow!",
          "Reason: LED blocks reverse current flow"
        ]}
        x={60}
        y={150}
        width={360}
        accentColor="#F59E0B"
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
        title="LED – REVERSED (OFF)"
        reversed={true}
        ledOn={false}
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

      <StatusBadge status="OPEN CIRCUIT" state="warning" />
    </div>
  );
};
