import React from "react";
import { staticFile, useCurrentFrame } from "remotion";
import { getBatteryTracking } from "./EpodTracking";

interface OriginalBatteryLayerProps {
  /** Optional override for frame number (defaults to useCurrentFrame()) */
  frame?: number;
}

/**
 * OriginalBatteryLayer Component
 * 
 * Renders the authentic real CR2032 Duracell 3V coin cell battery from the original video,
 * positioning it directly above the replacement blue ePod holder.
 * 
 * Ensures:
 * 1. The original real battery remains the one being inserted.
 * 2. Only ONE battery exists in the video (empty socket underneath receives this battery).
 * 3. 3D perspective orientation, descent, and drop-shadow match the original animation.
 */
export const OriginalBatteryLayer: React.FC<OriginalBatteryLayerProps> = ({
  frame: propFrame,
}) => {
  const currentFrame = useCurrentFrame();
  const frame = propFrame !== undefined ? propFrame : currentFrame;

  // Retrieve tracked state of real battery at current frame
  const batState = getBatteryTracking(frame);

  // Standard diameter for CR2032 disc in oblique perspective
  const baseDiameter = 395;
  const diameter = baseDiameter * batState.scale;

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 1920,
        height: 1080,
        pointerEvents: "none",
        zIndex: 40,
      }}
    >
      {/* 1. Real Battery Drop Shadow (tightens into socket as battery descends) */}
      <div
        style={{
          position: "absolute",
          left: batState.x,
          top: batState.y + batState.dropShadowOffsetY,
          width: diameter * 0.94,
          height: diameter * (batState.rotateX > 20 ? 0.48 : 0.92),
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0) 72%)",
          filter: `blur(${batState.dropShadowBlur}px)`,
          opacity: batState.dropShadowOpacity,
          pointerEvents: "none",
        }}
      />

      {/* 2. Real Photographic Duracell CR2032 Battery */}
      <div
        style={{
          position: "absolute",
          left: batState.x,
          top: batState.y,
          width: diameter,
          height: diameter,
          transformOrigin: "center center",
          transform: `translate(-50%, -50%) perspective(1400px) rotateX(${batState.rotateX}deg)`,
          transformStyle: "preserve-3d",
          opacity: batState.opacity,
          pointerEvents: "none",
        }}
      >
        <img
          src={staticFile("assets/battery_face_topdown.png")}
          alt="Original Real CR2032 3V Battery"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            display: "block",
            boxShadow:
              batState.rotateX > 15
                ? "0 8px 16px rgba(0, 0, 0, 0.45)"
                : "0 2px 8px rgba(0, 0, 0, 0.35)",
          }}
        />
      </div>
    </div>
  );
};
