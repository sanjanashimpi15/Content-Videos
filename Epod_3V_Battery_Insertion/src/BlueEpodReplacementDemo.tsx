import React from "react";
import { AbsoluteFill, staticFile, useCurrentFrame, Video } from "remotion";
import { BlueEpodReplacement } from "./BlueEpodReplacement";
import { OriginalBatteryLayer } from "./OriginalBatteryLayer";
import { HandMask } from "./HandMask";
import { SCENE_5_VIDEO_START_FRAME } from "./EpodTracking";

export interface BlueEpodReplacementDemoProps {
  /** Video start frame offset in Epod3VBatteryInsertion.mp4 (defaults to Scene 5: 893) */
  videoStartFrame?: number;
}

/**
 * BlueEpodReplacementDemo Composition
 * 
 * A working 8-second (240-frame @ 30 FPS) prototype demonstrating:
 * 1. The original green ePod is 100% replaced with the authentic blue circular ePod.
 * 2. The blue ePod stays tracked and aligned across camera push-in and 3D perspective tilt.
 * 3. The real CR2032 battery from the original video inserts into the socket.
 * 4. Exactly ONE battery is shown (empty holder asset receives the real battery).
 * 5. Clean transparency with zero white border.
 * 6. Smooth interpolation between frames without jumping.
 * 7. Original video timing and narration audio preserved.
 */
export const BlueEpodReplacementDemo: React.FC<BlueEpodReplacementDemoProps> = ({
  videoStartFrame = SCENE_5_VIDEO_START_FRAME,
}) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        width: 1920,
        height: 1080,
        backgroundColor: "#e8eff7",
        overflow: "hidden",
      }}
    >
      {/* 1. BOTTOM: Original Video (starts at Scene 5 Hero Insertion, frame 893) */}
      <Video
        src={staticFile("Epod3VBatteryInsertion.mp4")}
        startFrom={videoStartFrame}
        style={{
          width: 1920,
          height: 1080,
          position: "absolute",
          left: 0,
          top: 0,
        }}
      />

      {/* 2. MIDDLE: Replacement Blue Circular ePod Hardware */}
      <BlueEpodReplacement frame={frame} />

      {/* 3. TOP: Real CR2032 Duracell Battery Layer (activates during descent into socket) */}
      <OriginalBatteryLayer frame={frame} />

      {/* 4. TOP: Hand & Occlusion Mask Layer */}
      <HandMask frame={frame} />

      {/* Subtle prototype status badge in corner */}
      <div
        style={{
          position: "absolute",
          top: 28,
          right: 36,
          background: "rgba(0, 164, 228, 0.94)",
          color: "#FFFFFF",
          padding: "8px 18px",
          borderRadius: 12,
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          fontFamily: "'Inter', system-ui, sans-serif",
          boxShadow: "0 4px 14px rgba(0, 164, 228, 0.35)",
          zIndex: 70,
          pointerEvents: "none",
        }}
      >
        Blue ePod Replacement Prototype (8s)
      </div>
    </AbsoluteFill>
  );
};
