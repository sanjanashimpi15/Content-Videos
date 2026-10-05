import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {TitleBadge, TerminalCallout} from '../components/Labels';
import {Epod} from '../components/Epod';

export const Scene04Positioning: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Smooth position transitions
  const transition = spring({
    frame,
    fps,
    config: {damping: 15, stiffness: 75}
  });

  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  const calloutsOpacity = interpolate(frame, [35, 55], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  // Battery ePod moves from center-left into final left position
  const batteryX = interpolate(transition, [0, 1], [300, 580]);
  const batteryRot = interpolate(transition, [0, 1], [0, 90]);

  // LED ePod moves from center-right into final right position
  const ledX = interpolate(transition, [0, 1], [1620, 1340]);
  const ledRot = interpolate(transition, [0, 1], [0, 90]);

  return (
    <AbsoluteFill style={{backgroundColor: '#FFFFFF'}}>
      <TitleBadge
        badge="Arrangement"
        title="POSITION BOTH EPODS"
        subtitle="Battery ePod on Left · LED ePod on Right · P Terminals Facing Upward"
        top={80}
        opacity={opacity}
      />

      {/* Battery ePod (Left) */}
      <div
        style={{
          position: 'absolute',
          left: batteryX,
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
            letterSpacing: 1,
            opacity: calloutsOpacity
          }}
        >
          3V BATTERY EPOD
        </div>
        <div style={{position: 'absolute', top: 0}}>
          <Epod
            type="battery"
            rotation={batteryRot}
            scale={1.25}
            cropText={true}
          />
        </div>
      </div>

      {/* LED ePod (Right) */}
      <div
        style={{
          position: 'absolute',
          left: ledX,
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
            letterSpacing: 1,
            opacity: calloutsOpacity
          }}
        >
          LED – RED EPOD
        </div>
        <div style={{position: 'absolute', top: 0}}>
          <Epod
            type="led"
            rotation={ledRot}
            scale={1.25}
            cropText={true}
          />
        </div>
      </div>

      {/* Highlight callouts for the top P terminals */}
      <TerminalCallout
        label="P Terminal"
        sub="Connect here"
        x={340}
        y={420}
        anchor="right"
        opacity={calloutsOpacity}
      />

      <TerminalCallout
        label="P Terminal"
        sub="Connect here"
        x={1580}
        y={420}
        anchor="left"
        opacity={calloutsOpacity}
      />
    </AbsoluteFill>
  );
};
