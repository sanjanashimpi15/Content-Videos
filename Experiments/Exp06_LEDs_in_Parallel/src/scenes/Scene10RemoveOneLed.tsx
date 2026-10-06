import React from 'react';
import {Audio, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {EpodModule} from '../components/EpodModule';
import {JumperWire} from '../components/JumperWire';

export const Scene10RemoveOneLed: React.FC = () => {
  const frame = useCurrentFrame();

  // Green LED wire disconnects after frame 60
  const isDisconnected = frame >= 80;

  const wire2Opacity = interpolate(frame, [60, 80], [1, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp'
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
      <Audio src={staticFile('audio/scene-10.mp3')} />

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
          WORKBOOK OBSERVATION
        </div>
        <div
          style={{
            fontSize: 34,
            fontWeight: 900,
            color: '#0F172A'
          }}
        >
          Disconnecting One LED Branch
        </div>
      </div>

      <EpodModule
        cx={480}
        cy={560}
        type="battery"
        label="3V Battery ePod"
      />

      {/* Red LED remains ON */}
      <EpodModule
        cx={1360}
        cy={390}
        type="led-red"
        label="LED – Red ePod"
        sublabel="STILL GLOWING BRIGHT!"
        ledOn={true}
      />

      {/* Green LED turns OFF when disconnected */}
      <EpodModule
        cx={1360}
        cy={730}
        type="led-green"
        label="LED – Green ePod"
        sublabel={isDisconnected ? "Disconnected (OFF)" : "Connected"}
        ledOn={!isDisconnected}
      />

      {/* Wire 1: Battery P -> Red LED P (Intact) */}
      <JumperWire
        start={{x: 480, y: 425}}
        end={{x: 1360, y: 255}}
        color="#EF4444"
        isStatic={true}
        arcHeight={-90}
        strokeWidth={7}
      />

      {/* Wire 2: Disconnecting from Green LED P */}
      {wire2Opacity > 0 && (
        <div style={{opacity: wire2Opacity}}>
          <JumperWire
            start={{x: 480, y: 425}}
            end={{x: 1360, y: 595}}
            color="#F97316"
            isStatic={true}
            arcHeight={-20}
            strokeWidth={7}
          />
        </div>
      )}

      {/* Wire 3: Green LED N -> Battery N */}
      <JumperWire
        start={{x: 1360, y: 865}}
        end={{x: 480, y: 695}}
        color="#0F172A"
        isStatic={true}
        arcHeight={70}
        strokeWidth={7}
      />

      {/* Wire 4: Red LED N -> Battery N (Intact) */}
      <JumperWire
        start={{x: 1360, y: 525}}
        end={{x: 480, y: 695}}
        color="#334155"
        isStatic={true}
        arcHeight={30}
        strokeWidth={7}
      />

      {/* Lesson Banner */}
      <div
        style={{
          position: 'absolute',
          top: 135,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 20,
          zIndex: 30
        }}
      >
        <div
          style={{
            background: '#FFFFFF',
            border: '2px solid #3B82F6',
            borderRadius: 16,
            padding: '12px 28px',
            boxShadow: '0 8px 24px rgba(59, 130, 246, 0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: 12
          }}
        >
          <span style={{fontSize: 18, fontWeight: 800, color: '#0F172A'}}>
            OTHER PATH REMAINS INTACT!
          </span>
          <span style={{fontSize: 14, fontWeight: 700, color: '#2563EB', marginLeft: 8}}>
            Red LED continues to glow brightly with full current
          </span>
        </div>
      </div>
    </div>
  );
};
