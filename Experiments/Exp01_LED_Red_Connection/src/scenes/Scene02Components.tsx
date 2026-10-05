import React from 'react';
import {Audio, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {HeaderBanner} from '../components/Labels';

export const Scene02Components: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const c1Spring = spring({frame, fps, config: {damping: 14, stiffness: 120}});
  const c2Spring = spring({frame: frame - 25, fps, config: {damping: 14, stiffness: 120}});
  const c3Spring = spring({frame: frame - 50, fps, config: {damping: 14, stiffness: 120}});

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#F8FAFC',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}
    >
      <Audio src={staticFile('audio/scene-02.mp3')} />

      <HeaderBanner
        expNumber="EXPERIMENT 01"
        title="Required Components"
        subtitle="Source of truth: K2 Emico Circito Guidebook"
      />

      {/* Grid of components */}
      <div
        style={{
          position: 'absolute',
          top: 180,
          left: 100,
          right: 100,
          bottom: 80,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 60
        }}
      >
        {/* Component 1: 3V Battery ePod */}
        <div
          style={{
            transform: `scale(${Math.max(0, c1Spring)})`,
            background: '#FFFFFF',
            borderRadius: 24,
            padding: '24px 30px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0 12px 32px rgba(0,0,0,0.06)',
            border: '2px solid #E2E8F0',
            width: 320,
            height: 520
          }}
        >
          <div
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: '#1E293B',
              marginBottom: 16,
              textAlign: 'center'
            }}
          >
            3V Battery ePod
          </div>
          <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Img
              src={staticFile('assets/battery-epod.png')}
              style={{maxHeight: 340, maxWidth: 220, objectFit: 'contain'}}
            />
          </div>
          <div
            style={{
              background: '#EEF2FF',
              color: '#4338CA',
              fontSize: 14,
              fontWeight: 700,
              padding: '6px 16px',
              borderRadius: 20,
              marginTop: 10
            }}
          >
            Power Source (3 Volts)
          </div>
        </div>

        {/* Component 2: LED - Red ePod */}
        <div
          style={{
            transform: `scale(${Math.max(0, c2Spring)})`,
            background: '#FFFFFF',
            borderRadius: 24,
            padding: '24px 30px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0 12px 32px rgba(0,0,0,0.06)',
            border: '2px solid #E2E8F0',
            width: 320,
            height: 520
          }}
        >
          <div
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: '#1E293B',
              marginBottom: 16,
              textAlign: 'center'
            }}
          >
            LED – Red ePod
          </div>
          <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Img
              src={staticFile('assets/led-epod.png')}
              style={{maxHeight: 340, maxWidth: 220, objectFit: 'contain'}}
            />
          </div>
          <div
            style={{
              background: '#FEF2F2',
              color: '#B91C1C',
              fontSize: 14,
              fontWeight: 700,
              padding: '6px 16px',
              borderRadius: 20,
              marginTop: 10
            }}
          >
            Output Device (Light)
          </div>
        </div>

        {/* Component 3: 2x Jump Wires */}
        <div
          style={{
            transform: `scale(${Math.max(0, c3Spring)})`,
            background: '#FFFFFF',
            borderRadius: 24,
            padding: '24px 30px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0 12px 32px rgba(0,0,0,0.06)',
            border: '2px solid #E2E8F0',
            width: 320,
            height: 520
          }}
        >
          <div
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: '#1E293B',
              marginBottom: 16,
              textAlign: 'center'
            }}
          >
            2x Jump Wires
          </div>
          <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Img
              src={staticFile('assets/jumper-wires.png')}
              style={{maxHeight: 320, maxWidth: 240, objectFit: 'contain'}}
            />
          </div>
          <div
            style={{
              background: '#F1F5F9',
              color: '#334155',
              fontSize: 14,
              fontWeight: 700,
              padding: '6px 16px',
              borderRadius: 20,
              marginTop: 10
            }}
          >
            Red & Black Connectors
          </div>
        </div>
      </div>
    </div>
  );
};
