import React from "react";
import { Audio, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Camera } from "../components/Camera";
import { BatteryInsertion } from "../components/BatteryInsertion";
import { Label } from "../components/Labels";
import { Subtitles } from "../components/Subtitles";
import { CUES, SCENES } from "../config/timing";

export const Scene05Insertion: React.FC = () => {
  const frame = useCurrentFrame();
  const sceneTiming = SCENES[4];

  // Camera choreography across 5A -> 5B -> 5C -> 5D
  // 5A + 5B: Push in slightly toward holder (scale 1.15 -> 1.25, panY 120 -> 90)
  // 5C: Eases to overhead framing (scale 1.25 -> 1.18, panY 90 -> 0)
  // 5D: Holds steady focused straight down on socket
  let cameraScale = 1.15;
  let cameraPanY = 120;

  if (frame < CUES.APPROACH_START) {
    cameraScale = 1.15;
    cameraPanY = 120;
  } else if (frame < CUES.TILT_START) {
    cameraScale = interpolate(frame, [CUES.APPROACH_START, CUES.TILT_START], [1.15, 1.25], {
      extrapolateRight: "clamp",
    });
    cameraPanY = interpolate(frame, [CUES.APPROACH_START, CUES.TILT_START], [120, 85], {
      extrapolateRight: "clamp",
    });
  } else if (frame < CUES.TILT_END) {
    cameraScale = interpolate(frame, [CUES.TILT_START, CUES.TILT_END], [1.25, 1.18], {
      extrapolateRight: "clamp",
    });
    cameraPanY = interpolate(frame, [CUES.TILT_START, CUES.TILT_END], [85, 0], {
      extrapolateRight: "clamp",
    });
  } else {
    cameraScale = 1.18;
    cameraPanY = 0;
  }

  // Label only active during 5A and 5B; fades out completely before 5C begins
  const labelDuration = CUES.TILT_START - 12 - 8;

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
          {/* Hero Insertion Component executing 5A (hover) -> 5B (approach) -> 5C (tilt) -> 5D (descent/seat) */}
          <BatteryInsertion
            isScene5Hero={true}
            arrowLabel="INSERT"
          />
        </div>
      </Camera>

      {/* Label during 5A/5B approach: fades out completely before 5C starts */}
      <Label
        text="Lower Battery"
        subtext="Printed Side Facing Up"
        pillX={1450}
        pillY={220}
        targetX={1120}
        targetY={330}
        theme="navy"
        startFrame={8}
        durationFrames={labelDuration}
      />

      <Subtitles
        text={sceneTiming.subtitle}
        durationInFrames={sceneTiming.durationInFrames}
      />
    </div>
  );
};
