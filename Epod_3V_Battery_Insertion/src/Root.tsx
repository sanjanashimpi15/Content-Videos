import React from "react";
import { Composition } from "remotion";
import { BatteryInsertionVideo } from "./BatteryInsertionVideo";
import { TOTAL_FRAMES, VIDEO_CONFIG } from "./config/timing";

export const Root: React.FC = () => {
  return (
    <>
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
