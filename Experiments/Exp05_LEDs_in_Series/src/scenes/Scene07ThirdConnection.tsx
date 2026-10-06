import React from 'react';
import {Audio, staticFile, useCurrentFrame} from 'remotion';
import {EpodModule} from '../components/EpodModule';
import {JumperWire} from '../components/JumperWire';

export const Scene07ThirdConnection: React.FC = () => {
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
      <Audio src={staticFile('audio/scene-07.mp3')} />

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
            background: '#E2E8F0',
            color: '#1E293B',
            fontSize: 14,
            fontWeight: 800,
            padding: '6px 18px',
            borderRadius: 999,
            letterSpacing: 1.5,
            marginBottom: 8
          }}
        >
          CONNECTION 3 OF 3 (CIRCUIT RETURN)
        </div>
        <div
          style={{
            fontSize: 34,
            fontWeight: 900,
            color: '#0F172A'
          }}
        >
          LED – Green (N) → 3V Battery (N)
        </div>
      </div>

      {/* 3 ePods */}
      <EpodModule
        cx={440}
        cy={560}
        type="battery"
        label="3V Battery ePod"
        highlightN={frame >= 50}
      />

      <EpodModule
        cx={960}
        cy={560}
        type="led-red"
        label="LED – Red ePod"
      />

      <EpodModule
        cx={1480}
        cy={560}
        type="led-green"
        label="LED – Green ePod"
        highlightN={frame < 80}
      />

      {/* Wire 1: Battery P -> Red LED P */}
      <JumperWire
        start={{x: 440, y: 425}}
        end={{x: 960, y: 425}}
        color="#EF4444"
        isStatic={true}
        arcHeight={-90}
        strokeWidth={7}
      />

      {/* Wire 2: Red LED N -> Green LED P */}
      <JumperWire
        start={{x: 960, y: 695}}
        end={{x: 1480, y: 425}}
        color="#F59E0B"
        isStatic={true}
        arcHeight={30}
        strokeWidth={7}
      />

      {/* Wire 3: Green LED N -> Battery N */}
      <JumperWire
        start={{x: 1480, y: 695}}
        end={{x: 440, y: 695}}
        color="#0F172A"
        startFrame={30}
        durationFrames={60}
        arcHeight={120}
        strokeWidth={7}
      />
    </div>
  );
};
