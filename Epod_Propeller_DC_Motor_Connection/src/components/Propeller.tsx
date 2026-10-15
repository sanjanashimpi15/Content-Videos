import React from 'react';
import { useCurrentFrame } from 'remotion';

interface PropellerProps {
  x?: number;
  y?: number;
  z?: number; // 3D depth along Z axis (shaft axis)
  scale?: number;
  rotation?: number; // degrees
  highlightHub?: boolean;
  showOpening?: boolean;
  opacity?: number;
}

export const Propeller: React.FC<PropellerProps> = ({
  x = 0,
  y = 0,
  z = 0,
  scale = 1,
  rotation = 0,
  highlightHub = false,
  showOpening = false,
  opacity = 1,
}) => {
  const frame = useCurrentFrame();
  const pulse = highlightHub ? 1 + Math.sin(frame * 0.25) * 0.08 : 1;
  const propSize = 340;
  const halfSize = propSize / 2;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transformStyle: 'preserve-3d',
        transform: `translateZ(${z}px) scale(${scale})`,
        pointerEvents: 'none',
        opacity,
      }}
    >
      {/* 3D Drop Shadow on motor face underneath */}
      <div
        style={{
          position: 'absolute',
          left: -halfSize,
          top: -halfSize,
          width: propSize,
          height: propSize,
          borderRadius: '50%',
          backgroundColor: 'rgba(2, 132, 199, 0.22)',
          filter: 'blur(16px)',
          transform: `translateZ(-${Math.max(6, z * 0.5)}px)`,
        }}
      />

      {/* Propeller Blade Assembly with Axial Rotation */}
      <div
        style={{
          position: 'absolute',
          left: -halfSize,
          top: -halfSize,
          width: propSize,
          height: propSize,
          transform: `rotate(${rotation}deg)`,
          transformOrigin: '50% 50%',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* SVG Drawing of 4 aerodynamic curved paddle blades */}
        <svg
          viewBox="-170 -170 340 340"
          style={{
            width: '100%',
            height: '100%',
            transform: 'translateZ(6px)',
            filter: 'drop-shadow(0 10px 18px rgba(2, 132, 199, 0.35))',
          }}
        >
          <defs>
            {/* Glossy Plastic Gradient for Blue Blades */}
            <linearGradient id="propBladeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="35%" stopColor="#0EA5E9" />
              <stop offset="80%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#0369A1" />
            </linearGradient>

            {/* Specular Plastic Highlight */}
            <linearGradient id="propGlossGrad" x1="0%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* 4 Blades rotated at 0, 90, 180, 270 degrees */}
          {[0, 90, 180, 270].map((bladeAngle) => (
            <g key={bladeAngle} transform={`rotate(${bladeAngle})`}>
              {/* Blade Body */}
              <path
                d="M -16 -30 
                   C -32 -60, -65 -105, -55 -135 
                   C -45 -162, 25 -165, 50 -140 
                   C 68 -120, 52 -75, 18 -30 
                   Z"
                fill="url(#propBladeGrad)"
                stroke="#0369A1"
                strokeWidth="1.5"
              />
              {/* Blade Curvature Highlight */}
              <path
                d="M -10 -40 
                   C -22 -65, -45 -100, -35 -125 
                   C -28 -140, 10 -142, 30 -125 
                   C 36 -115, 25 -80, 12 -40 
                   Z"
                fill="url(#propGlossGrad)"
                opacity="0.8"
              />
            </g>
          ))}
        </svg>

        {/* 3D Center Hub Cylinder Base (Receptive socket facing shaft) */}
        <div
          style={{
            position: 'absolute',
            left: halfSize - 38,
            top: halfSize - 38,
            width: 76,
            height: 76,
            borderRadius: '50%',
            background:
              'radial-gradient(circle at 35% 35%, #0284c7 0%, #0369a1 60%, #075985 100%)',
            boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
            transform: 'translateZ(0px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Shaft Receptive Bore / Opening on underside */}
          {showOpening && (
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: '50%',
                background:
                  'radial-gradient(circle at 50% 50%, #020617 0%, #0f172a 70%, #1e293b 100%)',
                border: '2px solid #38BDF8',
                boxShadow:
                  'inset 0 3px 6px rgba(0,0,0,0.9), 0 0 10px rgba(56, 189, 248, 0.7)',
                zIndex: 10,
              }}
            />
          )}
        </div>

        {/* 3D Center Hub Front Domed Cap */}
        <div
          style={{
            position: 'absolute',
            left: halfSize - 38,
            top: halfSize - 38,
            width: 76,
            height: 76,
            borderRadius: '50%',
            background:
              'radial-gradient(circle at 35% 32%, #e0f2fe 0%, #38bdf8 28%, #0284c7 65%, #075985 100%)',
            boxShadow:
              '0 8px 18px rgba(0,0,0,0.35), inset 0 2px 5px rgba(255,255,255,0.8), inset 0 -4px 8px rgba(0,0,0,0.4)',
            transform: 'translateZ(18px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 15,
          }}
        >
          {/* Specular Gloss Reflection on Dome */}
          <div
            style={{
              position: 'absolute',
              left: 20,
              top: 16,
              width: 15,
              height: 10,
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              filter: 'blur(1px)',
              transform: 'rotate(-30deg)',
            }}
          />

          {showOpening && (
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                background:
                  'radial-gradient(circle at 50% 50%, #020617 0%, #0f172a 70%, #1e293b 100%)',
                border: '2px solid #38BDF8',
                boxShadow:
                  'inset 0 3px 6px rgba(0,0,0,0.9), 0 0 10px rgba(56, 189, 248, 0.7)',
              }}
            />
          )}
        </div>
      </div>

      {/* Target Pulse on Center Hub */}
      {highlightHub && (
        <div
          style={{
            position: 'absolute',
            left: -55,
            top: -55,
            width: 110,
            height: 110,
            borderRadius: '50%',
            border: '3px dashed #0284C7',
            backgroundColor: 'rgba(2, 132, 199, 0.15)',
            boxShadow: '0 0 24px rgba(2, 132, 199, 0.5)',
            transform: `translateZ(24px) scale(${pulse})`,
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
};
