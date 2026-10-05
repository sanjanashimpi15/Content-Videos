import React from 'react';
import {Audio, staticFile} from 'remotion';
import {EpodModule} from '../components/EpodModule';
import {JumperWire} from '../components/JumperWire';
import {HeaderBanner, InfoCard, StatusBadge} from '../components/Labels';
import {PencilLead} from '../components/PencilLead';
import {EXP04_BLACK_WIRE, EXP04_WIRE_BATTERY_TO_LEAD, EXP04_WIRE_LEAD_TO_LED} from './Scene04BuildCircuit';

export const Scene05PencilLeadAsFuse: React.FC = () => {
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
        expNumber="EXPERIMENT 04"
        title="Pencil Lead Completes Circuit (LED ON)"
        subtitle="Graphite is electrically conductive and functions as a fuse"
      />

      <InfoCard
        title="Fuse in Operation"
        items={[
          "Pencil lead is intact and bridging the terminals",
          "Graphite allows electric current to flow through",
          "Circuit is CLOSED and continuous",
          "Red LED glows brightly and steadily!",
          "Pencil lead acts like an active fuse element"
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
        title="LED – RED EPOD (ON)"
        ledOn={true}
      />

      {/* Intact Lead */}
      <PencilLead
        x={960}
        y={395}
        broken={false}
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

      <StatusBadge status="CLOSED CIRCUIT" state="success" />
    </div>
  );
};
