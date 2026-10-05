import React from 'react';
import {Audio, staticFile} from 'remotion';
import {EpodModule} from '../components/EpodModule';
import {CubicSegment, JumperWire} from '../components/JumperWire';
import {HeaderBanner, InfoCard, StatusBadge} from '../components/Labels';
import {PencilLead} from '../components/PencilLead';

export const EXP04_WIRE_BATTERY_TO_LEAD: CubicSegment[] = [
  {
    p0: {x: 580, y: 425},
    p1: {x: 540, y: 310},
    p2: {x: 720, y: 300},
    p3: {x: 855, y: 395}
  }
];

export const EXP04_WIRE_LEAD_TO_LED: CubicSegment[] = [
  {
    p0: {x: 1065, y: 395},
    p1: {x: 1200, y: 300},
    p2: {x: 1380, y: 310},
    p3: {x: 1340, y: 425}
  }
];

export const EXP04_BLACK_WIRE: CubicSegment[] = [
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

export const Scene04BuildCircuit: React.FC = () => {
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
        expNumber="EXPERIMENT 04"
        title="Assembling Fuse Circuit"
        subtitle="Insert pencil lead in series with the positive circuit rail"
      />

      <InfoCard
        title="Connection Steps"
        items={[
          "Connect Battery (N) to LED (N) [Black wire]",
          "Connect Battery (P) to Left terminal of Pencil Lead",
          "Connect LED (P) to Right terminal of Pencil Lead",
          "The pencil lead forms an in-line bridge"
        ]}
        x={60}
        y={150}
        width={340}
        accentColor="#0284C7"
      />

      <EpodModule
        type="battery"
        x={580}
        y={560}
        title="3V BATTERY EPOD"
        highlightP={true}
        highlightN={true}
      />

      <EpodModule
        type="led-red"
        x={1340}
        y={560}
        title="LED – RED EPOD"
        highlightP={true}
        highlightN={true}
        ledOn={false}
      />

      {/* Pencil Lead between the terminals */}
      <PencilLead
        x={960}
        y={395}
        broken={false}
      />

      {/* Battery P -> Pencil Lead */}
      <JumperWire
        color="#EF4444"
        segments={EXP04_WIRE_BATTERY_TO_LEAD}
        startFrame={15}
        durationInFrames={60}
        strokeWidth={11}
        highlightOnConnect={true}
      />

      {/* Pencil Lead -> LED P */}
      <JumperWire
        color="#EF4444"
        segments={EXP04_WIRE_LEAD_TO_LED}
        startFrame={80}
        durationInFrames={60}
        strokeWidth={11}
        highlightOnConnect={true}
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

      <StatusBadge status="OPEN CIRCUIT" state="warning" />
    </div>
  );
};
