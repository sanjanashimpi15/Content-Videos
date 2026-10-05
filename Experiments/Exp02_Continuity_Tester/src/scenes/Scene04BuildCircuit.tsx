import React from 'react';
import {Audio, staticFile, useCurrentFrame} from 'remotion';
import {EpodModule} from '../components/EpodModule';
import {CubicSegment, JumperWire} from '../components/JumperWire';
import {HeaderBanner, InfoCard, StatusBadge} from '../components/Labels';
import {ProbeWire} from '../components/ProbeWire';

export const EXP02_TOP_WIRE: CubicSegment[] = [
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

export const Scene04BuildCircuit: React.FC = () => {
  const frame = useCurrentFrame();

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
        expNumber="EXPERIMENT 02"
        title="Assembling Continuity Tester"
        subtitle="Connect P terminals together and attach single-strand probe wires"
      />

      <InfoCard
        title="Assembly Steps"
        items={[
          "Connect Battery (P) to LED (P) with Red wire",
          "Attach single-strand wire to Battery (N)",
          "Attach single-strand wire to LED (N)",
          "Observe the 2 open probe terminals in the center"
        ]}
        x={60}
        y={150}
        width={340}
        accentColor="#3B82F6"
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

      {/* Top Red Jumper Wire */}
      <JumperWire
        color="#EF4444"
        segments={EXP02_TOP_WIRE}
        startFrame={10}
        durationInFrames={60}
        strokeWidth={11}
        highlightOnConnect={true}
      />

      {/* Left Probe Wire (Battery N -> Center Left) */}
      <ProbeWire
        startPoint={{x: 580, y: 695}}
        tipPoint={{x: 880, y: 720}}
        color="#1E293B"
        strokeWidth={7}
      />

      {/* Right Probe Wire (LED N -> Center Right) */}
      <ProbeWire
        startPoint={{x: 1340, y: 695}}
        tipPoint={{x: 1040, y: 720}}
        color="#1D4ED8"
        strokeWidth={7}
      />

      {/* Probe Labels */}
      <div
        style={{
          position: 'absolute',
          left: 960,
          top: 660,
          transform: 'translateX(-50%)',
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '6px 18px',
          borderRadius: 14,
          fontSize: 14,
          fontWeight: 800,
          color: '#D97706',
          border: '1px solid #FCD34D',
          boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
        }}
      >
        OPEN PROBE TERMINALS (AIR GAP)
      </div>

      <StatusBadge status="OPEN CIRCUIT" state="warning" />
    </div>
  );
};
