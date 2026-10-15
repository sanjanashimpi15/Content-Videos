import React from "react";
import { Audio, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Camera } from "../components/Camera";
import { BatteryEpod } from "../components/BatteryEpod";
import { BatteryHolder } from "../components/BatteryHolder";
import { Label } from "../components/Labels";
import { Subtitles } from "../components/Subtitles";
import { SCENES } from "../config/timing";

export const Scene03Holder: React.FC = () => {
  const frame = useCurrentFrame();
  const sceneTiming = SCENES[2];

  // Camera moves smoothly to focus on holder: scale 1.05 -> 1.18, pan slightly to center holder
  const cameraScale = interpolate(frame, [0, 60], [1.05, 1.20], {
    extrapolateRight: "clamp",
  });
  const cameraPanY = interpolate(frame, [0, 60], [0, 40], {
    extrapolateRight: "clamp",
  });

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
          <BatteryEpod dimBoard={true} dimOpacity={0.25}>
            {/* Battery holder with soft green pulsing highlight ring */}
            <BatteryHolder
              z={6}
              highlightRing={true}
              highlightRingPulses={3}
            />
          </BatteryEpod>
        </div>
      </Camera>

      {/* Label for Battery Holder */}
      <Label
        text="Battery Holder"
        subtext="Secures 3V Coin Cell in Place"
        pillX={1420}
        pillY={280}
        targetX={1120}
        targetY={410}
        theme="green"
        startFrame={25}
        durationFrames={sceneTiming.durationInFrames - 35}
      />

      <Subtitles
        text={sceneTiming.subtitle}
        durationInFrames={sceneTiming.durationInFrames}
      />
    </div>
  );
};
