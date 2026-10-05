import React from 'react';
import {Audio, staticFile, useCurrentFrame} from 'remotion';
import {EpodModule} from '../components/EpodModule';
import {JumperWire} from '../components/JumperWire';
import {HeaderBanner, InfoCard, StatusBadge} from '../components/Labels';
import {MaterialSample} from '../components/MaterialSample';
import {ProbeWire} from '../components/ProbeWire';
import {EXP02_TOP_WIRE} from './Scene04BuildCircuit';

export const Scene08PaperPlasticTest: React.FC = () => {
  const frame = useCurrentFrame();
  const isPlastic = frame >= 250;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#F8FAFC',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}
    >
      <Audio src={staticFile('audio/scene-08.mp3')} />

      <HeaderBanner
        expNumber="EXPERIMENT 02"
        title={isPlastic ? "Test 4B: Testing on Plastic Box" : "Test 4A: Testing on Paper"}
        subtitle="Testing non-conductive materials (insulators)"
      />

      <InfoCard
        title={isPlastic ? "Plastic Box Test" : "Paper Test"}
        items={
          isPlastic
            ? [
                "Place open terminals on plastic box",
                "Plastic has no free electric charge carriers",
                "Electric current CANNOT pass through plastic",
                "Observation: LED stays OFF",
                "Conclusion: Plastic is an INSULATOR"
              ]
            : [
                "Place open terminals on piece of paper",
                "Paper is an organic insulator",
                "Electric current CANNOT pass through paper",
                "Observation: LED stays OFF",
                "Conclusion: Paper is a BAD CONDUCTOR (Insulator)"
              ]
        }
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

      {/* LED remains strictly OFF for insulators */}
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

      {/* Material under test in center */}
      <MaterialSample
        type={isPlastic ? 'plastic-box' : 'paper'}
        x={960}
        y={720}
        label={isPlastic ? 'Plastic Box' : 'Piece of Paper'}
        isConductor={false}
      />

      {/* Left Probe */}
      <ProbeWire
        startPoint={{x: 580, y: 695}}
        tipPoint={{x: 880, y: 720}}
        color="#1E293B"
        strokeWidth={7}
      />

      {/* Right Probe */}
      <ProbeWire
        startPoint={{x: 1340, y: 695}}
        tipPoint={{x: 1040, y: 720}}
        color="#1D4ED8"
        strokeWidth={7}
      />

      <StatusBadge status="OPEN CIRCUIT" state="error" />
    </div>
  );
};
