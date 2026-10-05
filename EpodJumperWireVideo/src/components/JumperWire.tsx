import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

export type BezierPoint = {x: number; y: number};

export type CubicSegment = {
  p0: BezierPoint;
  p1: BezierPoint;
  p2: BezierPoint;
  p3: BezierPoint;
};

export interface JumperWireProps {
  color?: string;
  segments?: CubicSegment[];
  startFrame: number;
  durationInFrames: number;
  strokeWidth?: number;
  connectorWidth?: number;
  connectorHeight?: number;
  showStartConnector?: boolean;
  showMovingConnector?: boolean;
  highlightOnConnect?: boolean;
}

// Evaluate cubic bezier at parameter u in [0, 1]
function evalCubic(p0: BezierPoint, p1: BezierPoint, p2: BezierPoint, p3: BezierPoint, u: number): BezierPoint {
  const v = 1 - u;
  const x = v * v * v * p0.x + 3 * v * v * u * p1.x + 3 * v * u * u * p2.x + u * u * u * p3.x;
  const y = v * v * v * p0.y + 3 * v * v * u * p1.y + 3 * v * u * u * p2.y + u * u * u * p3.y;
  return {x, y};
}

// Derivative (tangent) of cubic bezier
function evalCubicDerivative(p0: BezierPoint, p1: BezierPoint, p2: BezierPoint, p3: BezierPoint, u: number): BezierPoint {
  const v = 1 - u;
  const dx = 3 * v * v * (p1.x - p0.x) + 6 * v * u * (p2.x - p1.x) + 3 * u * u * (p3.x - p2.x);
  const dy = 3 * v * v * (p1.y - p0.y) + 6 * v * u * (p2.y - p1.y) + 3 * u * u * (p3.y - p2.y);
  return {x: dx, y: dy};
}

export const DEFAULT_SEGMENTS: CubicSegment[] = [
  {
    p0: {x: 580, y: 395},
    p1: {x: 520, y: 240},
    p2: {x: 740, y: 210},
    p3: {x: 960, y: 210}
  },
  {
    p0: {x: 960, y: 210},
    p1: {x: 1180, y: 210},
    p2: {x: 1400, y: 240},
    p3: {x: 1340, y: 395}
  }
];

