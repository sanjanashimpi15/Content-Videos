import React from "react";
import { Audio, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Camera } from "../components/Camera";
import { BatteryEpod } from "../components/BatteryEpod";
import { BatteryHolder } from "../components/BatteryHolder";
import { Subtitles } from "../components/Subtitles";
import { SCENES } from "../config/timing";

export const Scene01Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const sceneTiming = SCENES[0];

  // Camera slow push-in: 1.0 -> 1.08
  const cameraScale = interpolate(
    frame,
    [0, sceneTiming.durationInFrames],
    [1.0, 1.08],
    { extrapolateRight: "clamp" }
  );

  // Lower-third Title entrance
  const titleOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [0, 18], [30, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        position: "relative",
        background: "radial-gradient(ellipse at 50% 45%, #f7f9fc 0%, #e2e8f0 100%)",
        overflow: "hidden",
      }}
    >
      <Audio src={staticFile(sceneTiming.audioFile)} />

      {/* Main Viewport */}
      <Camera scale={cameraScale} y={20}>
        <div
          style={{
            position: "absolute",
            left: (1920 - 1240) / 2,
            top: (1080 - 566) / 2,
            width: 1240,
            height: 566,
          }}
        >
          <BatteryEpod>
            {/* Empty holder, battery not visible */}
            <BatteryHolder z={6} />
          </BatteryEpod>
        </div>
      </Camera>

      {/* Lower-third Title Bar */}
      <div
        style={{
          position: "absolute",
          top: 75,
          left: 100,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          zIndex: 80,
        }}
      >
        <div
          style={{
            background: "#12304F",
            color: "#FFFFFF",
            padding: "16px 36px",
            borderRadius: 16,
            boxShadow: "0 10px 30px rgba(18, 48, 79, 0.35)",
            borderLeft: "6px solid #2FB34A",
            display: "inline-block",
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#4ea8de",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              marginBottom: 4,
            }}
          >
            STEM Kit • Battery ePod Guide
          </div>
          <div
            style={{
              fontSize: 38,
              fontWeight: 800,
              fontFamily: "'Inter', sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            Insert the 3V Battery
          </div>
        </div>
      </div>

      <Subtitles
        text={sceneTiming.subtitle}
        durationInFrames={sceneTiming.durationInFrames}
      />
    </div>
  );
};
