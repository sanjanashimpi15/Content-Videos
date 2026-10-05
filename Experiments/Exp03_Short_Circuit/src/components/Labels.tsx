import React from 'react';

export interface HeaderBannerProps {
  expNumber: string;
  title: string;
  subtitle?: string;
  category?: string;
}

export const HeaderBanner: React.FC<HeaderBannerProps> = ({
  expNumber,
  title,
  subtitle,
  category = 'K2 EMICO CIRCUITO'
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 36,
        left: 48,
        right: 48,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 28px',
        background: 'rgba(255, 255, 255, 0.94)',
        backdropFilter: 'blur(10px)',
        borderRadius: 18,
        border: '1px solid rgba(224, 224, 224, 0.9)',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.06)',
        zIndex: 40
      }}
    >
      <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
        <div
          style={{
            background: 'linear-gradient(135deg, #1A237E 0%, #283593 100%)',
            color: '#FFFFFF',
            fontWeight: 900,
            fontSize: 18,
            letterSpacing: '0.08em',
            padding: '8px 18px',
            borderRadius: 12,
            boxShadow: '0 4px 12px rgba(26, 35, 126, 0.25)'
          }}
        >
          {expNumber}
        </div>
        <div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: '#111827',
              letterSpacing: '-0.02em',
              lineHeight: 1.1
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div style={{fontSize: 14, color: '#6B7280', fontWeight: 600, marginTop: 3}}>
              {subtitle}
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          fontSize: 13,
          fontWeight: 800,
          color: '#4B5563',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          padding: '6px 14px',
          background: '#F3F4F6',
          borderRadius: 8
        }}
      >
        {category}
      </div>
    </div>
  );
};

export interface InfoCardProps {
  title: string;
  items: string[];
  x?: number;
  y?: number;
  width?: number;
  accentColor?: string;
  isStatic?: boolean;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  title,
  items,
  x = 60,
  y = 160,
  width = 380,
  accentColor = '#1A237E',
  isStatic = false
}) => {
  return (
    <div
      style={{
        position: isStatic ? 'relative' : 'absolute',
        left: isStatic ? undefined : x,
        top: isStatic ? undefined : y,
        width,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: 16,
        padding: '20px 24px',
        border: '1px solid rgba(229, 231, 235, 0.9)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
        zIndex: 40
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: 14,
          borderBottom: `2px solid ${accentColor}`,
          paddingBottom: 8
        }}
      >
        <div style={{width: 8, height: 8, borderRadius: '50%', background: accentColor}} />
        <div
          style={{
            fontSize: 17,
            fontWeight: 800,
            color: '#111827',
            letterSpacing: '0.02em',
            textTransform: 'uppercase'
          }}
        >
          {title}
        </div>
      </div>
      <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
        {items.map((item, idx) => (
          <div key={idx} style={{display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 15, color: '#374151', lineHeight: 1.4, fontWeight: 500}}>
            <span style={{color: accentColor, fontWeight: 800}}>•</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export interface StatusBadgeProps {
  status: 'OPEN CIRCUIT' | 'CLOSED CIRCUIT' | 'SHORT CIRCUIT' | 'CIRCUIT COMPLETE' | 'FUSE BLOWN';
  state: 'active' | 'warning' | 'error' | 'success';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({status, state}) => {
  const colors = {
    active: {bg: '#E8F5E9', border: '#4CAF50', text: '#1B5E20'},
    success: {bg: '#E3F2FD', border: '#2196F3', text: '#0D47A1'},
    warning: {bg: '#FFF8E1', border: '#FFC107', text: '#FF6F00'},
    error: {bg: '#FFEBEE', border: '#F44336', text: '#B71C1C'}
  }[state];

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 40,
        left: '50%',
        transform: 'translateX(-50%)',
        background: colors.bg,
        border: `2px solid ${colors.border}`,
        color: colors.text,
        fontSize: 18,
        fontWeight: 900,
        letterSpacing: '0.08em',
        padding: '10px 28px',
        borderRadius: 30,
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)',
        zIndex: 40,
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }}
    >
      <div
        style={{
          width: 12,
          height: 12,
          borderRadius: '50%',
          background: colors.border,
          boxShadow: `0 0 10px ${colors.border}`
        }}
      />
      <span>{status}</span>
    </div>
  );
};
