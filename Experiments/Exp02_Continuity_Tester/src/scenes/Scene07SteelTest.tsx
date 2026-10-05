import React from 'react';
import {Audio, staticFile} from 'remotion';
import {EpodModule} from '../components/EpodModule';
import {JumperWire} from '../components/JumperWire';
import {HeaderBanner, InfoCard, StatusBadge} from '../components/Labels';
import {MaterialSample} from '../components/MaterialSample';
import {ProbeWire} from '../components/ProbeWire';
import {EXP02_TOP_WIRE} from './Scene04BuildCircuit';

export const Scene07SteelTest: React.FC = () => {
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
        expNumber="EXPERIMENT 02"
        title="Test 3: Testing on Metal (Steel Ring)"
        subtitle="Metals are good electrical conductors"
      />

      <InfoCard
        title="Observation"
        items={[
          "Place open terminals on steel ring",
          "Steel is a metal containing free electrons",
          "Current flows smoothly through the metal",
          "Observation: LED glows brightly!",
          "Conclusion: Steel is a GOOD CONDUCTOR"
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
        ledOn={true}
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

      {/* Steel Ring in center */}
      <MaterialSample
        type="steel-ring"
        x={960}
        y={720}
        label="Steel Ring"
        isConductor={true}
      />

      {/* Left Probe touching left side of steel ring */}
      <ProbeWire
        startPoint={{x: 580, y: 695}}
        tipPoint={{x: 890, y: 720}}
        color="#1E293B"
        strokeWidth={7}
        highlightTip={true}
      />

      {/* Right Probe touching right side of steel ring */}
      <ProbeWire
        startPoint={{x: 1340, y: 695}}
        tipPoint={{x: 1030, y: 720}}
        color="#1D4ED8"
        strokeWidth={7}
        highlightTip={true}
      />

      <StatusBadge status="CLOSED CIRCUIT" state="success" />
    </div>
  );
};
