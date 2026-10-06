import React from 'react';
import {Audio, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {EpodModule} from '../components/EpodModule';
import {JumperWire} from '../components/JumperWire';

export const Scene08Result: React.FC = () => {
  const frame = useCurrentFrame();

  const badgeOpacity = interpolate(frame, [15, 30], [0, 1], {extrapolateRight: 'clamp'});

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
          CIRCUIT OBSERVATION
        </div>
        <div
          style={{
            fontSize: 34,
            fontWeight: 900,
            color: '#0F172A'
          }}
        >
          Do We See Any LED Glowing?
        </div>
      </div>

      {/* 3 ePods - BOTH LEDs ARE OFF */}
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
        sublabel="LED OFF (No Glow)"
        ledOn={false}
      />

      <EpodModule
        cx={1480}
        cy={560}
        type="led-green"
        label="LED – Green ePod"
        sublabel="LED OFF (No Glow)"
        ledOn={false}
      />

      {/* All 3 Jumper Wires Connected */}
      <JumperWire
        start={{x: 440, y: 425}}
        end={{x: 960, y: 425}}
        color="#EF4444"
        isStatic={true}
        arcHeight={-90}
        strokeWidth={7}
      />

      <JumperWire
        start={{x: 960, y: 695}}
        end={{x: 1480, y: 425}}
        color="#F59E0B"
        isStatic={true}
        arcHeight={30}
        strokeWidth={7}
      />

      <JumperWire
        start={{x: 1480, y: 695}}
        end={{x: 440, y: 695}}
        color="#0F172A"
        isStatic={true}
        arcHeight={120}
        strokeWidth={7}
      />

      {/* Result Indicator Badge Overlays */}
      <div
        style={{
          position: 'absolute',
          top: 150,
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: badgeOpacity,
          display: 'flex',
          gap: 24,
          zIndex: 30
        }}
      >
        <div
          style={{
            background: '#FFFFFF',
            border: '2px solid #EF4444',
            borderRadius: 16,
            padding: '12px 28px',
            boxShadow: '0 8px 24px rgba(239, 68, 68, 0.12)',
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
          <span style={{fontSize: 18, fontWeight: 800, color: '#0F172A'}}>
            NEITHER LED GLOWS!
          </span>
          <span style={{fontSize: 14, fontWeight: 700, color: '#EF4444', marginLeft: 8}}>
            Insufficient Voltage for Series LEDs
          </span>
        </div>
      </div>
    </div>
  );
};
