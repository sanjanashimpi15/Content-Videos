import React from 'react';
import {Audio, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {EpodModule} from '../components/EpodModule';
import {JumperWire} from '../components/JumperWire';

export const Scene08PressSwitch: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const pressStart = 45;
  const isPressed = frame >= pressStart;

  // Visual finger or pointer tap indicator moving down onto the switch
  const pointerY = interpolate(frame, [25, 45], [-60, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });
  const pointerOpacity = interpolate(frame, [15, 30, 120, 140], [0, 1, 1, 0], {
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
          ACTION: PRESSING SWITCH
        </div>
        <div
          style={{
            fontSize: 34,
            fontWeight: 900,
            color: '#0F172A'
          }}
        >
          {isPressed ? 'Switch Closed — Circuit Complete!' : 'Pressing the Tact Switch...'}
        </div>
      </div>

      <EpodModule
        cx={440}
        cy={560}
        type="battery"
        label="3V Battery ePod"
      />

      {/* Tact Switch ePod with animated press state */}
      <EpodModule
        cx={960}
        cy={560}
        type="tact-switch"
        label="Tact Switch ePod"
        switchPressed={isPressed}
      />

      {/* Pointer/Finger graphic pressing down on switch button */}
      {pointerOpacity > 0 && (
        <div
          style={{
            position: 'absolute',
            left: 960,
            top: 560 + pointerY,
            transform: 'translate(-50%, -100%)',
            opacity: pointerOpacity,
            zIndex: 40,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pointerEvents: 'none'
          }}
        >
          <div
            style={{
              background: '#3B82F6',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: 13,
              padding: '4px 12px',
              borderRadius: 999,
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
              marginBottom: 8
            }}
          >
            PRESS ↓
          </div>
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: '#2563EB',
              border: '3px solid #FFFFFF',
              boxShadow: '0 0 12px rgba(37, 99, 235, 0.6)'
            }}
          />
        </div>
      )}

      {/* Red LED ePod turns ON when switch is pressed */}
      <EpodModule
        cx={1480}
        cy={560}
        type="led-red"
        label="LED – Red ePod"
        ledOn={isPressed}
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

      {/* Dynamic Status Callout */}
      {isPressed && (
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
              background: '#EFF6FF',
              border: '2px solid #3B82F6',
              borderRadius: 16,
              padding: '14px 28px',
              display: 'flex',
              alignItems: 'center',
              gap: 12
            }}
          >
            <div style={{width: 14, height: 14, borderRadius: '50%', background: '#3B82F6'}} />
            <span style={{fontWeight: 800, fontSize: 18, color: '#1D4ED8'}}>
              SWITCH PRESSED: CONTACTS CONNECTED
            </span>
          </div>

          <div
            style={{
              background: '#FEF2F2',
              border: '2px solid #EF4444',
              borderRadius: 16,
              padding: '14px 28px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              boxShadow: '0 8px 24px rgba(239, 68, 68, 0.2)'
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
              CLOSED CIRCUIT: LED GLOWS ON!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
