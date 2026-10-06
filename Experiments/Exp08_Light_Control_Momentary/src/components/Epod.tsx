import React from 'react';
import {Img, interpolate, staticFile, useCurrentFrame} from 'remotion';

export type EpodType = 'battery' | 'led-red' | 'tact-switch';

export interface EpodProps {
  type: EpodType;
  rotation?: number;
  scale?: number;
  cropText?: boolean;
  highlightTerminal?: 'P' | 'N' | 'A' | 'B' | 'both' | null;
  reversed?: boolean;
  ledOn?: boolean;
  switchPressed?: boolean;
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
  switchPressed = false,
  style = {}
}) => {
  const frame = useCurrentFrame();

  const isBattery = type === 'battery';
  const isRed = type === 'led-red';
  const isTact = type === 'tact-switch';

  const assetName = isBattery
    ? 'assets/battery-epod.png'
    : isTact
    ? 'assets/tact-switch-epod.png'
    : 'assets/led-epod.png';

  // For battery & LED, the source image is horizontal, so rotation=90 makes them vertical.
  // For tact switch, the source image is already vertical, so rotation=0 makes it vertical!
  const effectiveRotation = isTact
    ? (reversed ? 180 : 0) + (rotation === 90 ? 0 : rotation)
    : (reversed ? rotation + 180 : rotation);

  const baseWidth = isBattery ? 440 : isTact ? 250 : 480;
  const baseHeight = isBattery ? 254 : isTact ? 390 : 280;
  const displayHeight = isTact ? baseHeight : (cropText ? baseHeight * 0.82 : baseHeight);

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
          alignItems: 'center',
          position: 'relative'
        }}
      >
        <Img
          src={staticFile(assetName)}
          style={{
            width: baseWidth,
            height: isTact ? baseHeight : baseHeight,
            objectFit: 'contain',
            mixBlendMode: 'multiply'
          }}
        />

        {/* Tact Switch Interactive Button Overlay */}
        {isTact && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) scale(${switchPressed ? 0.90 : 1.0})`,
              transition: 'transform 0.1s ease',
              width: 58,
              height: 58,
              borderRadius: '50%',
              background: switchPressed
                ? 'radial-gradient(circle, #0F172A 0%, #1E293B 70%, #334155 100%)'
                : 'radial-gradient(circle, #27272A 0%, #18181B 70%, #09090B 100%)',
              boxShadow: switchPressed
                ? 'inset 0 4px 8px rgba(0,0,0,0.8), 0 0 16px rgba(59, 130, 246, 0.6)'
                : '0 4px 10px rgba(0,0,0,0.4)',
              border: switchPressed ? '2.5px solid #3B82F6' : '1.5px solid #52525B',
              pointerEvents: 'none'
            }}
          />
        )}

        {/* Red LED Glow */}
        {isRed && ledOn && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) scale(${pulse})`,
              pointerEvents: 'none'
            }}
          >
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
