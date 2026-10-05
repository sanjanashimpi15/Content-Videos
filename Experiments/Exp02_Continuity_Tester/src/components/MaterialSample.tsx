import React from 'react';

export type MaterialType = 'steel-ring' | 'paper' | 'plastic-box';

export interface MaterialSampleProps {
  type: MaterialType;
  x: number;
  y: number;
  width?: number;
  height?: number;
  label?: string;
  isConductor?: boolean;
}

export const MaterialSample: React.FC<MaterialSampleProps> = ({
  type,
  x,
  y,
  width = 240,
  height = 160,
  label,
  isConductor
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 20
      }}
    >
      {/* Label and Badge */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: 12
        }}
      >
        <span
          style={{
            fontSize: 16,
            fontWeight: 800,
            color: '#1E293B',
            background: 'rgba(255, 255, 255, 0.95)',
            padding: '4px 14px',
            borderRadius: 16,
            boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
            border: '1px solid #E2E8F0'
          }}
        >
          {label || (type === 'steel-ring' ? 'Steel Ring' : type === 'paper' ? 'Piece of Paper' : 'Plastic Box')}
        </span>
        {isConductor !== undefined && (
          <span
            style={{
              fontSize: 12,
              fontWeight: 800,
              padding: '3px 10px',
              borderRadius: 12,
              background: isConductor ? '#DCFCE7' : '#FEE2E2',
              color: isConductor ? '#15803D' : '#B91C1C',
              border: `1px solid ${isConductor ? '#86EFAC' : '#FCA5A5'}`
            }}
          >
            {isConductor ? 'Good Conductor' : 'Insulator'}
          </span>
        )}
      </div>

      {/* Visual Representation */}
      {type === 'steel-ring' && (
        <div
          style={{
            width: 140,
            height: 140,
            borderRadius: '50%',
            background: 'radial-gradient(circle, #F8FAFC 35%, #94A3B8 60%, #475569 85%, #CBD5E1 100%)',
            boxShadow: '0 10px 25px rgba(0,0,0,0.25), inset 0 2px 6px rgba(255,255,255,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '3px solid #64748B'
          }}
        >
          <div
            style={{
              width: 70,
              height: 70,
              borderRadius: '50%',
              background: '#F8FAFC',
              boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.3)',
              border: '2px solid #64748B'
            }}
          />
        </div>
      )}

      {type === 'paper' && (
        <div
          style={{
            width: 180,
            height: 120,
            background: '#FFFFFF',
            borderRadius: 8,
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            border: '1px solid #E2E8F0',
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 12
          }}
        >
          <div style={{height: 4, background: '#E2E8F0', borderRadius: 2, width: '80%'}} />
          <div style={{height: 4, background: '#E2E8F0', borderRadius: 2, width: '95%'}} />
          <div style={{height: 4, background: '#E2E8F0', borderRadius: 2, width: '60%'}} />
          <div style={{height: 4, background: '#E2E8F0', borderRadius: 2, width: '85%'}} />
        </div>
      )}

      {type === 'plastic-box' && (
        <div
          style={{
            width: 180,
            height: 120,
            background: 'linear-gradient(135deg, rgba(186, 230, 253, 0.7) 0%, rgba(125, 211, 252, 0.4) 100%)',
            backdropFilter: 'blur(4px)',
            borderRadius: 14,
            boxShadow: '0 10px 25px rgba(0,0,0,0.12), inset 0 0 0 2px rgba(255,255,255,0.6)',
            border: '2px solid #38BDF8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0369A1',
            fontWeight: 800,
            fontSize: 14
          }}
        >
          Acrylic / Plastic Box
        </div>
      )}
    </div>
  );
};
