import React from 'react';
import { useCurrentFrame } from 'remotion';

interface ShaftProps {
  diameter?: number;
  totalLength?: number;
  insertionProgress?: number; // 0 = fully bare, 1 = fully inside hub
  highlight?: boolean;
}

export const Shaft: React.FC<ShaftProps> = ({
  diameter = 18,
  totalLength = 120,
  insertionProgress = 0,
  highlight = false,
}) => {
  const frame = useCurrentFrame();

  // Exposed length between motor face and propeller hub
  const exposedLength = totalLength * (1 - insertionProgress * 0.94);
  const pulse = highlight ? 1 + Math.sin(frame * 0.25) * 0.1 : 1;

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        transformStyle: 'preserve-3d',
        pointerEvents: 'none',
      }}
    >
      {/* Brass Bushing Base at Motor Face */}
      <div
        style={{
          position: 'absolute',
          left: -22,
          top: -22,
          width: 44,
          height: 44,
          borderRadius: '50%',
          background:
            'radial-gradient(circle at 35% 35%, #fef3c7 0%, #f59e0b 45%, #b45309 85%, #78350f 100%)',
          boxShadow: '0 0 10px rgba(0,0,0,0.5)',
          transform: 'translateZ(2px)',
        }}
      />

      {/* 3D Cylindrical Shaft Body (rendered via dual perpendicular metallic planes for authentic 3D lighting) */}
      <div
        style={{
          position: 'absolute',
          left: -diameter / 2,
          top: -diameter / 2,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Plane A: X-Z Plane */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: diameter,
            height: exposedLength,
            transformOrigin: 'bottom center',
            transform: 'rotateX(-90deg)',
            background:
              'linear-gradient(90deg, #334155 0%, #64748b 18%, #cbd5e1 38%, #ffffff 52%, #94a3b8 78%, #475569 100%)',
            boxShadow: highlight
              ? '0 0 20px rgba(2, 132, 199, 0.9), 0 0 35px rgba(56, 189, 248, 0.6)'
              : 'inset 0 0 4px rgba(0,0,0,0.4)',
          }}
        />

        {/* Plane B: Y-Z Plane (perpendicular cross plane for true depth volume) */}
        <div
          style={{
            position: 'absolute',
            left: (diameter - 2) / 2,
            bottom: 0,
            width: 2,
            height: exposedLength,
            transformOrigin: 'bottom center',
            transform: 'rotateX(-90deg) rotateY(90deg)',
            background:
              'linear-gradient(90deg, #475569 0%, #e2e8f0 50%, #334155 100%)',
          }}
        />

        {/* Shaft Tip (Chamfered Top End-Cap at the exposed tip) */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: diameter,
            height: diameter,
            borderRadius: '50%',
            background:
              'radial-gradient(circle at 40% 40%, #ffffff 0%, #cbd5e1 50%, #64748b 100%)',
            transform: `translateZ(${exposedLength}px)`,
            boxShadow: '0 0 4px rgba(0,0,0,0.4)',
          }}
        />

        {/* Highlight Target Ring at Shaft Tip */}
        {highlight && (
          <div
            style={{
              position: 'absolute',
              left: -12,
              top: -12,
              width: diameter + 24,
              height: diameter + 24,
              borderRadius: '50%',
              border: '2.5px solid #0284C7',
              backgroundColor: 'rgba(2, 132, 199, 0.2)',
              boxShadow: '0 0 16px #0284C7',
              transform: `translateZ(${exposedLength + 2}px) scale(${pulse})`,
              pointerEvents: 'none',
            }}
          />
        )}
      </div>
    </div>
  );
};
