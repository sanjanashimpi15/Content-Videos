import React from 'react';
import {Audio, staticFile} from 'remotion';
import {CountdownTimer} from '../components/CountdownTimer';
import {EpodModule} from '../components/EpodModule';
import {JumperWire} from '../components/JumperWire';
import {HeaderBanner, InfoCard, StatusBadge} from '../components/Labels';
import {EXP03_BLACK_WIRE, EXP03_RED_WIRE} from './Scene04NormalCircuit';
import {EXP03_SHORT_WIRE} from './Scene05ThirdWireAnimation';

export const Scene08SafetyWarning: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#FFF5F5',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}
    >
      <Audio src={staticFile('audio/scene-08.mp3')} />

      <HeaderBanner
        expNumber="EXPERIMENT 03"
        title="CRITICAL SAFETY WARNING"
        subtitle="Mandatory rule: Never leave short circuit connected"
        category="SAFETY MANDATE"
      />

      <InfoCard
        title="Workbook Safety Rule"
        items={[
          "WARNING: Do not keep circuit connected for long!",
          "Battery will heat up rapidly and chemical will leak",
          "Mandatory: Disconnect short circuit wire after 20 seconds",
          "Always handle with safety precautions",
          "Remove the 3rd wire immediately as demonstrated next"
        ]}
        x={60}
        y={150}
        width={360}
        accentColor="#DC2626"
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

      {/* 3rd wire */}
      <JumperWire
        color="#F59E0B"
        segments={EXP03_SHORT_WIRE}
        startFrame={0}
        durationInFrames={0}
        strokeWidth={11}
        showMovingConnector={false}
        highlightOnConnect={false}
      />

      {/* 20-Second Countdown Indicator */}
      <CountdownTimer
        startFrame={0}
        durationInFrames={380}
        x={960}
        y={720}
      />

      <StatusBadge status="SHORT CIRCUIT" state="error" />
    </div>
  );
};
