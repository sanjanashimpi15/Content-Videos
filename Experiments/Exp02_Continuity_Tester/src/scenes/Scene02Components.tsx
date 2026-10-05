import React from 'react';
import {Audio, Img, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {HeaderBanner} from '../components/Labels';

export const Scene02Components: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const c1 = spring({frame, fps, config: {damping: 14, stiffness: 120}});
  const c2 = spring({frame: frame - 20, fps, config: {damping: 14, stiffness: 120}});
  const c3 = spring({frame: frame - 40, fps, config: {damping: 14, stiffness: 120}});
  const c4 = spring({frame: frame - 60, fps, config: {damping: 14, stiffness: 120}});

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
        expNumber="EXPERIMENT 02"
        title="Required Components"
        subtitle="Source: K2 Emico Circito Guidebook"
      />

      <div
        style={{
          position: 'absolute',
          top: 180,
          left: 60,
          right: 60,
          bottom: 80,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 36
        }}
      >
        {/* Component 1: 3V Battery */}
        <div
          style={{
            transform: `scale(${Math.max(0, c1)})`,
            background: '#FFFFFF',
            borderRadius: 24,
            padding: '24px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0 12px 32px rgba(0,0,0,0.06)',
            border: '2px solid #E2E8F0',
            width: 260,
            height: 480
          }}
        >
          <div style={{fontSize: 18, fontWeight: 800, color: '#1E293B', marginBottom: 12}}>
            3V Battery ePod
          </div>
          <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Img src={staticFile('assets/battery-epod.png')} style={{maxHeight: 280, maxWidth: 190, objectFit: 'contain'}} />
          </div>
          <div style={{background: '#EEF2FF', color: '#4338CA', fontSize: 13, fontWeight: 700, padding: '4px 14px', borderRadius: 16}}>
            Power Supply
          </div>
        </div>

        {/* Component 2: LED - Red */}
        <div
          style={{
            transform: `scale(${Math.max(0, c2)})`,
            background: '#FFFFFF',
            borderRadius: 24,
            padding: '24px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0 12px 32px rgba(0,0,0,0.06)',
            border: '2px solid #E2E8F0',
            width: 260,
            height: 480
          }}
        >
          <div style={{fontSize: 18, fontWeight: 800, color: '#1E293B', marginBottom: 12}}>
            LED – Red ePod
          </div>
          <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Img src={staticFile('assets/led-epod.png')} style={{maxHeight: 280, maxWidth: 190, objectFit: 'contain'}} />
          </div>
          <div style={{background: '#FEF2F2', color: '#B91C1C', fontSize: 13, fontWeight: 700, padding: '4px 14px', borderRadius: 16}}>
            Continuity Indicator
          </div>
        </div>

        {/* Component 3: 3x Jump Wires */}
        <div
          style={{
            transform: `scale(${Math.max(0, c3)})`,
            background: '#FFFFFF',
            borderRadius: 24,
            padding: '24px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0 12px 32px rgba(0,0,0,0.06)',
            border: '2px solid #E2E8F0',
            width: 260,
            height: 480
          }}
        >
          <div style={{fontSize: 18, fontWeight: 800, color: '#1E293B', marginBottom: 12}}>
            3x Jump Wires
          </div>
          <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Img src={staticFile('assets/jumper-wires.png')} style={{maxHeight: 260, maxWidth: 200, objectFit: 'contain'}} />
          </div>
          <div style={{background: '#F1F5F9', color: '#334155', fontSize: 13, fontWeight: 700, padding: '4px 14px', borderRadius: 16}}>
            Flexible Connectors
          </div>
        </div>

        {/* Component 4: 2x 1-Strand Wires */}
        <div
          style={{
            transform: `scale(${Math.max(0, c4)})`,
            background: '#FFFFFF',
            borderRadius: 24,
            padding: '24px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0 12px 32px rgba(0,0,0,0.06)',
            border: '2px solid #E2E8F0',
            width: 260,
            height: 480
          }}
        >
          <div style={{fontSize: 18, fontWeight: 800, color: '#1E293B', marginBottom: 12, textAlign: 'center'}}>
            2x 1–Strand Wires
          </div>
          <div style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20}}>
            {/* Visual probe illustration */}
            <div style={{width: 140, height: 12, background: '#1E293B', borderRadius: 6, position: 'relative'}}>
              <div style={{position: 'absolute', right: -16, top: 2, width: 18, height: 8, background: '#D97706', borderRadius: '0 4px 4px 0'}} />
            </div>
            <div style={{width: 140, height: 12, background: '#1D4ED8', borderRadius: 6, position: 'relative'}}>
              <div style={{position: 'absolute', right: -16, top: 2, width: 18, height: 8, background: '#D97706', borderRadius: '0 4px 4px 0'}} />
            </div>
          </div>
          <div style={{background: '#ECFDF5', color: '#047857', fontSize: 13, fontWeight: 700, padding: '4px 14px', borderRadius: 16}}>
            Open Test Terminals
          </div>
        </div>
      </div>
    </div>
  );
};
