import React from "react";
import { Audio, Easing, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Battery } from "../components/Battery";
import { Label } from "../components/Labels";
import { Subtitles } from "../components/Subtitles";
import { SCENES } from "../config/timing";

export const Scene02Battery: React.FC = () => {
  const frame = useCurrentFrame();
  const sceneTiming = SCENES[1];

  // Subtle Y-axis rotation: +/- 12 degrees only (never reveals back)
  const rotateY = Math.sin(frame * 0.04) * 12;

  // Gentle float motion
  const floatY = Math.sin(frame * 0.08) * 8;

  // End glide transition towards park / hover area (last 28 frames)
  const glideStart = sceneTiming.durationInFrames - 28;
  const isGliding = frame >= glideStart;
  const glideProgress = isGliding
    ? Easing.inOut(Easing.cubic)((frame - glideStart) / 28)
    : 0;

  // Showcase position vs Glide position
  const batteryX = interpolate(glideProgress, [0, 1], [960, 985]);
  const batteryY = interpolate(glideProgress, [0, 1], [460 + floatY, -150]);
  const batteryScale = interpolate(glideProgress, [0, 1], [1.15, 0.95]);

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        position: "relative",
        background: "radial-gradient(ellipse at 50% 50%, #f7f9fc 0%, #dbe3ed 100%)",
        overflow: "hidden",
      }}
    >
      <Audio src={staticFile(sceneTiming.audioFile)} />

      {/* Subtle Studio Pedestal Shadow */}
      <div
        style={{
          position: "absolute",
          left: batteryX,
          top: 720,
          width: interpolate(glideProgress, [0, 1], [440, 150]),
          height: 120,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(18, 48, 79, 0.28) 0%, transparent 70%)",
          filter: "blur(18px)",
          opacity: 1 - glideProgress,
        }}
      />

      {/* Centered Showcase Battery */}
      <div
        style={{
          position: "absolute",
          left: batteryX,
          top: batteryY,
          transform: "translate(-50%, -50%)",
          zIndex: 30,
        }}
      >
        <Battery
          width={480}
          height={320}
          edgeThickness={28}
          rotateY={rotateY}
          rotateX={12}
          scale={batteryScale}
          showSpecular={true}
          specularProgress={(frame * 0.012) % 1}
        />
      </div>

      {/* Labels */}
      {!isGliding && (
        <>
          <Label
            text="3V Button Battery"
            subtext="CR 2032 Lithium Cell"
            pillX={540}
            pillY={320}
            targetX={770}
            targetY={420}
            theme="navy"
            startFrame={15}
            durationFrames={glideStart - 15}
          />

          <Label
            text="Printed Side Up"
            subtext="Shiny Face With Text Facing Up"
            pillX={1380}
            pillY={320}
            targetX={1150}
            targetY={410}
            theme="green"
            icon="check"
            startFrame={50}
            durationFrames={glideStart - 50}
          />
        </>
      )}

      <Subtitles
        text={sceneTiming.subtitle}
        durationInFrames={sceneTiming.durationInFrames}
      />
    </div>
  );
};
