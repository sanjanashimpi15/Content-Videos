import React from 'react';
import {Audio, staticFile} from 'remotion';
import {EpodModule} from '../components/EpodModule';
import {JumperWire} from '../components/JumperWire';
import {HeaderBanner, InfoCard, StatusBadge} from '../components/Labels';
import {ProbeWire} from '../components/ProbeWire';
import {EXP02_TOP_WIRE} from './Scene04BuildCircuit';

export const Scene05OpenCircuit: React.FC = () => {
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
        expNumber="EXPERIMENT 02"
        title="Test 1: Open Terminals in Air"
        subtitle="Electricity cannot bridge the open air gap"
      />

      <InfoCard
        title="Observation"
        items={[
          "Open ends are not touching anywhere",
          "Air gap has extremely high electrical resistance",
          "Electricity does NOT flow through the air",
          "LED remains OFF (Open Circuit condition)"
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

      <EpodModule
        type="led-red"
        x={1340}
        y={560}
        title="LED – RED EPOD"
        ledOn={false}
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

      {/* Probes separated in air */}
      <ProbeWire
        startPoint={{x: 580, y: 695}}
        tipPoint={{x: 870, y: 720}}
        color="#1E293B"
        strokeWidth={7}
      />

      <ProbeWire
        startPoint={{x: 1340, y: 695}}
        tipPoint={{x: 1050, y: 720}}
        color="#1D4ED8"
        strokeWidth={7}
      />

      {/* Gap Callout */}
      <div
        style={{
          position: 'absolute',
          left: 960,
          top: 660,
          transform: 'translateX(-50%)',
          background: '#FEF2F2',
          border: '1.5px solid #FCA5A5',
          color: '#B91C1C',
          padding: '6px 18px',
          borderRadius: 20,
          fontWeight: 800,
          fontSize: 14,
          boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
        }}
      >
        ⚡ AIR GAP: NO CURRENT FLOW
      </div>

      <StatusBadge status="OPEN CIRCUIT" state="warning" />
    </div>
  );
};
