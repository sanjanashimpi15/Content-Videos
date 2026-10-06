import React from 'react';
import {Audio, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {CircuitDiagramCard} from '../components/CircuitDiagramCard';
import {EpodModule} from '../components/EpodModule';

export const Scene03Positioning: React.FC = () => {
  const frame = useCurrentFrame();

  const diagramOpacity = interpolate(frame, [0, 20, 180, 220], [0, 1, 1, 0], {
    extrapolateRight: 'clamp'
  });

  const physicalOpacity = interpolate(frame, [170, 210], [0, 1], {
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
          EXPERIMENT 06 SETUP
        </div>
        <div
          style={{
            fontSize: 34,
            fontWeight: 900,
            color: '#0F172A'
          }}
        >
          {frame < 190 ? 'Official Circuit Diagram' : 'Parallel Branch Layout'}
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
            title="EXPERIMENT 06 CIRCUIT DIAGRAM"
            subtitle="LEDs in Parallel Connection"
            badge="PARALLEL PATHS"
            style={{width: 620}}
          />
        </div>
      )}

      <div style={{opacity: physicalOpacity}}>
        {/* Battery ePod on left */}
        <EpodModule
          cx={480}
          cy={560}
          type="battery"
          label="3V Battery ePod"
          sublabel="Power Source"
        />

        {/* LED Red on upper branch */}
        <EpodModule
          cx={1360}
          cy={390}
          type="led-red"
          label="LED – Red ePod"
          sublabel="Upper Branch"
        />

        {/* LED Green on lower branch */}
        <EpodModule
          cx={1360}
          cy={730}
          type="led-green"
          label="LED – Green ePod"
          sublabel="Lower Branch"
        />
      </div>
    </div>
  );
};
