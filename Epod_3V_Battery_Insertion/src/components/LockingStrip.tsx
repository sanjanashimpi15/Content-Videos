import React from "react";
import { interpolate, staticFile, useCurrentFrame } from "remotion";

interface LockingStripProps {
  highlight?: boolean;
  highlightStartFrame?: number;
}

export const LockingStrip: React.FC<LockingStripProps> = ({
  highlight = false,
  highlightStartFrame = 0,
}) => {
  const frame = useCurrentFrame();

  const relFrame = Math.max(0, frame - highlightStartFrame);

  // Gentle pulse glow when highlighted
  const pulse = highlight
    ? Math.sin(relFrame * 0.2) * 0.5 + 0.5
    : 0;

  const glowIntensity = interpolate(pulse, [0, 1], [4, 16]);

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 1240,
        height: 566,
        pointerEvents: "none",
        zIndex: 40,
      }}
    >
      <img
        src={staticFile("assets/locking_strip.png")}
        alt="Locking Strip"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 1240,
          height: 566,
          filter: highlight
            ? `drop-shadow(0 0 ${glowIntensity}px rgba(47, 179, 74, 0.85)) drop-shadow(0 0 24px rgba(242, 169, 0, 0.45))`
            : "none",
          transition: "filter 0.2s ease",
        }}
      />
    </div>
  );
};
