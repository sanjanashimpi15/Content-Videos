import React from 'react';
import {Audio, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {EpodModule} from '../components/EpodModule';
import {JumperWire} from '../components/JumperWire';

export const Scene08Output: React.FC = () => {
  const frame = useCurrentFrame();

  const redLedOn = frame >= 30;
  const redBrightness = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

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
      <Audio src={staticFile('audio/scene-08.mp3')} />

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
            background: '#FDF4FF',
            color: '#C026D3',
            fontSize: 14,
            fontWeight: 800,
            padding: '6px 18px',
            borderRadius: 999,
            letterSpacing: 1.5,
            marginBottom: 8
          }}
        >
          EXPERIMENT RESULT
        </div>
        <div
          style={{
            fontSize: 34,
            fontWeight: 900,
            color: '#0F172A'
          }}
        >
          Red LED Glows Bright — Green LED Stays OFF
        </div>
      </div>

      <EpodModule
        cx={440}
        cy={560}
        type="battery"
        label="3V Battery ePod"
      />

      {/* Red LED ePod with bright glow */}
      <EpodModule
        cx={960}
        cy={560}
        type="led-red"
        label="LED – Red ePod"
        ledOn={redLedOn}
      />

      {/* Green LED ePod stays OFF */}
      <EpodModule
        cx={1480}
        cy={560}
        type="led-green"
        label="LED – Green ePod"
        ledOn={false}
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
        startFrame={0}
        durationFrames={1}
        arcHeight={50}
        strokeWidth={7}
      />

      {/* Wire 4: Battery N to Green N */}
      <JumperWire
        start={{x: 440, y: 695}}
        end={{x: 1480, y: 695}}
        color="#059669"
        startFrame={0}
        durationFrames={1}
        arcHeight={90}
        strokeWidth={7}
      />

      {/* Status Callout Cards at Bottom */}
      {frame >= 40 && (
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            left: 0,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            gap: 32,
            zIndex: 30
          }}
        >
          <div
            style={{
              background: '#FEF2F2',
              border: '2px solid #EF4444',
              borderRadius: 16,
              padding: '14px 28px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              boxShadow: '0 8px 24px rgba(239, 68, 68, 0.15)'
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: '50%',
                background: '#EF4444',
                boxShadow: '0 0 10px #EF4444'
              }}
            />
            <span style={{fontWeight: 800, fontSize: 18, color: '#991B1B'}}>
              LED – Red: GLOWS BRIGHT
            </span>
          </div>

          <div
            style={{
              background: '#F1F5F9',
              border: '2px solid #94A3B8',
              borderRadius: 16,
              padding: '14px 28px',
              display: 'flex',
              alignItems: 'center',
              gap: 12
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: '50%',
                background: '#94A3B8'
              }}
            />
            <span style={{fontWeight: 800, fontSize: 18, color: '#475569'}}>
              LED – Green: DOES NOT GLOW (OFF)
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
