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

// Tangent of cubic bezier
function evalCubicDerivative(p0: BezierPoint, p1: BezierPoint, p2: BezierPoint, p3: BezierPoint, u: number): BezierPoint {
  const v = 1 - u;
  const dx = 3 * v * v * (p1.x - p0.x) + 6 * v * u * (p2.x - p1.x) + 3 * u * u * (p3.x - p2.x);
  const dy = 3 * v * v * (p1.y - p0.y) + 6 * v * u * (p2.y - p1.y) + 3 * u * u * (p3.y - p2.y);
  return {x: dx, y: dy};
}

export const JumperWire: React.FC<JumperWireProps> = ({
  color = '#E53935',
  segments = [],
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

  if (!segments || segments.length === 0) return null;

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
    const d = evalCubicDerivative(segments[0].p0, segments[0].p1, segments[0].p2, segments[0].p3, 0);
    tangent = d;
  } else if (rawProgress >= 1) {
    const lastSeg = segments[segments.length - 1];
    tipPos = lastSeg.p3;
    const d = evalCubicDerivative(lastSeg.p0, lastSeg.p1, lastSeg.p2, lastSeg.p3, 1);
    tangent = d;
  } else {
    const segCount = segments.length;
    const scaledU = rawProgress * segCount;
    const segIdx = Math.min(Math.floor(scaledU), segCount - 1);
    const localU = scaledU - segIdx;
    const seg = segments[segIdx];
    tipPos = evalCubic(seg.p0, seg.p1, seg.p2, seg.p3, localU);
    tangent = evalCubicDerivative(seg.p0, seg.p1, seg.p2, seg.p3, localU);
  }

  const tipAngleRad = Math.atan2(tangent.y, tangent.x);
  const tipAngleDeg = (tipAngleRad * 180) / Math.PI + 90; // connector vertical aligned

  // Spring snap when connection lands
  const snap = isFinished
    ? spring({
        frame: frame - (startFrame + Math.max(1, durationInFrames)),
        fps,
        config: {damping: 12, stiffness: 220, mass: 0.8}
      })
    : 0;

  const tipScale = isFinished ? 1 + snap * 0.15 : 1;

  // Highlight effect at the destination terminal
  const highlightOpacity = isFinished && highlightOnConnect
    ? interpolate(
        frame - (startFrame + durationInFrames),
        [0, 10, 25, 40],
        [0, 0.9, 0.5, 0.2],
        {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
      )
    : 0;

  const totalLength = 1600; // ample for dasharray
  const dashoffset = totalLength * (1 - rawProgress);

  const startPt = segments[0].p0;
  const endPt = segments[segments.length - 1].p3;

  if (!isStarted) return null;

  return (
    <div style={{position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 30}}>
      <svg
        style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'visible'}}
        viewBox="0 0 1920 1080"
      >
        <defs>
          <filter id={`wire-shadow-${color.replace('#', '')}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="rgba(0,0,0,0.28)" />
          </filter>
        </defs>

        {/* Wire shadow */}
        <path
          d={pathD}
          fill="none"
          stroke="rgba(0,0,0,0.18)"
          strokeWidth={strokeWidth + 4}
          strokeLinecap="round"
          strokeDasharray={totalLength}
          strokeDashoffset={dashoffset}
          transform="translate(0, 5)"
        />

        {/* Wire main body */}
        <path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={totalLength}
          strokeDashoffset={dashoffset}
          filter={`url(#wire-shadow-${color.replace('#', '')})`}
        />

        {/* Wire highlight core */}
        <path
          d={pathD}
          fill="none"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth={Math.max(2, strokeWidth * 0.28)}
          strokeLinecap="round"
          strokeDasharray={totalLength}
          strokeDashoffset={dashoffset}
        />

        {/* Start connector housing */}
        {showStartConnector && (
          <g transform={`translate(${startPt.x}, ${startPt.y})`}>
            <rect
              x={-connectorWidth / 2}
              y={-connectorHeight / 2}
              width={connectorWidth}
              height={connectorHeight}
              rx={4}
              fill="#212121"
              stroke="#424242"
              strokeWidth={1.5}
            />
            {/* Color collar indicator */}
            <rect
              x={-connectorWidth / 2}
              y={-connectorHeight / 2}
              width={connectorWidth}
              height={8}
              rx={2}
              fill={color}
            />
            <rect
              x={-connectorWidth / 4}
              y={-connectorHeight / 4}
              width={connectorWidth / 2}
              height={connectorHeight / 2}
              fill="#111111"
              rx={2}
            />
          </g>
        )}

        {/* Traveling moving connector tip */}
        {showMovingConnector && (
          <g
            transform={`translate(${tipPos.x}, ${tipPos.y}) rotate(${tipAngleDeg}) scale(${tipScale})`}
          >
            <rect
              x={-connectorWidth / 2}
              y={-connectorHeight / 2}
              width={connectorWidth}
              height={connectorHeight}
              rx={4}
              fill="#1E1E1E"
              stroke="#555"
              strokeWidth={1.5}
              filter="drop-shadow(0 4px 6px rgba(0,0,0,0.4))"
            />
            {/* Collar */}
            <rect
              x={-connectorWidth / 2}
              y={-connectorHeight / 2}
              width={connectorWidth}
              height={8}
              rx={2}
              fill={color}
            />
            {/* Contact slot */}
            <rect
              x={-connectorWidth / 4}
              y={connectorHeight / 2 - 12}
              width={connectorWidth / 2}
              height={10}
              rx={1}
              fill="#BDBDBD"
            />
          </g>
        )}

        {/* Terminal highlight ring on arrival */}
        {highlightOpacity > 0 && (
          <g transform={`translate(${endPt.x}, ${endPt.y})`}>
            <circle
              r={24}
              fill="none"
              stroke="#00E676"
              strokeWidth={4}
              opacity={highlightOpacity}
            />
            <circle
              r={36}
              fill="none"
              stroke="#00E676"
              strokeWidth={2}
              opacity={highlightOpacity * 0.6}
            />
            <circle
              r={12}
              fill="#00E676"
              opacity={highlightOpacity * 0.4}
            />
          </g>
        )}
      </svg>
    </div>
  );
};
