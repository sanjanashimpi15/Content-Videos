import React from 'react';
import {Audio, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {CircuitDiagramCard} from '../components/CircuitDiagramCard';
import {EpodModule} from '../components/EpodModule';

export const Scene03Positioning: React.FC = () => {
  const frame = useCurrentFrame();

  const diagramOpacity = interpolate(frame, [0, 20, 240, 280], [0, 1, 1, 0], {
    extrapolateRight: 'clamp'
  });

  const physicalOpacity = interpolate(frame, [230, 270], [0, 1], {
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
      <Audio src={staticFile('audio/scene-03.mp3')} />

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
            background: '#EEF2FF',
            color: '#4F46E5',
            fontSize: 14,
            fontWeight: 800,
            padding: '6px 18px',
            borderRadius: 999,
            letterSpacing: 1.5,
            marginBottom: 8
          }}
        >
          EXPERIMENT 08 SETUP
        </div>
        <div
          style={{
            fontSize: 34,
            fontWeight: 900,
            color: '#0F172A'
          }}
        >
          {frame < 250 ? 'Official Circuit Diagram' : 'Positioning ePod Modules'}
        </div>
      </div>

      {diagramOpacity > 0 && (
        <div
          style={{
            position: 'absolute',
            top: '55%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: diagramOpacity,
            zIndex: 10
          }}
        >
          <CircuitDiagramCard
            title="EXPERIMENT 08 CIRCUIT DIAGRAM"
            subtitle="Light Control – Momentary (Tact Switch)"
            badge="MOMENTARY CONTROL"
            style={{width: 620}}
          />
        </div>
      )}

      <div style={{opacity: physicalOpacity}}>
        {/* Battery ePod on left */}
        <EpodModule
          cx={440}
          cy={560}
          type="battery"
          label="3V Battery ePod"
          sublabel="Power Source"
        />

        {/* Tact Switch in middle */}
        <EpodModule
          cx={960}
          cy={560}
          type="tact-switch"
          label="Tact Switch ePod"
          sublabel="Input Control (A & B)"
        />

        {/* LED Red on right */}
        <EpodModule
          cx={1480}
          cy={560}
          type="led-red"
          label="LED – Red ePod"
          sublabel="Output Indicator"
        />
      </div>
    </div>
  );
};
