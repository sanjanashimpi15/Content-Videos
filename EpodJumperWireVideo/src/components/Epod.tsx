import React from 'react';
import {Img, staticFile} from 'remotion';

export type EpodType = 'battery' | 'led';

export interface EpodProps {
  type: EpodType;
  rotation?: number; // degrees, e.g. 0 for horizontal, 90 for vertical
  scale?: number;
  cropText?: boolean; // Crop bottom text label if rotated or using external labels
  highlightTerminal?: 'P' | 'N' | null;
  style?: React.CSSProperties;
}

export const Epod: React.FC<EpodProps> = ({
  type,
  rotation = 0,
  scale = 1,
  cropText = false,
  highlightTerminal = null,
  style = {}
}) => {
  const assetName = type === 'battery' ? 'assets/battery-epod.png' : 'assets/led-epod.png';

  // Base dimensions matching the natural aspect ratio of the ePods
  // Battery image: 427x246, LED image: 493x288
  const baseWidth = type === 'battery' ? 440 : 480;
  const baseHeight = type === 'battery' ? 254 : 280;

  // When cropText is true, we display only the PCB body (~82% height)
  const displayHeight = cropText ? baseHeight * 0.82 : baseHeight;

  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `rotate(${rotation}deg) scale(${scale})`,
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
            pointerEvents: 'none',
            userSelect: 'none'
          }}
        />

        {/* Terminal Highlight Ring if requested */}
        {highlightTerminal && (
          <div
            style={{
              position: 'absolute',
              top: '40%',
              left: highlightTerminal === 'P' ? '12%' : '88%',
              transform: 'translate(-50%, -50%)',
              width: 52,
              height: 52,
              borderRadius: '50%',
              border: '3px solid #F5A300',
              backgroundColor: 'rgba(245, 163, 0, 0.25)',
              boxShadow: '0 0 16px rgba(245, 163, 0, 0.6)',
              pointerEvents: 'none'
            }}
          />
        )}
      </div>
    </div>
  );
};
