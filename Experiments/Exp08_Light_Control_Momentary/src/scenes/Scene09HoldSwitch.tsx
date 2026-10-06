import React from 'react';
import {Audio, staticFile} from 'remotion';
import {EpodModule} from '../components/EpodModule';
import {JumperWire} from '../components/JumperWire';

export const Scene09HoldSwitch: React.FC = () => {
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
      <Audio src={staticFile('audio/scene-09.mp3')} />

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
            background: '#EFF6FF',
            color: '#2563EB',
            fontSize: 14,
            fontWeight: 800,
            padding: '6px 18px',
            borderRadius: 999,
            letterSpacing: 1.5,
            marginBottom: 8
          }}
        >
          MAINTAINED STATE: HOLDING
        </div>
        <div
          style={{
            fontSize: 34,
            fontWeight: 900,
            color: '#0F172A'
          }}
        >
          Press & Hold → Continuous Current Flow
        </div>
      </div>

      <EpodModule
        cx={440}
        cy={560}
        type="battery"
        label="3V Battery ePod"
      />

      {/* Tact Switch held pressed */}
      <EpodModule
        cx={960}
        cy={560}
        type="tact-switch"
        label="Tact Switch ePod"
        switchPressed={true}
      />

      {/* Red LED continuously ON */}
      <EpodModule
        cx={1480}
        cy={560}
        type="led-red"
        label="LED – Red ePod"
        ledOn={true}
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

      {/* Bottom Hold Formula */}
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          left: 0,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          zIndex: 30
        }}
      >
        <div
          style={{
            background: '#FFFFFF',
            border: '2px solid #2563EB',
            borderRadius: 20,
            padding: '16px 36px',
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            boxShadow: '0 10px 30px rgba(37, 99, 235, 0.15)'
          }}
        >
          <div style={{fontWeight: 900, fontSize: 22, color: '#1D4ED8'}}>
            HOLDING SWITCH
          </div>
          <div style={{fontSize: 22, color: '#94A3B8'}}>→</div>
          <div style={{fontWeight: 900, fontSize: 22, color: '#0F172A'}}>
            CIRCUIT REMAINS CLOSED
          </div>
          <div style={{fontSize: 22, color: '#94A3B8'}}>→</div>
          <div style={{fontWeight: 900, fontSize: 22, color: '#DC2626'}}>
            LED STAYS ON
          </div>
        </div>
      </div>
    </div>
  );
};
