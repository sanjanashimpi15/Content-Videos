import React from 'react';
import { Shaft } from './Shaft';

interface MotorProps {
  x?: number;
  y?: number;
  scale?: number;
  highlightShaft?: boolean;
  shaftInsertionProgress?: number; // 0 = bare, 1 = inserted
  showWires?: boolean;
  shaftVisible?: boolean;
}

export const Motor: React.FC<MotorProps> = ({
  x = 0,
  y = 0,
  scale = 1,
  highlightShaft = false,
  shaftInsertionProgress = 0,
  showWires = true,
  shaftVisible = true,
}) => {
  const motorDiameter = 280;
  const motorRadius = motorDiameter / 2;
  const bodyDepth = 95;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transformStyle: 'preserve-3d',
        pointerEvents: 'none',
        transform: `scale(${scale})`,
      }}
    >
      {/* 3D Drop Shadow on Table Floor */}
      <div
        style={{
          position: 'absolute',
          left: -motorRadius * 1.15,
          top: -motorRadius * 1.15,
          width: motorDiameter * 1.3,
          height: motorDiameter * 1.3,
          borderRadius: '50%',
          backgroundColor: 'rgba(15, 23, 42, 0.28)',
          filter: 'blur(24px)',
          transform: `translateZ(-${bodyDepth + 35}px)`,
        }}
      />

      {/* Back Base Plate of Motor at -bodyDepth */}
      <div
        style={{
          position: 'absolute',
          left: -motorRadius,
          top: -motorRadius,
          width: motorDiameter,
          height: motorDiameter,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #334155 0%, #0f172a 100%)',
          boxShadow: '0 0 20px rgba(0,0,0,0.6)',
          transform: `translateZ(-${bodyDepth}px)`,
        }}
      />

      {/* Cylindrical Side Can Depth Layers (creating true 3D solid depth volume) */}
      {[-15, -30, -45, -60, -75, -90].map((z) => (
        <div
          key={z}
          style={{
            position: 'absolute',
            left: -motorRadius,
            top: -motorRadius,
            width: motorDiameter,
            height: motorDiameter,
            borderRadius: '50%',
            border: '8px solid',
            borderColor: z % 30 === 0 ? '#475569' : '#64748b',
            background:
              'linear-gradient(135deg, #cbd5e1 0%, #94a3b8 40%, #64748b 70%, #334155 100%)',
            transform: `translateZ(${z}px)`,
            boxShadow: 'inset 0 0 12px rgba(0,0,0,0.4)',
          }}
        />
      ))}

      {/* Front Face Plate of DC Motor at translateZ(0) */}
      <div
        style={{
          position: 'absolute',
          left: -motorRadius,
          top: -motorRadius,
          width: motorDiameter,
          height: motorDiameter,
          borderRadius: '50%',
          background:
            'radial-gradient(circle at 45% 40%, #ffffff 0%, #f1f5f9 20%, #cbd5e1 55%, #94a3b8 80%, #64748b 100%)',
          boxShadow:
            'inset 0 4px 10px rgba(255,255,255,0.9), inset 0 -6px 14px rgba(0,0,0,0.4), 0 10px 20px rgba(0,0,0,0.3)',
          border: '2px solid #94A3B8',
          transform: 'translateZ(0px)',
        }}
      >
        {/* Subtle circular brushed-metal groove ring */}
        <div
          style={{
            position: 'absolute',
            left: '12%',
            top: '12%',
            width: '76%',
            height: '76%',
            borderRadius: '50%',
            border: '1.5px solid rgba(148, 163, 184, 0.6)',
            boxShadow: 'inset 0 0 8px rgba(0,0,0,0.15)',
          }}
        />

        {/* 6 Peripheral Ventilation Holes */}
        {[0, 60, 120, 180, 240, 300].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const r = motorRadius * 0.62;
          const hx = motorRadius + Math.cos(rad) * r;
          const hy = motorRadius + Math.sin(rad) * r;
          return (
            <div
              key={deg}
              style={{
                position: 'absolute',
                left: hx - 8,
                top: hy - 8,
                width: 16,
                height: 16,
                borderRadius: '50%',
                background: 'radial-gradient(circle at 65% 65%, #334155 0%, #020617 100%)',
                boxShadow:
                  'inset 1px 1px 3px rgba(0,0,0,0.9), 0 1px 1px rgba(255,255,255,0.7)',
              }}
            />
          );
        })}
      </div>

      {/* Red & Black Connection Wires emerging from side/back */}
      {showWires && (
        <svg
          style={{
            position: 'absolute',
            left: motorRadius - 30,
            top: -60,
            width: 240,
            height: 260,
            overflow: 'visible',
            transform: 'translateZ(-25px)',
            pointerEvents: 'none',
          }}
        >
          {/* Black Wire */}
          <path
            d="M 10 90 C 80 50, 160 80, 170 160 C 175 200, 130 230, 85 210"
            fill="none"
            stroke="#1E293B"
            strokeWidth={7}
            strokeLinecap="round"
          />
          {/* Red Wire */}
          <path
            d="M 10 75 C 75 35, 170 65, 185 150 C 192 195, 145 238, 95 225"
            fill="none"
            stroke="#EF4444"
            strokeWidth={7}
            strokeLinecap="round"
          />
          {/* 2-Pin Terminal Connector */}
          <rect
            x={80}
            y={210}
            width={34}
            height={22}
            rx={4}
            fill="#0F172A"
            stroke="#334155"
            strokeWidth={1.5}
          />
        </svg>
      )}

      {/* Central Motor Shaft protruding straight up along +Z axis */}
      {shaftVisible && (
        <Shaft
          diameter={18}
          totalLength={120}
          insertionProgress={shaftInsertionProgress}
          highlight={highlightShaft}
        />
      )}
    </div>
  );
};
