import React from 'react';
import {Audio, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {EpodModule} from '../components/EpodModule';
import {JumperWire} from '../components/JumperWire';

export const Scene08BothOn: React.FC = () => {
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
            background: '#ECFDF5',
            color: '#059669',
            fontSize: 14,
            fontWeight: 800,
            padding: '6px 18px',
            borderRadius: 999,
            letterSpacing: 1.5,
            marginBottom: 8
          }}
        >
          CIRCUIT OUTPUT
        </div>
        <div
          style={{
            fontSize: 34,
            fontWeight: 900,
            color: '#0F172A'
          }}
        >
          Both LEDs Turn ON in Parallel!
        </div>
      </div>

      {/* Battery on left */}
      <EpodModule
        cx={480}
        cy={560}
        type="battery"
        label="3V Battery ePod"
      />

      {/* Red LED ON */}
      <EpodModule
        cx={1360}
        cy={390}
        type="led-red"
        label="LED – Red ePod"
        sublabel="Glowing Bright (3V)"
        ledOn={true}
      />

      {/* Green LED ON */}
      <EpodModule
        cx={1360}
        cy={730}
        type="led-green"
        label="LED – Green ePod"
        sublabel="Glowing Bright (3V)"
        ledOn={true}
      />

      {/* All 4 Wires Static */}
      <JumperWire
        start={{x: 480, y: 425}}
        end={{x: 1360, y: 255}}
        color="#EF4444"
        isStatic={true}
        arcHeight={-90}
        strokeWidth={7}
      />

      <JumperWire
        start={{x: 480, y: 425}}
        end={{x: 1360, y: 595}}
        color="#F97316"
        isStatic={true}
        arcHeight={-20}
        strokeWidth={7}
      />

      <JumperWire
        start={{x: 1360, y: 865}}
        end={{x: 480, y: 695}}
        color="#0F172A"
        isStatic={true}
        arcHeight={70}
        strokeWidth={7}
      />

      <JumperWire
        start={{x: 1360, y: 525}}
        end={{x: 480, y: 695}}
        color="#334155"
        isStatic={true}
        arcHeight={30}
        strokeWidth={7}
      />

      {/* Output Badge */}
      <div
        style={{
          position: 'absolute',
          top: 135,
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: badgeOpacity,
          display: 'flex',
          gap: 20,
          zIndex: 30
        }}
      >
        <div
          style={{
            background: '#FFFFFF',
            border: '2px solid #10B981',
            borderRadius: 16,
            padding: '12px 28px',
            boxShadow: '0 8px 24px rgba(16, 185, 129, 0.15)',
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
              background: '#10B981',
              boxShadow: '0 0 12px #10B981'
            }}
          />
          <span style={{fontSize: 18, fontWeight: 800, color: '#0F172A'}}>
            BOTH LEDs GLOW BRIGHTLY!
          </span>
          <span style={{fontSize: 14, fontWeight: 700, color: '#059669', marginLeft: 8}}>
            Full 3V available across both independent branches
          </span>
        </div>
      </div>
    </div>
  );
};
