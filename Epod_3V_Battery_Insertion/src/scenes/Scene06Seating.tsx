import React from "react";
import { Audio, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Camera } from "../components/Camera";
import { BatteryEpod } from "../components/BatteryEpod";
import { Battery } from "../components/Battery";
import { Label } from "../components/Labels";
import { Subtitles } from "../components/Subtitles";
import { CALIBRATION } from "../config/calibration";
import { CUES, SCENES } from "../config/timing";

export const Scene06Seating: React.FC = () => {
  const frame = useCurrentFrame();
  const sceneTiming = SCENES[5];

  const holderCenter = CALIBRATION.oblique.holderCenter; // (648, 195)
  const seatedDiameter = CALIBRATION.oblique.batteryRadiusSeated * 2; // 394.8 px

  // Camera holds stable top-down framing
  const cameraScale = 1.18;
  const cameraPanY = 0;

  // Gentle press on "sits properly" (around frame 80-115)
  // Micro-dip scale: 1.00 -> 0.988 -> 1.00
  const pressScale = interpolate(
    frame,
    [80, 95, 115],
    [1.0, 0.988, 1.0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Lock flash ring at CUES.SCENE_6_LOCK_FLASH (frame 155)
  const flashRelFrame = Math.max(0, frame - CUES.SCENE_6_LOCK_FLASH);
  const isLocked = frame >= CUES.SCENE_6_LOCK_FLASH;
  const flashOpacity = isLocked
    ? interpolate(flashRelFrame, [0, 8, 28], [0, 0.95, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  // Amber glow at P-side locking strip (frame 165 onwards)
  const showStripGlow = frame >= CUES.SCENE_6_STRIP_GLOW;
  const stripGlowOpacity = showStripGlow
    ? interpolate(frame - CUES.SCENE_6_STRIP_GLOW, [0, 15], [0, 0.85], {
        extrapolateRight: "clamp",
      })
    : 0;

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

      <Camera scale={cameraScale} y={cameraPanY}>
        <div
          style={{
            position: "absolute",
            left: (1920 - 1240) / 2,
            top: (1080 - 566) / 2,
            width: 1240,
            height: 566,
          }}
        >
          {/* Top-down plate (t = 1) */}
          <BatteryEpod t={1}>
            {/* Seated battery overlay coinciding pixel-for-pixel with baked REF-4 battery */}
            <div
              style={{
                position: "absolute",
                left: holderCenter.x,
                top: holderCenter.y,
                transform: "translate(-50%, -50%)",
                zIndex: 25,
              }}
            >
              <Battery
                diameter={seatedDiameter}
                rotateX={0}
                scale={pressScale}
                showSpecular={false}
              />
            </div>

            {/* Green Circular Flash Ring around holder on lock cue */}
            {flashOpacity > 0 && (
              <svg
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: 1240,
                  height: 566,
                  zIndex: 45,
                  pointerEvents: "none",
                }}
              >
                <circle
                  cx={holderCenter.x}
                  cy={holderCenter.y}
                  r={CALIBRATION.oblique.holderInnerRx + 8}
                  fill="none"
                  stroke="#2FB34A"
                  strokeWidth={7}
                  opacity={flashOpacity}
                  filter="drop-shadow(0 0 16px rgba(47, 179, 74, 0.95)) drop-shadow(0 0 30px #2FB34A)"
                />
              </svg>
            )}

            {/* Gentle amber glow highlight on P-terminal locking clip (left edge of holder) */}
            {stripGlowOpacity > 0 && (
              <div
                style={{
                  position: "absolute",
                  left: holderCenter.x - CALIBRATION.oblique.holderInnerRx + 8,
                  top: holderCenter.y,
                  width: 50,
                  height: 70,
                  transform: "translate(-50%, -50%)",
                  borderRadius: 12,
                  background:
                    "radial-gradient(ellipse at center, rgba(245, 158, 11, 0.85) 0%, rgba(245, 158, 11, 0.25) 55%, transparent 75%)",
                  filter: "blur(4px) drop-shadow(0 0 12px #f59e0b)",
                  opacity: stripGlowOpacity,
                  zIndex: 30,
                  pointerEvents: "none",
                }}
              />
            )}
          </BatteryEpod>
        </div>
      </Camera>

      {/* Label: Locking Clip at P terminal (amber) */}
      {showStripGlow && (
        <Label
          text="Locking Clip"
          subtext="Secures Battery At Positive Terminal"
          pillX={460}
          pillY={240}
          targetX={720}
          targetY={430}
          theme="amber"
          startFrame={CUES.SCENE_6_STRIP_GLOW}
          durationFrames={sceneTiming.durationInFrames - CUES.SCENE_6_STRIP_GLOW - 10}
        />
      )}

      {/* Label: Battery Secured Checkmark Badge (green) */}
      {isLocked && (
        <Label
          text="Battery Secured"
          subtext="Locked In Place & Ready"
          pillX={1440}
          pillY={240}
          targetX={1120}
          targetY={420}
          theme="green"
          icon="check"
          startFrame={CUES.SCENE_6_LOCK_FLASH}
          durationFrames={sceneTiming.durationInFrames - CUES.SCENE_6_LOCK_FLASH - 10}
        />
      )}

      <Subtitles
        text={sceneTiming.subtitle}
        durationInFrames={sceneTiming.durationInFrames}
      />
    </div>
  );
};
