import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {TitleBadge, StatusBadge, TerminalCallout} from '../components/Labels';
import {Epod} from '../components/Epod';
import {JumperWire} from '../components/JumperWire';

export const Scene05WireConnection: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  const wireStartFrame = 25;
  const wireDurationFrames = 210;
  const connectedFrame = wireStartFrame + wireDurationFrames;

  // Status badge appears after connection completes
  const isConnected = frame >= connectedFrame;
  const badgeOpacity = interpolate(frame - connectedFrame, [10, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });
  const badgeScale = isConnected
    ? spring({
        frame: frame - connectedFrame - 10,
        fps,
        config: {damping: 12, stiffness: 150}
      })
    : 0;

  return (
    <AbsoluteFill style={{backgroundColor: '#FFFFFF'}}>
      <TitleBadge
        badge="Physical Connection"
        title="JUMPER WIRE CONNECTION"
        subtitle="Connecting the Red Wire from Battery P Terminal to LED P Terminal"
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
          alignItems: 'center'
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
          alignItems: 'center'
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

      {/* Terminal labels */}
      <TerminalCallout
        label="Terminal P"
        sub="Start"
        x={340}
        y={420}
        anchor="right"
      />

      <TerminalCallout
        label="Terminal P"
        sub="Destination"
        x={1580}
        y={420}
        anchor="left"
      />

      {/* THE ANIMATED JUMPER WIRE */}
      <JumperWire
        color="#E53935"
        startFrame={wireStartFrame}
        durationInFrames={wireDurationFrames}
        strokeWidth={11}
        connectorWidth={22}
        connectorHeight={44}
        showStartConnector={true}
        showMovingConnector={true}
        highlightOnConnect={true}
      />

      {/* Connected Confirmation Badge */}
      {isConnected && (
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            opacity: badgeOpacity,
            transform: `scale(${badgeScale})`
          }}
        >
          <StatusBadge text="P TERMINAL CONNECTED" variant="green" />
        </div>
      )}
    </AbsoluteFill>
  );
};
