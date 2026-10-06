import React from 'react';
import {Audio, staticFile, useCurrentFrame} from 'remotion';
import {EpodModule} from '../components/EpodModule';
import {JumperWire} from '../components/JumperWire';

export const Scene05Connection2: React.FC = () => {
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
            background: '#FEF3C7',
            color: '#D97706',
            fontSize: 14,
            fontWeight: 800,
            padding: '6px 18px',
            borderRadius: 999,
            letterSpacing: 1.5,
            marginBottom: 8
          }}
        >
          CONNECTION 2 OF 4
        </div>
        <div
          style={{
            fontSize: 34,
            fontWeight: 900,
            color: '#0F172A'
          }}
        >
          LED – Red (N) → LED – Green (P)
        </div>
      </div>

      <EpodModule
        cx={440}
        cy={560}
        type="battery"
        label="3V Battery ePod"
      />

      <EpodModule
        cx={960}
        cy={560}
        type="led-red"
        label="LED – Red ePod"
        highlightN={frame < 80}
      />

      <EpodModule
        cx={1480}
        cy={560}
        type="led-green"
        label="LED – Green ePod"
        highlightP={frame >= 40}
      />

      {/* Wire 1: Already connected */}
      <JumperWire
        start={{x: 440, y: 425}}
        end={{x: 960, y: 425}}
        color="#EF4444"
        startFrame={0}
        durationFrames={1}
        arcHeight={-60}
        strokeWidth={7}
      />

      {/* Wire 2: Red N to Green P */}
      <JumperWire
        start={{x: 960, y: 695}}
        end={{x: 1480, y: 425}}
        color="#F59E0B"
        startFrame={30}
        durationFrames={50}
        arcHeight={-40}
        strokeWidth={7}
      />
    </div>
  );
};
