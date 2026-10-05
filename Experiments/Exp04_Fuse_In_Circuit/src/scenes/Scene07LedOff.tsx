import React from 'react';
import {Audio, staticFile} from 'remotion';
import {EpodModule} from '../components/EpodModule';
import {JumperWire} from '../components/JumperWire';
import {HeaderBanner, InfoCard, StatusBadge} from '../components/Labels';
import {PencilLead} from '../components/PencilLead';
import {EXP04_BLACK_WIRE, EXP04_WIRE_BATTERY_TO_LEAD, EXP04_WIRE_LEAD_TO_LED} from './Scene04BuildCircuit';

export const Scene07LedOff: React.FC = () => {
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
        expNumber="EXPERIMENT 04"
        title="Result: Open Circuit Created (LED Turns OFF)"
        subtitle="Broken fuse severs the electrical pathway"
      />

      <InfoCard
        title="Observation"
        items={[
          "Pencil lead is snapped into two separate pieces",
          "An air gap is created between the broken ends",
          "The electrical circuit is now completely OPEN",
          "Red LED turns OFF immediately",
          "Current stops flowing through the rest of the circuit"
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
      />

      {/* LED is completely OFF */}
      <EpodModule
        type="led-red"
        x={1340}
        y={560}
        title="LED – RED EPOD (OFF)"
        ledOn={false}
      />

      {/* Fully broken pencil lead */}
      <PencilLead
        x={960}
        y={395}
        broken={true}
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

      <StatusBadge status="OPEN CIRCUIT" state="error" />
    </div>
  );
};