export const JumperWire: React.FC<JumperWireProps> = ({
  color = '#E53935',
  segments = DEFAULT_SEGMENTS,
  startFrame,
  durationInFrames,
  strokeWidth = 11,
  connectorWidth = 22,
  connectorHeight = 44,
  showStartConnector = true,
  showMovingConnector = true,
  highlightOnConnect = true
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Progress of the wire drawing
  const rawProgress = durationInFrames <= 0
    ? 1
    : interpolate(frame, [startFrame, startFrame + durationInFrames], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp'
      });

  const isStarted = durationInFrames <= 0 ? true : frame >= startFrame;
  const isFinished = durationInFrames <= 0 ? true : frame >= startFrame + durationInFrames;

  // Path string for SVG
  const pathD = `M ${segments[0].p0.x} ${segments[0].p0.y} ` +
    segments.map(s => `C ${s.p1.x} ${s.p1.y}, ${s.p2.x} ${s.p2.y}, ${s.p3.x} ${s.p3.y}`).join(' ');

  // Compute tip position and tangent along the segments
  let tipPos = segments[0].p0;
  let tangent = {x: 0, y: -1};

  if (rawProgress <= 0) {
    tipPos = segments[0].p0;
    tangent = evalCubicDerivative(segments[0].p0, segments[0].p1, segments[0].p2, segments[0].p3, 0.01);
  } else if (rawProgress >= 1) {
    const lastSeg = segments[segments.length - 1];
    tipPos = lastSeg.p3;
    tangent = evalCubicDerivative(lastSeg.p0, lastSeg.p1, lastSeg.p2, lastSeg.p3, 0.99);
  } else {
    const totalSegs = segments.length;
    const segIndex = Math.min(Math.floor(rawProgress * totalSegs), totalSegs - 1);
    const u = (rawProgress * totalSegs) - segIndex;
    const currentSeg = segments[segIndex];
    tipPos = evalCubic(currentSeg.p0, currentSeg.p1, currentSeg.p2, currentSeg.p3, u);
    tangent = evalCubicDerivative(currentSeg.p0, currentSeg.p1, currentSeg.p2, currentSeg.p3, u);
  }

  // Smoothly blend angle towards vertical (0 deg) as it approaches the terminal (progress 0.85 -> 1.0)
  const rawAngle = Math.atan2(tangent.y, tangent.x) * (180 / Math.PI) + 90;
  const blendToVertical = interpolate(rawProgress, [0.85, 1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });
  const angle = (1 - blendToVertical) * rawAngle + blendToVertical * 0;

  // Settle spring for the destination connector
  const settleSpring = isFinished
    ? spring({
        frame: frame - (startFrame + durationInFrames),
        fps,
        config: {damping: 12, stiffness: 220, mass: 0.5}
      })
    : 0;

  // Small snap offset on arrival
  const settleScale = isFinished ? 1 + 0.12 * Math.sin(settleSpring * Math.PI) : 1;
  const settleY = isFinished ? (1 - settleSpring) * 6 : 0;

  // Terminal highlight ring after connection
  const highlightProgress = isFinished
    ? interpolate(frame - (startFrame + durationInFrames), [0, 15, 35], [0, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp'
      })
    : 0;

  return (
    <svg
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'visible',
        pointerEvents: 'none'
      }}
      viewBox="0 0 1920 1080"
    >
      <defs>
        {/* Soft drop shadow for physical wire feel */}
        <filter id="wire-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#000000" floodOpacity="0.22" />
        </filter>
        {/* Connector housing gradient */}
        <linearGradient id="connector-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1E1E1E" />
          <stop offset="50%" stopColor="#3C3C3C" />
          <stop offset="100%" stopColor="#181818" />
        </linearGradient>
      </defs>

      {/* Start connector firmly seated vertically at Battery P terminal */}
      {showStartConnector && (
        <g
          transform={`translate(${segments[0].p0.x}, ${segments[0].p0.y + 12})`}
          filter="url(#wire-shadow)"
        >
          {/* Rectangular housing */}
          <rect
            x={-connectorWidth / 2}
            y={-connectorHeight / 2}
            width={connectorWidth}
            height={connectorHeight}
            rx={4}
            fill="url(#connector-grad)"
            stroke="#111"
            strokeWidth={1.5}
          />
          {/* Silver contact slot indicator */}
          <rect
            x={-connectorWidth / 4}
            y={-connectorHeight / 4}
            width={connectorWidth / 2}
            height={4}
            rx={1}
            fill="#B0B0B0"
          />
          {/* Strain relief collar */}
          <rect
            x={-connectorWidth * 0.35}
            y={-connectorHeight / 2 - 4}
            width={connectorWidth * 0.7}
            height={4}
            rx={2}
            fill="#222"
          />
        </g>
      )}

      {/* The drawing wire */}
      {isStarted && (
        <path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1000}
          strokeDasharray={1000}
          strokeDashoffset={1000 * (1 - rawProgress)}
          filter="url(#wire-shadow)"
        />
      )}

      {/* Moving/Settling connector tip */}
      {showMovingConnector && isStarted && (
        <g
          transform={`translate(${tipPos.x}, ${tipPos.y + 12 + settleY}) rotate(${angle}) scale(${settleScale})`}
          filter="url(#wire-shadow)"
        >
          {/* Strain relief collar */}
          <rect
            x={-connectorWidth * 0.35}
            y={-connectorHeight / 2 - 4}
            width={connectorWidth * 0.7}
            height={4}
            rx={2}
            fill="#222"
          />
          {/* Rectangular housing */}
          <rect
            x={-connectorWidth / 2}
            y={-connectorHeight / 2}
            width={connectorWidth}
            height={connectorHeight}
            rx={4}
            fill="url(#connector-grad)"
            stroke="#111"
            strokeWidth={1.5}
          />
          {/* Silver contact slot */}
          <rect
            x={-connectorWidth / 4}
            y={-connectorHeight / 4}
            width={connectorWidth / 2}
            height={4}
            rx={1}
            fill="#B0B0B0"
          />
        </g>
      )}

      {/* Connection snap highlight effect */}
      {highlightOnConnect && isFinished && highlightProgress > 0 && (
        <g transform={`translate(${segments[segments.length - 1].p3.x}, ${segments[segments.length - 1].p3.y})`}>
          <circle
            r={18 + highlightProgress * 28}
            fill="none"
            stroke="#1E9E5A"
            strokeWidth={6 * (1 - highlightProgress)}
            opacity={highlightProgress * 0.9}
          />
          <circle
            r={10}
            fill="#1E9E5A"
            opacity={highlightProgress * 0.7}
          />
        </g>
      )}
    </svg>
  );
};
