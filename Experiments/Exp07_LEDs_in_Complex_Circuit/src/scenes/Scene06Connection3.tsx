import React from 'react';
import {Audio, staticFile, useCurrentFrame} from 'remotion';
import {EpodModule} from '../components/EpodModule';
import {JumperWire} from '../components/JumperWire';

export const Scene06Connection3: React.FC = () => {
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
      <Audio src={staticFile('audio/scene-06.mp3')} />

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
            color: '#334155',
            fontSize: 14,
            fontWeight: 800,
            padding: '6px 18px',
            borderRadius: 999,
            letterSpacing: 1.5,
            marginBottom: 8
          }}
        >
          CONNECTION 3 OF 4
        </div>
        <div
          style={{
            fontSize: 34,
            fontWeight: 900,
            color: '#0F172A'
          }}
        >
          LED – Red (N) → 3V Battery (N)
        </div>
      </div>

      <EpodModule
        cx={440}
        cy={560}
        type="battery"
        label="3V Battery ePod"
        highlightN={frame >= 40}
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
      />

      {/* Wire 1: Battery P to Red P */}
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
        startFrame={0}
        durationFrames={1}
        arcHeight={-40}
        strokeWidth={7}
      />

      {/* Wire 3: Red N to Battery N */}
      <JumperWire
        start={{x: 960, y: 695}}
        end={{x: 440, y: 695}}
        color="#1E293B"
        startFrame={30}
        durationFrames={50}
        arcHeight={50}
        strokeWidth={7}
      />
    </div>
  );
};
