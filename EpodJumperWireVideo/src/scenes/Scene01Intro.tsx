import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, TitleBadge} from '../components/Labels';

export const Scene01Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Entrance spring for image
  const scale = spring({
    frame,
    fps,
    config: {damping: 14, stiffness: 90}
  });

  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  return (
    <AbsoluteFill style={{backgroundColor: '#FFFFFF'}}>
      <TitleBadge
        badge="Component Introduction"
        title="JUMPER WIRES"
        subtitle="Long & short, red & black flexible jump leads"
        top={90}
        opacity={opacity}
      />

      {/* Center display of the jumper wires reference */}
      <div
        style={{
          position: 'absolute',
          top: '52%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${scale})`,
          opacity,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          borderRadius: 24,
          padding: '40px 60px',
          boxShadow: '0 12px 40px rgba(18, 38, 58, 0.08)',
          border: '1px solid #E8EEF5'
        }}
      >
        <Img
          src={staticFile('assets/jumper-wires.png')}
          style={{
            width: 780,
            height: 'auto',
            objectFit: 'contain'
          }}
        />

        {/* Informative tags */}
        <div
          style={{
            display: 'flex',
            gap: 24,
            marginTop: 20
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 20px',
              backgroundColor: '#FDEDED',
              color: '#D32F2F',
              borderRadius: 20,
              fontSize: 20,
              fontWeight: 700,
              border: '1px solid #FFCDD2'
            }}
          >
            <span style={{width: 14, height: 14, borderRadius: '50%', backgroundColor: '#D32F2F'}} />
            Red Wire (Positive / Signal)
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 20px',
              backgroundColor: '#F5F5F5',
              color: '#333333',
              borderRadius: 20,
              fontSize: 20,
              fontWeight: 700,
              border: '1px solid #E0E0E0'
            }}
          >
            <span style={{width: 14, height: 14, borderRadius: '50%', backgroundColor: '#212121'}} />
            Black Wire (Ground / Negative)
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
