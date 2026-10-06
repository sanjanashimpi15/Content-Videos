import React from 'react';
import {Audio, staticFile, useCurrentFrame} from 'remotion';
import {EpodModule} from '../components/EpodModule';
import {JumperWire} from '../components/JumperWire';

export const Scene07SwitchReleased: React.FC = () => {
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
            background: '#F1F5F9',
            color: '#475569',
            fontSize: 14,
            fontWeight: 800,
            padding: '6px 18px',
            borderRadius: 999,
            letterSpacing: 1.5,
            marginBottom: 8
          }}
        >
          INITIAL STATE: SWITCH RELEASED
        </div>
        <div
          style={{
            fontSize: 34,
            fontWeight: 900,
            color: '#0F172A'
          }}
        >
          Open Circuit — Current Cannot Flow
        </div>
      </div>

      <EpodModule
        cx={440}
        cy={560}
        type="battery"
        label="3V Battery ePod"
      />

      {/* Tact Switch released */}
      <EpodModule
        cx={960}
        cy={560}
        type="tact-switch"
        label="Tact Switch ePod"
        switchPressed={false}
      />

      {/* Red LED OFF */}
      <EpodModule
        cx={1480}
        cy={560}
        type="led-red"
        label="LED – Red ePod"
        ledOn={false}
      />

      {/* Wires */}
      <JumperWire
        start={{x: 440, y: 425}}
        end={{x: 960, y: 425}}
        color="#EF4444"
        startFrame={0}
        durationFrames={1}
        arcHeight={-60}
        strokeWidth={7}
      />
      <JumperWire
        start={{x: 960, y: 695}}
        end={{x: 1480, y: 425}}
        color="#6366F1"
        startFrame={0}
        durationFrames={1}
        arcHeight={-40}
        strokeWidth={7}
      />
      <JumperWire
        start={{x: 1480, y: 695}}
        end={{x: 440, y: 695}}
        color="#0F172A"
        startFrame={0}
        durationFrames={1}
        arcHeight={80}
        strokeWidth={7}
      />

      {/* Status Badge at Bottom */}
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
            background: '#F8FAFC',
            border: '2px solid #CBD5E1',
            borderRadius: 16,
            padding: '14px 28px',
            display: 'flex',
            alignItems: 'center',
            gap: 12
          }}
        >
          <div style={{width: 14, height: 14, borderRadius: '50%', background: '#94A3B8'}} />
          <span style={{fontWeight: 800, fontSize: 18, color: '#475569'}}>
            OPEN CIRCUIT: SWITCH NOT PRESSED
          </span>
        </div>

        <div
          style={{
            background: '#FEF2F2',
            border: '2px solid #F87171',
            borderRadius: 16,
            padding: '14px 28px',
            display: 'flex',
            alignItems: 'center',
            gap: 12
          }}
        >
          <div style={{width: 14, height: 14, borderRadius: '50%', background: '#EF4444'}} />
          <span style={{fontWeight: 800, fontSize: 18, color: '#991B1B'}}>
            LED STATUS: OFF
          </span>
        </div>
      </div>
    </div>
  );
};
