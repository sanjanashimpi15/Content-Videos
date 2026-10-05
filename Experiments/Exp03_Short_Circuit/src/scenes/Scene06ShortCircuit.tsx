import React from 'react';
import {Audio, staticFile} from 'remotion';
import {EpodModule} from '../components/EpodModule';
import {JumperWire} from '../components/JumperWire';
import {HeaderBanner, InfoCard, StatusBadge} from '../components/Labels';
import {EXP03_BLACK_WIRE, EXP03_RED_WIRE} from './Scene04NormalCircuit';
import {EXP03_SHORT_WIRE} from './Scene05ThirdWireAnimation';

export const Scene06ShortCircuit: React.FC = () => {
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
        expNumber="EXPERIMENT 03"
        title="Result: Short Circuit Active (LED Turns OFF)"
        subtitle="Electricity follows the path of least resistance"
      />

      <InfoCard
        title="Key Observation"
        items={[
          "The LED does NOT glow when 3rd wire is connected",
          "A direct zero-resistance path exists from (P) to (N)",
          "All electrical current flows through the shorting wire",
          "Current completely bypasses the higher-resistance LED",
          "Power source is short-circuited directly"
        ]}
        x={60}
        y={150}
        width={350}
        accentColor="#EF4444"
      />

      <EpodModule
        type="battery"
        x={580}
        y={560}
        title="3V BATTERY EPOD"
      />

      {/* LED remains OFF during short circuit */}
      <EpodModule
        type="led-red"
        x={1340}
        y={560}
        title="LED – RED EPOD (OFF)"
        ledOn={false}
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

      {/* 3rd Shorting wire active */}
      <JumperWire
        color="#F59E0B"
        segments={EXP03_SHORT_WIRE}
        startFrame={0}
        durationInFrames={0}
        strokeWidth={11}
        showMovingConnector={false}
        highlightOnConnect={false}
      />

      {/* Direct Path Callout */}
      <div
        style={{
          position: 'absolute',
          left: 1490,
          top: 560,
          transform: 'translateY(-50%)',
          background: '#FEF2F2',
          border: '2px solid #EF4444',
          color: '#B91C1C',
          padding: '8px 18px',
          borderRadius: 20,
          fontWeight: 800,
          fontSize: 14,
          boxShadow: '0 4px 16px rgba(239, 68, 68, 0.2)',
          zIndex: 45,
          whiteSpace: 'nowrap'
        }}
      >
        ⚡ DIRECT ZERO-RESISTANCE PATH
      </div>

      <StatusBadge status="SHORT CIRCUIT" state="error" />
    </div>
  );
};
