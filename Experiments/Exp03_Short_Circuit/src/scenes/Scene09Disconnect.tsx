import React from 'react';
import {Audio, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {EpodModule} from '../components/EpodModule';
import {JumperWire} from '../components/JumperWire';
import {HeaderBanner, InfoCard, StatusBadge} from '../components/Labels';
import {EXP03_BLACK_WIRE, EXP03_RED_WIRE} from './Scene04NormalCircuit';

export const Scene09Disconnect: React.FC = () => {
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
      <Audio src={staticFile('audio/scene-09.mp3')} />

      <HeaderBanner
        expNumber="EXPERIMENT 03"
        title="Restoration: Disconnecting Third Wire"
        subtitle="Short circuit removed — normal operation restored"
      />

      <InfoCard
        title="Summary Result"
        items={[
          "Third jumper wire has been removed",
          "Direct shorting path is eliminated",
          "Current once again flows through the LED",
          "Red LED glows normally and steadily!",
          "Conclusion: Short circuit bypassed the load"
        ]}
        x={60}
        y={150}
        width={350}
        accentColor="#10B981"
      />

      <EpodModule
        type="battery"
        x={580}
        y={560}
        title="3V BATTERY EPOD"
      />

      {/* LED turns back ON as soon as short is removed */}
      <EpodModule
        type="led-red"
        x={1340}
        y={560}
        title="LED – RED EPOD (ON)"
        ledOn={true}
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

      {/* Third wire removed badge */}
      <div
        style={{
          position: 'absolute',
          left: 1460,
          top: 560,
          transform: 'translateY(-50%)',
          background: '#ECFDF5',
          border: '2px solid #10B981',
          color: '#065F46',
          padding: '10px 22px',
          borderRadius: 24,
          fontWeight: 800,
          fontSize: 14,
          boxShadow: '0 4px 16px rgba(16, 185, 129, 0.2)',
          zIndex: 45
        }}
      >
        ✓ SHORT CIRCUIT REMOVED
      </div>

      <StatusBadge status="CLOSED CIRCUIT" state="success" />
    </div>
  );
};
