import React from "react";
import { Composition } from "remotion";
import { BatteryInsertionVideo } from "./BatteryInsertionVideo";
import { BlueEpodReplacementDemo } from "./BlueEpodReplacementDemo";
import { TOTAL_FRAMES, VIDEO_CONFIG } from "./config/timing";

export const Root: React.FC = () => {
  return (
    <>
      {/* 5-10 Second Prototype Demo Composition (8 seconds @ 30 FPS = 240 frames) */}
      <Composition
        id="BlueEpodReplacementDemo"
        component={BlueEpodReplacementDemo}
        durationInFrames={240}
        fps={VIDEO_CONFIG.fps}
        width={VIDEO_CONFIG.width}
        height={VIDEO_CONFIG.height}
      />

      {/* Original Full Video Composition */}
      <Composition
        id="Epod3VBatteryInsertion"
        component={BatteryInsertionVideo}
        durationInFrames={TOTAL_FRAMES}
        fps={VIDEO_CONFIG.fps}
        width={VIDEO_CONFIG.width}
        height={VIDEO_CONFIG.height}
      />
    </>
  );
};
