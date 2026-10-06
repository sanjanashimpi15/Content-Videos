import React from 'react';
import {Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

export interface CircuitDiagramCardProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  isStatic?: boolean;
  style?: React.CSSProperties;
}

export const CircuitDiagramCard: React.FC<CircuitDiagramCardProps> = ({
  title = "OFFICIAL CIRCUIT DIAGRAM",
  subtitle = "K2 Circito Guidebook — Experiment 07",
  badge = "COMPLEX CIRCUIT",
  isStatic = false,
  style = {}
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const scale = isStatic
    ? 1
    : spring({
        frame,
        fps,
        config: {damping: 14, stiffness: 100}
      });

  const opacity = isStatic ? 1 : interpolate(frame, [0, 15], [0, 1], {extrapolateRight: 'clamp'});

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: '#FFFFFF',
        borderRadius: 24,
        padding: '24px 32px 32px 32px',
        boxShadow: '0 20px 45px rgba(15, 23, 42, 0.1)',
        border: '1.5px solid #E2E8F0',
        transform: `scale(${scale})`,
        opacity,
        maxWidth: 680,
        ...style
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          marginBottom: 16
        }}
      >
        <div>
          <div
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: '#0F172A',
              letterSpacing: 1.2,
              fontFamily: 'Inter, system-ui, sans-serif'
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 13,
              color: '#64748B',
              marginTop: 2,
              fontFamily: 'Inter, system-ui, sans-serif'
            }}
          >
            {subtitle}
          </div>
        </div>
        <div
          style={{
            background: '#FDF4FF',
            color: '#C026D3',
            padding: '6px 14px',
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 0.8,
            fontFamily: 'Inter, system-ui, sans-serif'
          }}
        >
          {badge}
        </div>
      </div>

      <div
        style={{
          width: '100%',
          borderRadius: 16,
          overflow: 'hidden',
          background: '#F8FAFC',
          border: '1px solid #E2E8F0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 16
        }}
      >
        <Img
          src={staticFile('assets/circuit-diagram.png')}
          style={{
            maxWidth: '100%',
            maxHeight: 380,
            objectFit: 'contain'
          }}
        />
      </div>
    </div>
  );
};
