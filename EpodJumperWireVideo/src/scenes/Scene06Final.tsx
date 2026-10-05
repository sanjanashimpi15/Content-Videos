import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {TitleBadge, StatusBadge, COLORS, FONT} from '../components/Labels';
import {Epod} from '../components/Epod';
import {JumperWire} from '../components/JumperWire';

export const Scene06Final: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  return (
    <AbsoluteFill style={{backgroundColor: '#FFFFFF'}}>
      <TitleBadge
        badge="Complete Setup"
        title="FINAL CONNECTED SETUP"
        subtitle="Battery ePod and LED ePod Linked via Jumper Wire"
        top={80}
        opacity={opacity}
      />

      {/* Battery ePod (Left) */}
      <div
        style={{
          position: 'absolute',
          left: 580,
          top: 640,
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity
        }}
      >
        <div
          style={{
            marginBottom: 260,
            fontSize: 22,
            fontWeight: 700,
            color: '#12263A',
            letterSpacing: 1
          }}
        >
          3V BATTERY EPOD
        </div>
        <div style={{position: 'absolute', top: 0}}>
          <Epod
            type="battery"
            rotation={90}
            scale={1.25}
            cropText={true}
          />
        </div>
      </div>

      {/* LED ePod (Right) */}
      <div
        style={{
          position: 'absolute',
          left: 1340,
          top: 590,
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity
        }}
      >
        <div
          style={{
            marginBottom: 260,
            fontSize: 22,
            fontWeight: 700,
            color: '#12263A',
            letterSpacing: 1
          }}
        >
          LED – RED EPOD
        </div>
        <div style={{position: 'absolute', top: 0}}>
          <Epod
            type="led"
            rotation={90}
            scale={1.25}
            cropText={true}
          />
        </div>
      </div>

      {/* Jumper wire fully connected */}
      <JumperWire
        color="#E53935"
        startFrame={0}
        durationInFrames={0}
        strokeWidth={11}
        connectorWidth={22}
        connectorHeight={44}
        showStartConnector={true}
        showMovingConnector={true}
        highlightOnConnect={false}
      />

      {/* Bottom Summary Bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 50,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 32,
          opacity,
          fontFamily: FONT
        }}
      >
        <StatusBadge text="CONNECTED" variant="green" />
        <div
          style={{
            backgroundColor: '#F5F7FA',
            padding: '12px 24px',
            borderRadius: 24,
            fontSize: 20,
            fontWeight: 600,
            color: COLORS.grey,
            border: '1px solid #E1E8F0'
          }}
        >
          P Terminal (Battery) ↔ P Terminal (LED)
        </div>
      </div>
    </AbsoluteFill>
  );
};
