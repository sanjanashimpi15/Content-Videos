import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

export interface ComponentCardProps {
  name: string;
  count?: string;
  detail?: string;
  delay?: number;
  color?: string;
  style?: React.CSSProperties;
}

export const ComponentCard: React.FC<ComponentCardProps> = ({
  name,
  count = "1x",
  detail,
  delay = 0,
  color = "#3B82F6",
  style = {}
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const adjustedFrame = Math.max(0, frame - delay);
  const scale = spring({
    frame: adjustedFrame,
    fps,
    config: {damping: 14, stiffness: 120}
  });
  const opacity = interpolate(adjustedFrame, [0, 10], [0, 1], {extrapolateRight: 'clamp'});

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        background: '#FFFFFF',
        borderRadius: 16,
        padding: '16px 24px',
        boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)',
        border: '1.5px solid #E2E8F0',
        transform: `scale(${scale})`,
        opacity,
        minWidth: 260,
        ...style
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          background: `${color}15`,
          border: `2px solid ${color}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 18,
          fontWeight: 800,
          color,
          fontFamily: 'Inter, system-ui, sans-serif',
          marginRight: 16
        }}
      >
        {count}
      </div>
      <div>
        <div
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: '#0F172A',
            fontFamily: 'Inter, system-ui, sans-serif'
          }}
        >
          {name}
        </div>
        {detail && (
          <div
            style={{
              fontSize: 13,
              color: '#64748B',
              marginTop: 2,
              fontFamily: 'Inter, system-ui, sans-serif'
            }}
          >
            {detail}
          </div>
        )}
      </div>
    </div>
  );
};

export interface TerminalBadgeProps {
  label: 'P' | 'N' | 'A' | 'B';
  type?: 'positive' | 'negative' | 'neutral';
  highlight?: boolean;
  style?: React.CSSProperties;
}

export const TerminalBadge: React.FC<TerminalBadgeProps> = ({
  label,
  type = label === 'P' ? 'positive' : label === 'N' ? 'negative' : 'neutral',
  highlight = false,
  style = {}
}) => {
  const frame = useCurrentFrame();

  const isPositive = type === 'positive';
  const isNegative = type === 'negative';

  const baseBg = isPositive ? '#EF4444' : isNegative ? '#0F172A' : '#3B82F6';
  const textColor = '#FFFFFF';

  const pulse = highlight
    ? interpolate(Math.sin((frame / 8) * Math.PI), [-1, 1], [1, 1.25])
    : 1;

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 38,
        height: 38,
        borderRadius: '50%',
        background: baseBg,
        color: textColor,
        fontWeight: 800,
        fontSize: 18,
        fontFamily: 'Inter, system-ui, sans-serif',
        boxShadow: highlight
          ? `0 0 25px ${baseBg}, 0 4px 12px rgba(0,0,0,0.2)`
          : '0 4px 10px rgba(0,0,0,0.15)',
        transform: `scale(${pulse})`,
        border: '2.5px solid #FFFFFF',
        ...style
      }}
    >
      {label}
    </div>
  );
};

export interface InfoCardProps {
  title: string;
  points: string[];
  badge?: string;
  style?: React.CSSProperties;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  title,
  points,
  badge = "KEY LESSON",
  style = {}
}) => {
  return (
    <div
      style={{
        background: '#FFFFFF',
        borderRadius: 24,
        padding: '28px 36px',
        boxShadow: '0 20px 45px rgba(15, 23, 42, 0.1)',
        border: '1.5px solid #E2E8F0',
        ...style
      }}
    >
      <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18}}>
        <div
          style={{
            background: '#FDF4FF',
            color: '#C026D3',
            fontSize: 12,
            fontWeight: 800,
            padding: '4px 12px',
            borderRadius: 999,
            letterSpacing: 0.8
          }}
        >
          {badge}
        </div>
        <div
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: '#0F172A',
            fontFamily: 'Inter, system-ui, sans-serif'
          }}
        >
          {title}
        </div>
      </div>

      <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
        {points.map((pt, i) => (
          <div key={i} style={{display: 'flex', alignItems: 'flex-start', gap: 12}}>
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: '50%',
                background: '#FDF4FF',
                color: '#C026D3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                fontWeight: 800,
                flexShrink: 0,
                marginTop: 2
              }}
            >
              {i + 1}
            </div>
            <div
              style={{
                fontSize: 16,
                lineHeight: 1.5,
                color: '#334155',
                fontFamily: 'Inter, system-ui, sans-serif'
              }}
            >
              {pt}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
