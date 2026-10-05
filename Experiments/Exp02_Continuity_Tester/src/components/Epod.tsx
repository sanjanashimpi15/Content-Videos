import React from 'react';
import {Img, interpolate, staticFile, useCurrentFrame} from 'remotion';

export type EpodType = 'battery' | 'led-red';

export interface EpodProps {
  type: EpodType;
  rotation?: number; // 90 for vertical with P at top, N at bottom
  scale?: number;
  cropText?: boolean;
  highlightTerminal?: 'P' | 'N' | 'both' | null;
  reversed?: boolean; // For Tinkering: flip 180 deg so N is at top, P is at bottom
  ledOn?: boolean;
  style?: React.CSSProperties;
}

export const Epod: React.FC<EpodProps> = ({
  type,
  rotation = 90,
  scale = 1.22,
  cropText = true,
  highlightTerminal = null,
  reversed = false,
  ledOn = false,
  style = {}
}) => {
  const frame = useCurrentFrame();

  const isBattery = type === 'battery';
  const assetName = isBattery ? 'assets/battery-epod.png' : 'assets/led-epod.png';

  const baseWidth = isBattery ? 440 : 480;
  const baseHeight = isBattery ? 254 : 280;
  const displayHeight = cropText ? baseHeight * 0.82 : baseHeight;

  // Final rotation angle
  const effectiveRotation = reversed ? rotation + 180 : rotation;

  // Pulsing glow for LED when ON
  const pulse = ledOn
    ? interpolate(Math.sin((frame / 10) * Math.PI), [-1, 1], [0.88, 1.08])
    : 0;

  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `rotate(${effectiveRotation}deg) scale(${scale})`,
        transformOrigin: 'center center',
        ...style
      }}
    >
      <div
        style={{
          width: baseWidth,
          height: displayHeight,
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          position: 'relative'
        }}
      >
        <Img
          src={staticFile(assetName)}
          style={{
            width: baseWidth,
            height: baseHeight,
            objectFit: 'contain',
            mixBlendMode: 'multiply'
          }}
        />

        {/* LED Glow overlay when active */}
        {!isBattery && ledOn && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) scale(${pulse})`,
              pointerEvents: 'none'
            }}
          >
            {/* Outer red bloom */}
            <div
              style={{
                width: 180,
                height: 180,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255, 23, 68, 0.8) 0%, rgba(255, 23, 68, 0.4) 45%, rgba(255, 23, 68, 0) 70%)',
                filter: 'blur(8px)',
                position: 'absolute',
                top: -90,
                left: -90
              }}
            />
            {/* Core brilliance */}
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: '50%',
                background: 'radial-gradient(circle, #FFFFFF 0%, #FF8A80 50%, #FF1744 100%)',
                boxShadow: '0 0 35px 15px #FF1744, 0 0 70px 25px rgba(255, 23, 68, 0.7)',
                position: 'absolute',
                top: -25,
                left: -25
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
