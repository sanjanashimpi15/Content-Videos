import React from 'react';
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Motor } from './Motor';
import { Propeller } from './Propeller';

export interface PropellerInsertionProps {
  startFrame?: number;
  durationInFrames?: number;
  motorX?: number;
  motorY?: number;
  scale?: number;
  rotateX?: number;
  rotateZ?: number;
  startRotation?: number;
  endRotation?: number;
  showGuides?: boolean;
}

export const PropellerInsertion: React.FC<PropellerInsertionProps> = ({
  startFrame = 0,
  durationInFrames = 220,
  motorX = 960,
  motorY = 560,
  scale = 1.2,
  rotateX = 54,
  rotateZ = -12,
  startRotation = 18,
  endRotation = 0,
  showGuides = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const relFrame = Math.max(0, frame - startFrame);

  // Shaft base is at Z = 2px, Shaft tip is at Z = 122px
  const shaftTipZ = 122;
  const initialZ = 280; // High hover position
  const seatedZ = 12;   // Flush against motor collar

  // 1. Approach Phase (frames 0 -> 40): Propeller lowers from 280 to 134 (hovering 12px above shaft tip)
  const approachZ = interpolate(relFrame, [0, 40], [initialZ, shaftTipZ + 12], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // 2. Alignment Check Phase (frames 40 -> 65): Hub pauses right above shaft tip
  const isEngaging = relFrame >= 40 && relFrame < 65;

  // 3. Sliding Phase (frames 65 -> 155): Propeller hub slides continuously down over the shaft
  const slideZ = interpolate(relFrame, [65, 155], [shaftTipZ + 12, seatedZ], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.quad),
  });

  const baseZ = relFrame < 65 ? approachZ : slideZ;

  // 4. Mechanical Settle Spring at frame 155 (firm friction fit bounce)
  const settleSpring = spring({
    frame: relFrame - 155,
    fps,
    config: { damping: 14, stiffness: 220, mass: 0.6 },
  });
  const settleOffset = relFrame >= 155 ? (1 - settleSpring) * 3 : 0;
  const currentZ = baseZ + settleOffset;

  // Rotation: starts at startRotation and aligns to endRotation by frame 50
  const currentRotation = interpolate(
    relFrame,
    [0, 50],
    [startRotation, endRotation],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.ease),
    }
  );

  // Insertion progress (0 to 1): how much of the shaft has entered inside the hub
  const insertionProgress = interpolate(relFrame, [65, 155], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Guide overlay opacity
  const guideOpacity = interpolate(relFrame, [10, 35, 110, 140], [0, 0.9, 0.9, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        perspective: 1200,
        perspectiveOrigin: '50% 50%',
        pointerEvents: 'none',
      }}
    >
      {/* 3D Angled Assembly Container */}
      <div
        style={{
          position: 'absolute',
          left: motorX,
          top: motorY,
          transformStyle: 'preserve-3d',
          transform: `scale(${scale}) rotateX(${rotateX}deg) rotateZ(${rotateZ}deg)`,
        }}
      >
        {/* 3D Motor Body & Shaft */}
        <Motor
          shaftInsertionProgress={insertionProgress}
          shaftVisible={true}
          highlightShaft={relFrame < 65}
        />

        {/* 3D Blue Propeller moving along Z shaft axis */}
        <Propeller
          z={currentZ}
          rotation={currentRotation}
          showOpening={relFrame < 130}
          highlightHub={relFrame < 65}
        />
      </div>

      {/* 2D STEM Alignment Guide Overlay */}
      {showGuides && (
        <svg
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 45,
            opacity: guideOpacity,
          }}
        >
          {/* Insertion Path Indicator Arrow */}
          {relFrame > 25 && relFrame < 145 && (
            <g transform={`translate(${motorX + 180}, ${motorY - 60})`}>
              <line
                x1={0}
                y1={-40}
                x2={0}
                y2={40}
                stroke="#0284C7"
                strokeWidth={3.5}
                strokeLinecap="round"
              />
              <polygon points="0,52 -8,36 8,36" fill="#0284C7" />
              <rect
                x={18}
                y={-14}
                width={160}
                height={28}
                rx={6}
                fill="#0F172A"
              />
              <text
                x={28}
                y={5}
                fill="#38BDF8"
                fontSize={12}
                fontWeight={800}
                letterSpacing={0.8}
              >
                SLIDING ONTO SHAFT
              </text>
            </g>
          )}
        </svg>
      )}

      {/* Engagement Alert Pill */}
      {isEngaging && (
        <div
          style={{
            position: 'absolute',
            left: motorX - 140,
            top: motorY - 180,
            backgroundColor: '#0F172A',
            color: '#38BDF8',
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: 1,
            padding: '6px 16px',
            borderRadius: 20,
            boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
            border: '1.5px solid #0284C7',
            zIndex: 60,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: '#10B981',
              boxShadow: '0 0 8px #10B981',
            }}
          />
          HUB ALIGNED WITH SHAFT TIP
        </div>
      )}
    </div>
  );
};
