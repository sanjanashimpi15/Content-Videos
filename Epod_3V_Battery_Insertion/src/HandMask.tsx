import React from "react";
import { useCurrentFrame } from "remotion";

interface HandMaskProps {
  /** Optional override for frame number (defaults to useCurrentFrame()) */
  frame?: number;
  /** Custom children or hand overlay elements */
  children?: React.ReactNode;
}

/**
 * HandMask Component
 * 
 * Manages hand occlusion and foreground rotoscoping layers.
 * When real hand footage passes in front of the ePod, this layer extracts
 * and places the hands/fingers in front of the replacement ePod.
 * 
 * For video sources without human hands (such as the studio composite),
 * this layer remains transparent so the background and replacement blend cleanly.
 */
export const HandMask: React.FC<HandMaskProps> = ({
  frame: propFrame,
  children,
}) => {
  const currentFrame = useCurrentFrame();
  const frame = propFrame !== undefined ? propFrame : currentFrame;

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 1920,
        height: 1080,
        pointerEvents: "none",
        zIndex: 50,
      }}
    >
      {/* Hand occlusion content / pass-through */}
      {children}
    </div>
  );
};
