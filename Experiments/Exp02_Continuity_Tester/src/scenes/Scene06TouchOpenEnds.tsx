import React from 'react';
import {Audio, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {EpodModule} from '../components/EpodModule';
import {JumperWire} from '../components/JumperWire';
import {HeaderBanner, InfoCard, StatusBadge} from '../components/Labels';
import {ProbeWire} from '../components/ProbeWire';
import {EXP02_TOP_WIRE} from './Scene04BuildCircuit';

export const Scene06TouchOpenEnds: React.FC = () => {
  const frame = useCurrentFrame();

  // Animation: probe tips move from separated (870, 1050) to touching (955, 965)
  const touchProgress = interpolate(frame, [15, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  const leftTipX = interpolate(touchProgress, [0, 1], [870, 955]);
  const rightTipX = interpolate(touchProgress, [0, 1], [1050, 965]);

  const isTouching = touchProgress >= 1;

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
        expNumber="EXPERIMENT 02"
        title="Test 2: Touching Open Terminals Together"
        subtitle="Direct metal-to-metal contact completes the circuit path"
      />

      <InfoCard
        title="Observation"
        items={[
          "Move probe tips toward each other",
          "Touch exposed copper ends directly together",
          isTouching ? "Touching completes the circuit path!" : "Bringing probe ends together...",
          isTouching ? "Red LED turns ON and glows brightly!" : "Watching for circuit closure...",
          "Confirms continuity between probe terminals"
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
        ledOn={isTouching}
      />

      {/* Top Red Jumper Wire */}
      <JumperWire
        color="#EF4444"
        segments={EXP02_TOP_WIRE}
        startFrame={0}
        durationInFrames={0}
        strokeWidth={11}
        showMovingConnector={false}
        highlightOnConnect={false}
      />

      {/* Left Probe Wire */}
      <ProbeWire
        startPoint={{x: 580, y: 695}}
        tipPoint={{x: leftTipX, y: 720}}
        color="#1E293B"
        strokeWidth={7}
        highlightTip={isTouching}
      />

      {/* Right Probe Wire */}
      <ProbeWire
        startPoint={{x: 1340, y: 695}}
        tipPoint={{x: rightTipX, y: 720}}
        color="#1D4ED8"
        strokeWidth={7}
        highlightTip={isTouching}
      />

      {isTouching && (
        <div
          style={{
            position: 'absolute',
            left: 960,
            top: 650,
            transform: 'translateX(-50%)',
            background: '#ECFDF5',
            border: '2px solid #34D399',
            color: '#065F46',
            padding: '8px 24px',
            borderRadius: 24,
            fontWeight: 800,
            fontSize: 15,
            boxShadow: '0 4px 16px rgba(16, 185, 129, 0.2)'
          }}
        >
          ✓ DIRECT CONTACT: CLOSED CIRCUIT
        </div>
      )}

      <StatusBadge
        status={isTouching ? "CLOSED CIRCUIT" : "OPEN CIRCUIT"}
        state={isTouching ? "success" : "warning"}
      />
    </div>
  );
};
