import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

export interface Point {
  x: number;
  y: number;
}

export interface JumperWireProps {
  start: Point;
  end: Point;
  color?: string; // '#EF4444' (red), '#F59E0B' (gold/yellow), '#0F172A' (black), '#3B82F6' (blue)
  wireColor?: string;
  startFrame?: number;
  durationFrames?: number;
  strokeWidth?: number;
  arcHeight?: number; // positive = curves downward, negative = curves upward
  curvature?: number;
  isStatic?: boolean; // if already connected in scene
  highlightEnd?: boolean;
  style?: React.CSSProperties;
}

export const JumperWire: React.FC<JumperWireProps> = ({
  start,
  end,
  color = '#EF4444',
  wireColor,
  startFrame = 0,
  durationFrames = 45,
  strokeWidth = 7,
  arcHeight = -90,
  isStatic = false,
  highlightEnd = true,
  style = {}
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const finalColor = wireColor || color;

  // Control points for cubic bezier arc
  const midX = (start.x + end.x) / 2;
  const midY = (start.y + end.y) / 2 + arcHeight;

  // Cubic bezier control points
  const cp1x = start.x + (midX - start.x) * 0.6;
  const cp1y = start.y + (midY - start.y) * 0.9;
  const cp2x = end.x + (midX - end.x) * 0.6;
  const cp2y = end.y + (midY - end.y) * 0.9;

  const pathD = `M ${start.x} ${start.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${end.x} ${end.y}`;

  // Approximate total curve length
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const straightDist = Math.sqrt(dx * dx + dy * dy);
  const approxLength = Math.max(100, straightDist + Math.abs(arcHeight) * 1.5);

  const localFrame = frame - startFrame;

  // Progress along the curve: 0 to 1
  let progress = 1;
  if (!isStatic) {
    if (localFrame < 0) {
      return null;
    }
    progress = interpolate(localFrame, [0, durationFrames], [0, 1], {
      extrapolateRight: 'clamp',
      extrapolateLeft: 'clamp'
    });
  }

  // Calculate tip position (cubic bezier formula)
  const t = progress;
  const invT = 1 - t;
  const tipX =
    invT * invT * invT * start.x +
    3 * invT * invT * t * cp1x +
    3 * invT * t * t * cp2x +
    t * t * t * end.x;
  const tipY =
    invT * invT * invT * start.y +
    3 * invT * invT * t * cp1y +
    3 * invT * t * t * cp2y +
    t * t * t * end.y;

  // Tangent for connector rotation
  const tangentX =
    3 * invT * invT * (cp1x - start.x) +
    6 * invT * t * (cp2x - cp1x) +
    3 * t * t * (end.x - cp2x);
  const tangentY =
    3 * invT * invT * (cp1y - start.y) +
    6 * invT * t * (cp2y - cp1y) +
    3 * t * t * (end.y - cp2y);
  const angle = Math.atan2(tangentY, tangentX) * (180 / Math.PI);

  // Snap spring at completion
  const settleSpring = isStatic
    ? 1
    : spring({
        frame: Math.max(0, localFrame - durationFrames),
        fps,
        config: {damping: 10, stiffness: 180}
      });

  const isConnected = isStatic || localFrame >= durationFrames;
  const strokeDashoffset = approxLength * (1 - progress);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        ...style
      }}
    >
      <svg
        style={{
          width: '100%',
          height: '100%',
          overflow: 'visible'
        }}
      >
        {/* Soft shadow for physical depth */}
        <path
          d={pathD}
          fill="none"
          stroke="rgba(15, 23, 42, 0.12)"
          strokeWidth={strokeWidth + 4}
          strokeLinecap="round"
          strokeDasharray={approxLength}
          strokeDashoffset={strokeDashoffset}
          transform="translate(0, 4)"
        />

        {/* Outer wire insulation */}
        <path
          d={pathD}
          fill="none"
          stroke={finalColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={approxLength}
          strokeDashoffset={strokeDashoffset}
        />

        {/* Center sheen for realistic 3D wire appearance */}
        <path
          d={pathD}
          fill="none"
          stroke="rgba(255, 255, 255, 0.45)"
          strokeWidth={Math.max(1.5, strokeWidth * 0.28)}
          strokeLinecap="round"
          strokeDasharray={approxLength}
          strokeDashoffset={strokeDashoffset}
        />

        {/* Start socket pin */}
        <circle cx={start.x} cy={start.y} r={strokeWidth * 0.85} fill="#0F172A" />
        <circle cx={start.x} cy={start.y} r={strokeWidth * 0.45} fill="#E2E8F0" />

        {/* Destination terminal snap highlight */}
        {isConnected && highlightEnd && (
          <g transform={`translate(${end.x}, ${end.y}) scale(${settleSpring})`}>
            <circle
              r={18}
              fill="none"
              stroke={finalColor}
              strokeWidth={3}
              opacity={0.8}
            />
            <circle
              r={10}
              fill={finalColor}
              opacity={0.3}
            />
          </g>
        )}

        {/* Moving DuPont Connector Plug */}
        {progress > 0 && progress < 1 && (
          <g transform={`translate(${tipX}, ${tipY}) rotate(${angle})`}>
            {/* Black plastic housing */}
            <rect
              x={-16}
              y={-7}
              width={20}
              height={14}
              rx={2}
              fill="#1E293B"
              stroke="#0F172A"
              strokeWidth={1.5}
            />
            {/* Metallic pin tip */}
            <rect
              x={4}
              y={-3}
              width={9}
              height={6}
              rx={1}
              fill="#CBD5E1"
              stroke="#94A3B8"
              strokeWidth={1}
            />
            {/* Grip ridges */}
            <line x1={-11} y1={-5} x2={-11} y2={5} stroke="#334155" strokeWidth={1.5} />
            <line x1={-6} y1={-5} x2={-6} y2={5} stroke="#334155" strokeWidth={1.5} />
          </g>
        )}

        {/* Fixed plugged-in connector at end when complete */}
        {isConnected && (
          <g transform={`translate(${end.x}, ${end.y}) scale(${settleSpring})`}>
            <circle cx={0} cy={0} r={strokeWidth * 0.9} fill="#0F172A" />
            <circle cx={0} cy={0} r={strokeWidth * 0.45} fill={finalColor} />
          </g>
        )}
      </svg>
    </div>
  );
};
