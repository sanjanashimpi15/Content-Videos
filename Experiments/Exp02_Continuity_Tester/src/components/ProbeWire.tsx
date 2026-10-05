import React from 'react';

export interface ProbeWireProps {
  startPoint: {x: number; y: number};
  tipPoint: {x: number; y: number};
  controlPoint?: {x: number; y: number};
  color?: string;
  strokeWidth?: number;
  highlightTip?: boolean;
}

export const ProbeWire: React.FC<ProbeWireProps> = ({
  startPoint,
  tipPoint,
  controlPoint,
  color = '#1E293B',
  strokeWidth = 6,
  highlightTip = false
}) => {
  // Default control point creates a gentle natural curve
  const cp = controlPoint || {
    x: (startPoint.x + tipPoint.x) / 2,
    y: Math.max(startPoint.y, tipPoint.y) + 80
  };

  const pathD = `M ${startPoint.x} ${startPoint.y} Q ${cp.x} ${cp.y} ${tipPoint.x} ${tipPoint.y}`;

  return (
    <div style={{position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 35}}>
      <svg
        style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'visible'}}
        viewBox="0 0 1920 1080"
      >
        <defs>
          <filter id="probe-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="rgba(0,0,0,0.2)" />
          </filter>
        </defs>

        {/* Shadow */}
        <path
          d={pathD}
          fill="none"
          stroke="rgba(0,0,0,0.15)"
          strokeWidth={strokeWidth + 2}
          strokeLinecap="round"
          transform="translate(0, 4)"
        />

        {/* Insulated Wire Body */}
        <path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          filter="url(#probe-shadow)"
        />

        {/* Start socket pin connector */}
        <circle cx={startPoint.x} cy={startPoint.y} r={7} fill="#111" stroke="#555" strokeWidth={1.5} />

        {/* Exposed Copper Tip */}
        <g transform={`translate(${tipPoint.x}, ${tipPoint.y})`}>
          {/* Exposed bare wire */}
          <circle cx={0} cy={0} r={5} fill="#D97706" stroke="#B45309" strokeWidth={1.5} />
          <circle cx={0} cy={0} r={2} fill="#FDE68A" />

          {/* Spark/glow if highlighted */}
          {highlightTip && (
            <>
              <circle cx={0} cy={0} r={14} fill="none" stroke="#10B981" strokeWidth={3} opacity={0.8} />
              <circle cx={0} cy={0} r={22} fill="none" stroke="#10B981" strokeWidth={1.5} opacity={0.4} />
            </>
          )}
        </g>
      </svg>
    </div>
  );
};
