import React from "react";
import { interpolate, staticFile, useCurrentFrame } from "remotion";
import { CALIBRATION } from "../config/calibration";

interface BatteryHolderProps {
  z?: number; // 0 (seated) to 6 (hover)
  highlightRing?: boolean;
  highlightRingPulses?: number;
  targetRing?: boolean;
  targetRingColor?: string;
  lockFlash?: boolean;
  lockFlashFrame?: number;
}

export const BatteryHolder: React.FC<BatteryHolderProps> = ({
  z = 6,
  highlightRing = false,
  highlightRingPulses = 2,
  targetRing = false,
  targetRingColor = "rgba(47, 179, 74, 0.9)",
  lockFlash = false,
  lockFlashFrame = 0,
}) => {
  const frame = useCurrentFrame();

  // Calibrated holder center and inner dimensions
  const holderCenterX = CALIBRATION.oblique.holderCenter.x; // 648
  const holderCenterY = CALIBRATION.oblique.holderCenter.y; // 195
  const holderRadiusX = CALIBRATION.oblique.holderInnerRx; // 210
  const holderRadiusY = CALIBRATION.oblique.holderInnerRy; // 109

  // Pulse ring for Scene 3
  const pulsePhase = (frame * 0.12) % (Math.PI * 2);
  const pulseScale = interpolate(Math.sin(pulsePhase), [-1, 1], [0.98, 1.05]);
  const pulseOpacity = interpolate(Math.sin(pulsePhase), [-1, 1], [0.35, 0.95]);

  // Lock flash for Scene 6
  const flashRelFrame = Math.max(0, frame - lockFlashFrame);
  const flashOpacity = lockFlash
    ? interpolate(flashRelFrame, [0, 8, 25], [0, 0.9, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  // Ambient occlusion darkening inside holder: darkens as z -> 0
  const aoOpacity = interpolate(z, [0, 2, 6], [0.45, 0.15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 1240,
        height: 566,
        pointerEvents: "none",
      }}
    >
      {/* Back Wall Layer (Renders behind the battery) */}
      <img
        src={staticFile("assets/holder_back_wall.png")}
        alt="Holder Back Wall"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 1240,
          height: 566,
          zIndex: 15,
        }}
      />

      {/* Internal Cast Shadow of battery on floor (z-interpolated) */}
      {z > 0 && (
        <div
          style={{
            position: "absolute",
            left: holderCenterX,
            top: holderCenterY + interpolate(z, [0, 6], [10, 45]),
            width: interpolate(z, [0, 6], [420, 280]),
            height: interpolate(z, [0, 6], [220, 140]),
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            background: "radial-gradient(ellipse at center, rgba(0, 0, 0, 0.82) 0%, rgba(0, 0, 0, 0) 75%)",
            opacity: interpolate(z, [0, 6], [0.85, 0.28]),
            filter: `blur(${interpolate(z, [0, 6], [6, 24])}px)`,
            zIndex: 18,
          }}
        />
      )}

      {/* Ambient occlusion rim shadow */}
      <div
        style={{
          position: "absolute",
          left: holderCenterX,
          top: holderCenterY,
          width: holderRadiusX * 2,
          height: holderRadiusY * 2,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          boxShadow: `inset 0 0 25px rgba(0, 0, 0, ${aoOpacity * 1.5})`,
          opacity: aoOpacity,
          zIndex: 19,
          pointerEvents: "none",
        }}
      />

      {/* Scene 3 Pulse Highlight Ring */}
      {highlightRing && (
        <svg
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 1240,
            height: 566,
            zIndex: 35,
          }}
        >
          <ellipse
            cx={holderCenterX}
            cy={holderCenterY + 10}
            rx={holderRadiusX * pulseScale}
            ry={holderRadiusY * pulseScale}
            fill="none"
            stroke="#2FB34A"
            strokeWidth={4.5}
            strokeDasharray="12 8"
            opacity={pulseOpacity}
            filter="drop-shadow(0 0 10px rgba(47, 179, 74, 0.75))"
          />
        </svg>
      )}

      {/* Scene 4 Target Alignment Ring */}
      {targetRing && (
        <svg
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 1240,
            height: 566,
            zIndex: 35,
          }}
        >
          <ellipse
            cx={holderCenterX}
            cy={holderCenterY}
            rx={holderRadiusX}
            ry={holderRadiusY}
            fill="none"
            stroke={targetRingColor}
            strokeWidth={3.5}
            strokeDasharray="8 6"
            filter={`drop-shadow(0 0 8px ${targetRingColor})`}
          />
        </svg>
      )}

      {/* Scene 6 Lock Flash Ring */}
      {lockFlash && flashOpacity > 0 && (
        <svg
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 1240,
            height: 566,
            zIndex: 45,
          }}
        >
          <ellipse
            cx={holderCenterX}
            cy={holderCenterY + 10}
            rx={holderRadiusX + 12}
            ry={holderRadiusY + 12}
            fill="none"
            stroke="#2FB34A"
            strokeWidth={8}
            opacity={flashOpacity}
            filter="drop-shadow(0 0 18px rgba(47, 179, 74, 0.95)) drop-shadow(0 0 32px #2FB34A)"
          />
        </svg>
      )}
    </div>
  );
};

// Occlusion Layer component (drawn ABOVE the battery)
export const HolderFrontWallOcclusion: React.FC<{ opacity?: number }> = ({ opacity = 1 }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 1240,
        height: 566,
        pointerEvents: "none",
        zIndex: 30, // Above battery (z-index 25)
        opacity,
      }}
    >
      <img
        src={staticFile("assets/holder_front_wall_mask.png")}
        alt="Holder Front Wall Lip"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 1240,
          height: 566,
        }}
      />
    </div>
  );
};
