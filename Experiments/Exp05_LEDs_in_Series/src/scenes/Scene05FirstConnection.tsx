import React from 'react';
import {Audio, staticFile, useCurrentFrame} from 'remotion';
import {EpodModule} from '../components/EpodModule';
import {JumperWire} from '../components/JumperWire';

export const Scene05FirstConnection: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#F8FAFC',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}
    >
      <Audio src={staticFile('audio/scene-05.mp3')} />

      {/* Top Banner */}
      <div
        style={{
          position: 'absolute',
          top: 36,
          left: 0,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 20
        }}
      >
        <div
          style={{
            background: '#FEE2E2',
            color: '#DC2626',
            fontSize: 14,
            fontWeight: 800,
            padding: '6px 18px',
            borderRadius: 999,
            letterSpacing: 1.5,
            marginBottom: 8
          }}
        >
          CONNECTION 1 OF 3
        </div>
        <div
          style={{
            fontSize: 34,
            fontWeight: 900,
            color: '#0F172A'
          }}
        >
          3V Battery (P) → LED – Red (P)
        </div>
      </div>

      {/* 3 ePods */}
      <EpodModule
        cx={440}
        cy={560}
        type="battery"
        label="3V Battery ePod"
        highlightP={frame < 80}
      />

      <EpodModule
        cx={960}
        cy={560}
        type="led-red"
        label="LED – Red ePod"
        highlightP={frame >= 40}
      />

      <EpodModule
        cx={1480}
        cy={560}
        type="led-green"
        label="LED – Green ePod"
      />

      {/* Jumper Wire 1: Battery P -> Red LED P */}
      <JumperWire
        start={{x: 440, y: 425}}
        end={{x: 960, y: 425}}
        color="#EF4444"
        startFrame={30}
        durationFrames={50}
        arcHeight={-90}
        strokeWidth={7}
      />
    </div>
  );
};
