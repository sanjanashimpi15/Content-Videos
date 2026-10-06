import React from 'react';
import {Audio, staticFile, useCurrentFrame} from 'remotion';
import {EpodModule} from '../components/EpodModule';
import {JumperWire} from '../components/JumperWire';

export const Scene07Connection4: React.FC = () => {
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
          CONNECTION 4 OF 4 (UPPER RETURN)
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
        cx={480}
        cy={560}
        type="battery"
        label="3V Battery ePod"
        highlightN={frame >= 40}
      />

      <EpodModule
        cx={1360}
        cy={390}
        type="led-red"
        label="LED – Red ePod"
        highlightN={frame < 80}
      />

      <EpodModule
        cx={1360}
        cy={730}
        type="led-green"
        label="LED – Green ePod"
      />

      {/* Wire 1: Battery P -> Red LED P (Static) */}
      <JumperWire
        start={{x: 480, y: 425}}
        end={{x: 1360, y: 255}}
        color="#EF4444"
        isStatic={true}
        arcHeight={-90}
        strokeWidth={7}
      />

      {/* Wire 2: Battery P -> Green LED P (Static) */}
      <JumperWire
        start={{x: 480, y: 425}}
        end={{x: 1360, y: 595}}
        color="#F97316"
        isStatic={true}
        arcHeight={-20}
        strokeWidth={7}
      />

      {/* Wire 3: Green LED N -> Battery N (Static) */}
      <JumperWire
        start={{x: 1360, y: 865}}
        end={{x: 480, y: 695}}
        color="#0F172A"
        isStatic={true}
        arcHeight={70}
        strokeWidth={7}
      />

      {/* Wire 4: Red LED N -> Battery N (Connecting now) */}
      <JumperWire
        start={{x: 1360, y: 525}}
        end={{x: 480, y: 695}}
        color="#334155"
        startFrame={30}
        durationFrames={50}
        arcHeight={30}
        strokeWidth={7}
      />
    </div>
  );
};
