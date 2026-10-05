import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {TitleBadge, TerminalCallout} from '../components/Labels';
import {Epod} from '../components/Epod';

export const Scene03Battery: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: {damping: 14, stiffness: 85}
  });

  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  const calloutOpacity = interpolate(frame, [25, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  return (
    <AbsoluteFill style={{backgroundColor: '#FFFFFF'}}>
      <TitleBadge
        badge="Power Source"
        title="3V BATTERY EPOD"
        subtitle="Powered by a CR2032 coin-cell battery with P and N terminals"
        top={80}
        opacity={opacity}
      />

      {/* Prominently centered 3V Battery ePod */}
      <div
        style={{
          position: 'absolute',
          top: '52%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${entrance * 1.55})`,
          opacity
        }}
      >
        <Epod type="battery" scale={1} />
      </div>

      {/* Terminal Callouts */}
      <TerminalCallout
        label="P Terminal"
        sub="Positive"
        x={480}
        y={530}
        anchor="right"
        opacity={calloutOpacity}
      />

      <TerminalCallout
        label="N Terminal"
        sub="Negative"
        x={1440}
        y={530}
        anchor="left"
        opacity={calloutOpacity}
      />
    </AbsoluteFill>
  );
};
