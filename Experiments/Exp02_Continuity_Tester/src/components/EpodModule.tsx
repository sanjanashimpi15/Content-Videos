import React from 'react';
import {Epod, EpodType} from './Epod';

export interface EpodModuleProps {
  type: EpodType;
  x: number;
  y: number;
  title: string;
  reversed?: boolean;
  ledOn?: boolean;
  highlightP?: boolean;
  highlightN?: boolean;
}

export const EpodModule: React.FC<EpodModuleProps> = ({
  type,
  x,
  y,
  title,
  reversed = false,
  ledOn = false,
  highlightP = false,
  highlightN = false
}) => {
  const isBattery = type === 'battery';
  const topPolarity = reversed ? 'N' : 'P';
  const bottomPolarity = reversed ? 'P' : 'N';

  // Sockets on vertical ePod (center at y=560) are at y=425 and y=695
  const topSocketY = y - 135;
  const bottomSocketY = y + 135;

  // Outer badge side: left side for battery, right side for LED
  const badgeX = isBattery ? x - 130 : x + 130;

  return (
    <>
      {/* Title Label above ePod */}
      <div
        style={{
          position: 'absolute',
          left: x,
          top: y - 250,
          transform: 'translateX(-50%)',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(8px)',
          color: '#1E293B',
          fontSize: 18,
          fontWeight: 800,
          letterSpacing: '0.06em',
          padding: '6px 20px',
          borderRadius: 20,
          boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
          border: '1.5px solid #E2E8F0',
          whiteSpace: 'nowrap',
          zIndex: 15
        }}
      >
        {title}
      </div>

      {/* The ePod */}
      <div
        style={{
          position: 'absolute',
          left: x,
          top: y,
          transform: 'translate(-50%, -50%)',
          zIndex: 10
        }}
      >
        <Epod
          type={type}
          rotation={90}
          scale={1.22}
          cropText={true}
          reversed={reversed}
          ledOn={ledOn}
        />
      </div>

      {/* Terminal Top Badge */}
      <div
        style={{
          position: 'absolute',
          left: badgeX,
          top: topSocketY,
          transform: 'translate(-50%, -50%)',
          background: topPolarity === 'P' ? '#EF4444' : '#1E293B',
          color: '#FFFFFF',
          fontWeight: 900,
          fontSize: 14,
          padding: '4px 12px',
          borderRadius: 14,
          boxShadow: highlightP
            ? '0 0 0 4px #00E676, 0 4px 12px rgba(0,0,0,0.3)'
            : '0 2px 8px rgba(0,0,0,0.2)',
          zIndex: 25,
          whiteSpace: 'nowrap'
        }}
      >
        {topPolarity} (+)
      </div>

      {/* Terminal Bottom Badge */}
      <div
        style={{
          position: 'absolute',
          left: badgeX,
          top: bottomSocketY,
          transform: 'translate(-50%, -50%)',
          background: bottomPolarity === 'N' ? '#1E293B' : '#EF4444',
          color: '#FFFFFF',
          fontWeight: 900,
          fontSize: 14,
          padding: '4px 12px',
          borderRadius: 14,
          boxShadow: highlightN
            ? '0 0 0 4px #00E676, 0 4px 12px rgba(0,0,0,0.3)'
            : '0 2px 8px rgba(0,0,0,0.2)',
          zIndex: 25,
          whiteSpace: 'nowrap'
        }}
      >
        {bottomPolarity} (-)
      </div>
    </>
  );
};
