import React from 'react';
import {Audio, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {EpodModule} from '../components/EpodModule';
import {JumperWire} from '../components/JumperWire';
import {HeaderBanner, InfoCard, StatusBadge} from '../components/Labels';
import {PencilLead} from '../components/PencilLead';
import {EXP04_BLACK_WIRE, EXP04_WIRE_BATTERY_TO_LEAD, EXP04_WIRE_LEAD_TO_LED} from './Scene04BuildCircuit';

export const Scene06BreakPencilLead: React.FC = () => {
  const frame = useCurrentFrame();

  // Breaking animation over 60 frames
  const crackProgress = interpolate(frame, [20, 80], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  const isBroken = crackProgress >= 1;

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
        expNumber="EXPERIMENT 04"
        title="Simulating Fuse Action: Breaking the Pencil Lead"
        subtitle="Simulates the melting of a fuse filament during an electrical fault"
      />

      <InfoCard
        title="Action in Progress"
        items={[
          "Gently breaking the graphite pencil lead",
          "Watch the fracture develop in the center",
          isBroken ? "Lead snaps completely apart!" : "Crack begins forming...",
          isBroken ? "Physical conducting path is severed!" : "Simulating fuse blow...",
          "Observe the immediate effect on the LED"
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

      {/* LED turns OFF when broken */}
      <EpodModule
        type="led-red"
        x={1340}
        y={560}
        title={isBroken ? "LED – RED EPOD (OFF)" : "LED – RED EPOD (ON)"}
        ledOn={!isBroken}
      />

      {/* Breaking Pencil Lead */}
      <PencilLead
        x={960}
        y={395}
        crackProgress={crackProgress}
      />

      {/* Battery P -> Pencil Lead */}
      <JumperWire
        color="#EF4444"
        segments={EXP04_WIRE_BATTERY_TO_LEAD}
        startFrame={0}
        durationInFrames={0}
        strokeWidth={11}
        showMovingConnector={false}
        highlightOnConnect={false}
      />

      {/* Pencil Lead -> LED P */}
      <JumperWire
        color="#EF4444"
        segments={EXP04_WIRE_LEAD_TO_LED}
        startFrame={0}
        durationInFrames={0}
        strokeWidth={11}
        showMovingConnector={false}
        highlightOnConnect={false}
      />

      {/* Battery N -> LED N (Black wire) */}
      <JumperWire
        color="#1E293B"
        segments={EXP04_BLACK_WIRE}
        startFrame={0}
        durationInFrames={0}
        strokeWidth={11}
        showMovingConnector={false}
        highlightOnConnect={false}
      />

      <StatusBadge
        status={isBroken ? "FUSE BLOWN" : "CLOSED CIRCUIT"}
        state={isBroken ? "error" : "success"}
      />
    </div>
  );
};
