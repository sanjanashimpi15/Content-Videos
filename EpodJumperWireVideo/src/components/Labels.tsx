import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';

export const COLORS = {
  navy: '#12263A',
  amber: '#F5A300',
  grey: '#4A5B6C',
  green: '#1E9E5A',
  white: '#FFFFFF',
  soft: '#EAF0F6',
  darkText: '#1A2938'
};

export const FONT = "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

export interface TitleBadgeProps {
  title: string;
  subtitle?: string;
  badge?: string;
  top?: number;
  opacity?: number;
}

export const TitleBadge: React.FC<TitleBadgeProps> = ({
  title,
  subtitle,
  badge,
  top = 50,
  opacity = 1
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        top,
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity,
        fontFamily: FONT,
        pointerEvents: 'none'
      }}
    >
      {badge && (
        <div
          style={{
            backgroundColor: '#EEF3F8',
            color: COLORS.grey,
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: 'uppercase',
            padding: '5px 16px',
            borderRadius: 20,
            marginBottom: 10,
            border: '1px solid #D5E0EB'
          }}
        >
          {badge}
        </div>
      )}
      <div
        style={{
          fontSize: 42,
          fontWeight: 800,
          color: COLORS.navy,
          letterSpacing: -0.5,
          textAlign: 'center'
        }}
      >
        {title}
      </div>
      {subtitle && (
        <div
          style={{
            fontSize: 22,
            fontWeight: 500,
            color: COLORS.grey,
            marginTop: 6,
            textAlign: 'center'
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
};

export interface StatusBadgeProps {
  text: string;
  variant?: 'green' | 'amber' | 'navy';
  style?: React.CSSProperties;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  text,
  variant = 'green',
  style = {}
}) => {
  const bg = variant === 'green' ? COLORS.green : variant === 'amber' ? COLORS.amber : COLORS.navy;
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        padding: '12px 28px',
        backgroundColor: bg,
        color: COLORS.white,
        borderRadius: 30,
        fontFamily: FONT,
        fontSize: 22,
        fontWeight: 700,
        letterSpacing: 1.5,
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        ...style
      }}
    >
      {variant === 'green' && (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
      <span>{text}</span>
    </div>
  );
};

export interface TerminalCalloutProps {
  label: string;
  sub: string;
  x: number;
  y: number;
  anchor: 'top' | 'bottom' | 'left' | 'right';
  opacity?: number;
}

export const TerminalCallout: React.FC<TerminalCalloutProps> = ({
  label,
  sub,
  x,
  y,
  anchor,
  opacity = 1
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        opacity,
        fontFamily: FONT,
        pointerEvents: 'none'
      }}
    >
      <div
        style={{
          backgroundColor: COLORS.navy,
          color: COLORS.white,
          padding: '8px 16px',
          borderRadius: 8,
          fontSize: 18,
          fontWeight: 700,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: 6
        }}
      >
        <span style={{color: COLORS.amber}}>{label}</span>
        <span style={{fontSize: 14, color: '#C9D6E3', fontWeight: 500}}>({sub})</span>
      </div>
    </div>
  );
};
