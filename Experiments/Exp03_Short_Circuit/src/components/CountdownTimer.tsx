import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';

export interface CountdownTimerProps {
  startFrame: number;
  durationInFrames?: number; // default ~200 frames for demonstration countdown
  x?: number;
  y?: number;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  startFrame,
  durationInFrames = 300,
  x = 960,
  y = 740
}) => {
  const frame = useCurrentFrame();

  const relFrame = Math.max(0, frame - startFrame);
  const remainingSec = Math.max(
    0,
    Math.ceil(20 - (relFrame / durationInFrames) * 20)
  );

  const pulse = interpolate(
    Math.sin((frame / 8) * Math.PI),
    [-1, 1],
    [0.96, 1.04]
  );

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${pulse})`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'rgba(254, 242, 242, 0.96)',
        backdropFilter: 'blur(8px)',
        border: '2px solid #EF4444',
        borderRadius: 20,
        padding: '16px 28px',
        boxShadow: '0 8px 30px rgba(239, 68, 68, 0.25)',
        zIndex: 40
      }}
    >
      <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: '50%',
            background: '#DC2626',
            boxShadow: '0 0 12px #DC2626'
          }}
        />
        <div style={{fontSize: 16, fontWeight: 900, color: '#B91C1C', letterSpacing: '0.08em', textTransform: 'uppercase'}}>
          20-Second Safety Limit
        </div>
      </div>

      <div style={{fontSize: 48, fontWeight: 900, color: '#991B1B', marginTop: 4, fontFamily: 'monospace'}}>
        {remainingSec < 10 ? `0${remainingSec}` : remainingSec}s
      </div>

      <div style={{fontSize: 13, fontWeight: 700, color: '#7F1D1D', marginTop: 4, textAlign: 'center'}}>
        Disconnect shorting jumper wire immediately after test
      </div>
    </div>
  );
};
