import React from "react";
import { interpolate, staticFile, useCurrentFrame } from "remotion";
import { getEpodTracking } from "./EpodTracking";

interface BlueEpodReplacementProps {
  /** Optional override for frame number (defaults to useCurrentFrame()) */
  frame?: number;
  /** Hide the clean plate if needed */
  hideCleanPlate?: boolean;
}

/**
 * BlueEpodReplacement Component
 * 
 * Replaces the original green hexagonal ePod board with the authentic blue circular ePod
 * hardware specified in the reference image.
 * 
 * Key Features:
 * 1. Seamless full-width feathered clean plate that eliminates 100% of the underlying green PCB
 *    and yellow connectors, while keeping the hovering battery completely untouched.
 * 2. Realistic contact shadow underneath the blue circular disc.
 * 3. Transparent PNG asset (assets/blue-epod-body.png) displaying the blue disc body,
 *    two black 3-pin JST connectors with silver pins, 6 mounting holes, and empty holder.
 * 4. 3D perspective orientation (rotateX, rotateZ, scale, position) tracking the camera.
 */
export const BlueEpodReplacement: React.FC<BlueEpodReplacementProps> = ({
  frame: propFrame,
  hideCleanPlate = false,
}) => {
  const currentFrame = useCurrentFrame();
  const frame = propFrame !== undefined ? propFrame : currentFrame;

  // Retrieve interpolated tracking data for this frame
  const tracking = getEpodTracking(frame);

  // Transition factor for camera tilt (0 = oblique, 1 = top-down)
  // Eases from frame 60 to 80 as the battery lowers and camera begins tilting
  const tiltProgress = interpolate(frame, [60, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Disc diameter
  const discDiameter = tracking.diameter * tracking.scale;

  // Clean plate top boundary using a smooth quadratic bezier curve:
  // On the sides (x=0 and x=1920), y=350 covers 100% of the yellow connectors even during camera zoom-in.
  // In the center (x=960), y=375 cleanly tucks under the hovering battery.
  // As camera tilts to top-down view (frame 80 onwards), smoothly sweeps to y=0 to cover the full frame.
  const sideTopY = interpolate(tiltProgress, [0, 1], [350, 0]);
  const centerTopY = interpolate(tiltProgress, [0, 1], [375, 0]);

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 1920,
        height: 1080,
        pointerEvents: "none",
        zIndex: 20,
      }}
    >
      {/* 1. Seamless Full-Width Feathered SVG Clean Plate */}
      {!hideCleanPlate && (
        <svg
          width="1920"
          height="1080"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 1920,
            height: 1080,
            pointerEvents: "none",
          }}
        >
          <defs>
            <radialGradient id="bgStudioGrad" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#f3f6fc" />
              <stop offset="55%" stopColor="#e4eaf2" />
              <stop offset="100%" stopColor="#dfe5ef" />
            </radialGradient>
            <filter id="softMaskBlur" x="-5%" y="-5%" width="110%" height="110%">
              <feGaussianBlur stdDeviation="8" />
            </filter>
            <mask id="cleanPlateMask">
              <rect width="1920" height="1080" fill="black" />
              <path
                d={`M 0 ${sideTopY} Q 960 ${centerTopY} 1920 ${sideTopY} L 1920 1080 L 0 1080 Z`}
                fill="white"
                filter="url(#softMaskBlur)"
              />
            </mask>
          </defs>
          <rect
            width="1920"
            height="1080"
            fill="url(#bgStudioGrad)"
            mask="url(#cleanPlateMask)"
            opacity={tracking.opacity}
          />
        </svg>
      )}

      {/* 2. Contact Shadow of Blue Circular ePod */}
      <div
        style={{
          position: "absolute",
          left: tracking.x,
          top: tracking.y + (tracking.rotateX > 20 ? 45 * tracking.scale : 20 * tracking.scale),
          width: discDiameter * 0.98,
          height: discDiameter * (tracking.rotateX > 20 ? 0.46 : 0.88),
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(18, 35, 55, 0.44) 0%, rgba(18, 35, 55, 0.12) 55%, transparent 75%)",
          filter: "blur(22px)",
          opacity: tracking.opacity,
          pointerEvents: "none",
        }}
      />

      {/* 3. Replacement Blue ePod Body Plate */}
      <div
        style={{
          position: "absolute",
          left: tracking.x,
          top: tracking.y,
          width: discDiameter,
          height: discDiameter,
          transformOrigin: "center center",
          transform: `translate(-50%, -50%) perspective(1400px) rotateX(${tracking.rotateX}deg) rotateZ(${tracking.rotateZ}deg)`,
          transformStyle: "preserve-3d",
          opacity: tracking.opacity,
          pointerEvents: "none",
        }}
      >
        <img
          src={staticFile("assets/blue-epod-body.png")}
          alt="Blue Circular ePod Hardware"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
            filter: "drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.18))",
          }}
        />
      </div>
    </div>
  );
};
