import React from 'react';
import {Audio, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {CircuitDiagramCard} from '../components/CircuitDiagramCard';
import {EpodModule} from '../components/EpodModule';

export const Scene04Positioning: React.FC = () => {
  const frame = useCurrentFrame();

  // Slide diagram off or scale to side after frame 180
  const diagramOpacity = interpolate(frame, [0, 20, 200, 240], [0, 1, 1, 0], {
    extrapolateRight: 'clamp'
  });

  const physicalOpacity = interpolate(frame, [180, 220], [0, 1], {
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
      <Audio src={staticFile('audio/scene-04.mp3')} />

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
          EXPERIMENT 05 SETUP
        </div>
        <div
          style={{
            fontSize: 34,
            fontWeight: 900,
            color: '#0F172A'
          }}
        >
          {frame < 210 ? 'Official Circuit Diagram' : 'Positioning ePods on Workbench'}
        </div>
      </div>

      {/* Center Circuit Diagram (First half) */}
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
            title="EXPERIMENT 05 CIRCUIT DIAGRAM"
            subtitle="LEDs in Series Connection"
            badge="SERIES PATH"
            style={{width: 620}}
          />
        </div>
      )}

      {/* Physical Components Positioned (Second half) */}
      <div style={{opacity: physicalOpacity}}>
        {/* Battery ePod on left */}
        <EpodModule
          cx={440}
          cy={560}
          type="battery"
          label="3V Battery ePod"
          sublabel="Power Source"
        />

        {/* LED Red in middle */}
        <EpodModule
          cx={960}
          cy={560}
          type="led-red"
          label="LED – Red ePod"
          sublabel="First LED in Line"
        />

        {/* LED Green on right */}
        <EpodModule
          cx={1480}
          cy={560}
          type="led-green"
          label="LED – Green ePod"
          sublabel="Second LED in Line"
        />
      </div>
    </div>
  );
};
