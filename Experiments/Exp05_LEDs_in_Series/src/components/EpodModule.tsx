import React from 'react';
import {Epod, EpodType} from './Epod';
import {TerminalBadge} from './Labels';

export interface EpodModuleProps {
  cx: number;
  cy: number;
  type: EpodType;
  label: string;
  highlightP?: boolean;
  highlightN?: boolean;
  highlightTerminal?: 'P' | 'N' | 'both' | null;
  reversed?: boolean;
  ledOn?: boolean;
  scale?: number;
  rotation?: number;
  sublabel?: string;
  style?: React.CSSProperties;
}

export const EpodModule: React.FC<EpodModuleProps> = ({
  cx,
  cy,
  type,
  label,
  highlightP = false,
  highlightN = false,
  highlightTerminal = null,
  reversed = false,
  ledOn = false,
  scale = 1.15,
  rotation = 90,
  sublabel,
  style = {}
}) => {
  const isBattery = type === 'battery';
  const isGreen = type === 'led-green';
  const isRed = type === 'led-red';

  const pHigh = highlightP || highlightTerminal === 'P' || highlightTerminal === 'both';
  const nHigh = highlightN || highlightTerminal === 'N' || highlightTerminal === 'both';

  // Sockets are at y = cy - 135 (top) and y = cy + 135 (bottom)
  const topTerminalLabel = reversed ? 'N' : 'P';
  const bottomTerminalLabel = reversed ? 'P' : 'N';

  const badgeColor = isBattery ? '#2563EB' : isGreen ? '#059669' : '#DC2626';

  return (
    <div
      style={{
        position: 'absolute',
        left: cx,
        top: cy,
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        ...style
      }}
    >
      {/* Top Terminal Badge */}
      <div
        style={{
          position: 'absolute',
          top: -152,
          zIndex: 10
        }}
      >
        <TerminalBadge
          label={topTerminalLabel as any}
          type={topTerminalLabel === 'P' ? 'positive' : 'negative'}
          highlight={reversed ? nHigh : pHigh}
        />
      </div>

      {/* Actual ePod */}
      <Epod
        type={type}
        rotation={rotation}
        scale={scale}
        reversed={reversed}
        ledOn={ledOn}
      />

      {/* Bottom Terminal Badge */}
      <div
        style={{
          position: 'absolute',
          bottom: -152,
          zIndex: 10
        }}
      >
        <TerminalBadge
          label={bottomTerminalLabel as any}
          type={bottomTerminalLabel === 'P' ? 'positive' : 'negative'}
          highlight={reversed ? pHigh : nHigh}
        />
      </div>

      {/* Module Title Label */}
      <div
        style={{
          position: 'absolute',
          bottom: -200,
          background: '#FFFFFF',
          padding: '6px 18px',
          borderRadius: 999,
          boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
          border: '1.5px solid #E2E8F0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          whiteSpace: 'nowrap',
          zIndex: 10
        }}
      >
        <span
          style={{
            fontSize: 16,
            fontWeight: 800,
            color: badgeColor,
            fontFamily: 'Inter, system-ui, sans-serif'
          }}
        >
          {label}
        </span>
        {sublabel && (
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: '#64748B',
              fontFamily: 'Inter, system-ui, sans-serif',
              marginTop: 1
            }}
          >
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
};
