import React from "react";
import { Audio, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Camera } from "../components/Camera";
import { BatteryInsertion } from "../components/BatteryInsertion";
import { Label } from "../components/Labels";
import { Subtitles } from "../components/Subtitles";
import { CUES, SCENES } from "../config/timing";

export const Scene04Alignment: React.FC = () => {
  const frame = useCurrentFrame();
  const sceneTiming = SCENES[3];

  // Camera pushes in closer towards holder with ample headroom
  const cameraScale = interpolate(frame, [0, sceneTiming.durationInFrames], [1.10, 1.20], {
    extrapolateRight: "clamp",
  });
  const cameraPanY = interpolate(frame, [0, sceneTiming.durationInFrames], [125, 145], {
    extrapolateRight: "clamp",
  });

  // Battery enters from higher up (h: 1.25 -> 1.0) and settles into calibrated hover pose at h=1.0
  const h = interpolate(frame, [0, 26], [1.25, 1.0], {
    extrapolateRight: "clamp",
  });

  // Target ring snaps green at CUES.SCENE_4_SNAP_GREEN (frame 28)
  const isAligned = frame >= CUES.SCENE_4_SNAP_GREEN;

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
          {/* Calibrated hover pose at h=1.0, rotateX=boardRotateX, target ring and vertical guide line */}
          <BatteryInsertion
            customH={h}
            customT={0}
            showArrow={true}
            arrowLabel="ALIGN"
            showTargetRing={true}
            isTargetAligned={isAligned}
            showGuideLine={frame >= 10}
          />
        </div>
      </Camera>

      {/* Label ALIGN */}
      <Label
        text="Align With Holder"
        subtext="Center Battery Directly Above Socket"
        pillX={1440}
        pillY={240}
        targetX={1120}
        targetY={380}
        theme={isAligned ? "green" : "navy"}
        icon={isAligned ? "check" : undefined}
        startFrame={22}
        durationFrames={sceneTiming.durationInFrames - 25}
      />

      <Subtitles
        text={sceneTiming.subtitle}
        durationInFrames={sceneTiming.durationInFrames}
      />
    </div>
  );
};
