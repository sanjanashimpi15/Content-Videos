import React from "react";
import { Series } from "remotion";
import { SCENES } from "./config/timing";
import { Scene01Intro } from "./scenes/Scene01Intro";
import { Scene02Battery } from "./scenes/Scene02Battery";
import { Scene03Holder } from "./scenes/Scene03Holder";
import { Scene04Alignment } from "./scenes/Scene04Alignment";
import { Scene05Insertion } from "./scenes/Scene05Insertion";
import { Scene06Seating } from "./scenes/Scene06Seating";
import { Scene07Final } from "./scenes/Scene07Final";

export const BatteryInsertionVideo: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={SCENES[0].durationInFrames}>
        <Scene01Intro />
      </Series.Sequence>

      <Series.Sequence durationInFrames={SCENES[1].durationInFrames}>
        <Scene02Battery />
      </Series.Sequence>

      <Series.Sequence durationInFrames={SCENES[2].durationInFrames}>
        <Scene03Holder />
      </Series.Sequence>

      <Series.Sequence durationInFrames={SCENES[3].durationInFrames}>
        <Scene04Alignment />
      </Series.Sequence>

      <Series.Sequence durationInFrames={SCENES[4].durationInFrames}>
        <Scene05Insertion />
      </Series.Sequence>

      <Series.Sequence durationInFrames={SCENES[5].durationInFrames}>
        <Scene06Seating />
      </Series.Sequence>

      <Series.Sequence durationInFrames={SCENES[6].durationInFrames}>
        <Scene07Final />
      </Series.Sequence>
    </Series>
  );
};
