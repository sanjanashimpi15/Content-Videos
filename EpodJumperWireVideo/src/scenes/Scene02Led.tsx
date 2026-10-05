import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {TitleBadge, TerminalCallout} from '../components/Labels';
import {Epod} from '../components/Epod';

export const Scene02Led: React.FC = () => {
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
        badge="Output Component"
        title="LED – RED EPOD"
        subtitle="Features a red LED indicator with P and N connection terminals"
        top={80}
        opacity={opacity}
      />

      {/* Prominently centered LED ePod */}
      <div
        style={{
          position: 'absolute',
          top: '52%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${entrance * 1.5})`,
          opacity
        }}
      >
        <Epod type="led" scale={1} />
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
