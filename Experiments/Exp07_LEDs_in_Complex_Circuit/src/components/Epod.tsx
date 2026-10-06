import React from 'react';
import {Img, interpolate, staticFile, useCurrentFrame} from 'remotion';

export type EpodType = 'battery' | 'led-red' | 'led-green';

export interface EpodProps {
  type: EpodType;
  rotation?: number;
  scale?: number;
  cropText?: boolean;
  highlightTerminal?: 'P' | 'N' | 'both' | null;
  reversed?: boolean;
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
  const isGreen = type === 'led-green';
  const isRed = type === 'led-red';

  const assetName = isBattery ? 'assets/battery-epod.png' : 'assets/led-epod.png';

  const baseWidth = isBattery ? 440 : 480;
  const baseHeight = isBattery ? 254 : 280;
  const displayHeight = cropText ? baseHeight * 0.82 : baseHeight;

  const effectiveRotation = reversed ? rotation + 180 : rotation;

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
            mixBlendMode: 'multiply',
            filter: isGreen ? 'hue-rotate(110deg) saturate(1.1)' : undefined
          }}
        />

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

        {/* Green LED Glow */}
        {isGreen && ledOn && (
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
                background: 'radial-gradient(circle, rgba(16, 185, 129, 0.85) 0%, rgba(16, 185, 129, 0.45) 45%, rgba(16, 185, 129, 0) 70%)',
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
                background: 'radial-gradient(circle, #FFFFFF 0%, #A7F3D0 50%, #10B981 100%)',
                boxShadow: '0 0 35px 15px #10B981, 0 0 70px 25px rgba(16, 185, 129, 0.7)',
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
