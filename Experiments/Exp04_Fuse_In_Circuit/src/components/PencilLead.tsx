import React from 'react';

export interface PencilLeadProps {
  x: number;
  y: number;
  broken?: boolean;
  crackProgress?: number; // 0 = intact, 1 = fully broken and separated
}

export const PencilLead: React.FC<PencilLeadProps> = ({
  x,
  y,
  broken = false,
  crackProgress = 0
}) => {
  const isBroken = broken || crackProgress >= 1;
  const progress = broken ? 1 : Math.max(0, Math.min(1, crackProgress));

  // Gap between the two broken pieces
  const gap = progress * 32;
  const tilt = progress * 4; // subtle tilt angle

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
        zIndex: 35,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      {/* Label above */}
      <div
        style={{
          marginBottom: 16,
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '4px 16px',
          borderRadius: 16,
          fontSize: 14,
          fontWeight: 800,
          color: isBroken ? '#B91C1C' : '#1E293B',
          border: `1.5px solid ${isBroken ? '#FCA5A5' : '#CBD5E1'}`,
          boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
          whiteSpace: 'nowrap'
        }}
      >
        {isBroken ? '⚠ PENCIL LEAD BROKEN (FUSE BLOWN)' : 'PENCIL LEAD (0.5 ~ 1 mm)'}
      </div>

      {/* Assembly: Left contact, lead body, right contact */}
      <div style={{position: 'relative', width: 220, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        {/* Left Metal Alligator/Socket Clip */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            width: 28,
            height: 20,
            background: 'linear-gradient(180deg, #94A3B8 0%, #475569 100%)',
            borderRadius: 4,
            border: '1.5px solid #334155',
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
            zIndex: 5
          }}
        />

        {/* Right Metal Alligator/Socket Clip */}
        <div
          style={{
            position: 'absolute',
            right: 0,
            width: 28,
            height: 20,
            background: 'linear-gradient(180deg, #94A3B8 0%, #475569 100%)',
            borderRadius: 4,
            border: '1.5px solid #334155',
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
            zIndex: 5
          }}
        />

        {/* The Graphite Rod */}
        {!isBroken && progress === 0 ? (
          /* Intact Lead */
          <div
            style={{
              width: 170,
              height: 8,
              borderRadius: 4,
              background: 'linear-gradient(180deg, #64748B 0%, #1E293B 50%, #0F172A 100%)',
              boxShadow: '0 3px 8px rgba(0,0,0,0.25), 0 0 1px rgba(255,255,255,0.4)',
              position: 'relative'
            }}
          >
            {/* Subtle graphite metallic sheen */}
            <div
              style={{
                position: 'absolute',
                top: 1,
                left: 10,
                right: 10,
                height: 2,
                background: 'rgba(255,255,255,0.4)',
                borderRadius: 1
              }}
            />
          </div>
        ) : (
          /* Broken Lead: Two Separated Pieces */
          <div style={{display: 'flex', alignItems: 'center', width: 170, justifyContent: 'center'}}>
            {/* Left half */}
            <div
              style={{
                width: 75,
                height: 8,
                background: 'linear-gradient(180deg, #64748B 0%, #1E293B 50%, #0F172A 100%)',
                borderRadius: '4px 0 0 4px',
                transform: `translateX(-${gap / 2}px) rotate(-${tilt}deg)`,
                boxShadow: '0 3px 8px rgba(0,0,0,0.25)'
              }}
            />

            {/* Fracture / Air Gap */}
            <div style={{width: gap, height: 8}} />

            {/* Right half */}
            <div
              style={{
                width: 75,
                height: 8,
                background: 'linear-gradient(180deg, #64748B 0%, #1E293B 50%, #0F172A 100%)',
                borderRadius: '0 4px 4px 0',
                transform: `translateX(${gap / 2}px) rotate(${tilt}deg)`,
                boxShadow: '0 3px 8px rgba(0,0,0,0.25)'
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
