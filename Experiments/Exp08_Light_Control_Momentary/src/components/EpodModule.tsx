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
  highlightA?: boolean;
  highlightB?: boolean;
  reversed?: boolean;
  ledOn?: boolean;
  switchPressed?: boolean;
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
  highlightA = false,
  highlightB = false,
  reversed = false,
  ledOn = false,
  switchPressed = false,
  scale = 1.15,
  rotation = 90,
  sublabel,
  style = {}
}) => {
  const isBattery = type === 'battery';
  const isTact = type === 'tact-switch';
  const isRed = type === 'led-red';

  const topTerminalLabel: 'P' | 'N' | 'A' | 'B' = isTact
    ? (reversed ? 'B' : 'A')
    : (reversed ? 'N' : 'P');

  const bottomTerminalLabel: 'P' | 'N' | 'A' | 'B' = isTact
    ? (reversed ? 'A' : 'B')
    : (reversed ? 'P' : 'N');

  const topHighlight = isTact
    ? (reversed ? highlightB : highlightA)
    : (reversed ? highlightN : highlightP);

  const bottomHighlight = isTact
    ? (reversed ? highlightA : highlightB)
    : (reversed ? highlightP : highlightN);

  const badgeColor = isBattery ? '#2563EB' : isTact ? '#4F46E5' : '#DC2626';

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
      <div
        style={{
          position: 'absolute',
          top: -152,
          zIndex: 10
        }}
      >
        <TerminalBadge
          label={topTerminalLabel}
          highlight={topHighlight}
        />
      </div>

      <Epod
        type={type}
        rotation={rotation}
        scale={scale}
        reversed={reversed}
        ledOn={ledOn}
        switchPressed={switchPressed}
      />

      <div
        style={{
          position: 'absolute',
          bottom: -152,
          zIndex: 10
        }}
      >
        <TerminalBadge
          label={bottomTerminalLabel}
          highlight={bottomHighlight}
        />
      </div>

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
