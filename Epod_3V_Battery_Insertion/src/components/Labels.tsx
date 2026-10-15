import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface LabelProps {
  text: string;
  subtext?: string;
  pillX: number;
  pillY: number;
  targetX?: number;
  targetY?: number;
  theme?: "navy" | "green" | "amber";
  startFrame?: number;
  durationFrames?: number;
  icon?: "check" | "alert" | "arrow" | "circle";
}

export const Label: React.FC<LabelProps> = ({
  text,
  subtext,
  pillX,
  pillY,
  targetX,
  targetY,
  theme = "navy",
  startFrame = 0,
  durationFrames = 100,
  icon,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const relFrame = frame - startFrame;
  if (relFrame < 0 || relFrame > durationFrames) {
    return null;
  }

  // Entrance spring
  const enterSpring = spring({
    frame: relFrame,
    fps,
    config: { damping: 14, stiffness: 160, mass: 0.8 },
  });

  // Exit fade
  const exitFrames = 10;
  const exitProgress = interpolate(
    relFrame,
    [durationFrames - exitFrames, durationFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacity = interpolate(enterSpring, [0, 0.4, 1], [0, 0.8, 1]) * (1 - exitProgress);
  const scale = enterSpring * (1 - exitProgress * 0.15);

  const themeColors = {
    navy: {
      bg: "linear-gradient(135deg, #12304F 0%, #0d2238 100%)",
      border: "rgba(255, 255, 255, 0.25)",
      text: "#FFFFFF",
      accent: "#4ea8de",
      line: "#4ea8de",
    },
    green: {
      bg: "linear-gradient(135deg, #2FB34A 0%, #238b3a 100%)",
      border: "rgba(255, 255, 255, 0.35)",
      text: "#FFFFFF",
      accent: "#b7f4c5",
      line: "#2FB34A",
    },
    amber: {
      bg: "linear-gradient(135deg, #F2A900 0%, #c98800 100%)",
      border: "rgba(255, 255, 255, 0.35)",
      text: "#FFFFFF",
      accent: "#fff3cc",
      line: "#F2A900",
    },
  };

  const currentTheme = themeColors[theme];

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 1920,
        height: 1080,
        pointerEvents: "none",
        zIndex: 90,
      }}
    >
      {/* SVG Leader line */}
      {targetX !== undefined && targetY !== undefined && (
        <svg
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 1920,
            height: 1080,
            opacity: opacity * 0.9,
          }}
        >
          <line
            x1={pillX}
            y1={pillY}
            x2={targetX}
            y2={targetY}
            stroke={currentTheme.line}
            strokeWidth={2.5}
            strokeDasharray="4 3"
          />
          {/* Target endpoint dot */}
          <circle
            cx={targetX}
            cy={targetY}
            r={5}
            fill={currentTheme.line}
            stroke="#FFFFFF"
            strokeWidth={2}
          />
        </svg>
      )}

      {/* Pill Box */}
      <div
        style={{
          position: "absolute",
          left: pillX,
          top: pillY,
          transform: `translate(-50%, -50%) scale(${scale})`,
          opacity,
          background: currentTheme.bg,
          border: `1.5px solid ${currentTheme.border}`,
          borderRadius: 24,
          padding: "10px 24px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.28)",
          fontFamily: "'Inter', sans-serif",
          whiteSpace: "nowrap",
        }}
      >
        {icon === "check" && (
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: "50%",
              background: "#FFFFFF",
              color: "#2FB34A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: 18,
            }}
          >
            ✓
          </div>
        )}
        <div>
          <div
            style={{
              color: currentTheme.text,
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            {text}
          </div>
          {subtext && (
            <div
              style={{
                color: currentTheme.accent,
                fontSize: 14,
                fontWeight: 600,
                marginTop: 2,
                letterSpacing: "0.02em",
              }}
            >
              {subtext}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
