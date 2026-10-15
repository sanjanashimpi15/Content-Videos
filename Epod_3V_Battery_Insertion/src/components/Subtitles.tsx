import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface SubtitlesProps {
  text: string;
  durationInFrames: number;
}

export const Subtitles: React.FC<SubtitlesProps> = ({ text, durationInFrames }) => {
  const frame = useCurrentFrame();

  // Gentle fade in at start, fade out at end
  const opacity = interpolate(
    frame,
    [0, 10, durationInFrames - 10, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "absolute",
        bottom: 50,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 100,
        pointerEvents: "none",
        opacity,
      }}
    >
      <div
        style={{
          background: "rgba(18, 48, 79, 0.90)",
          border: "1px solid rgba(255, 255, 255, 0.22)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
          borderRadius: 40,
          padding: "14px 38px",
          maxWidth: 1300,
          textAlign: "center",
          color: "#FFFFFF",
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          fontSize: 34,
          fontWeight: 500,
          letterSpacing: "-0.01em",
          lineHeight: 1.35,
          backdropFilter: "blur(12px)",
        }}
      >
        {text}
      </div>
    </div>
  );
};
