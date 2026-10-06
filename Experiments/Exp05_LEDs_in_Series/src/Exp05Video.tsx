import React from 'react';
import {Series} from 'remotion';
import {Scene01Title} from './scenes/Scene01Title';
import {Scene02Objective} from './scenes/Scene02Objective';
import {Scene03Components} from './scenes/Scene03Components';
import {Scene04Positioning} from './scenes/Scene04Positioning';
import {Scene05FirstConnection} from './scenes/Scene05FirstConnection';
import {Scene06SecondConnection} from './scenes/Scene06SecondConnection';
import {Scene07ThirdConnection} from './scenes/Scene07ThirdConnection';
import {Scene08Result} from './scenes/Scene08Result';
import {Scene09SeriesExplanation} from './scenes/Scene09SeriesExplanation';
import {Scene10Tinkering} from './scenes/Scene10Tinkering';

import timings from '../public/audio/timings.json';

export const EXP05_TOTAL_FRAMES =
  timings['scene-01'].durationFrames +
  timings['scene-02'].durationFrames +
  timings['scene-03'].durationFrames +
  timings['scene-04'].durationFrames +
  timings['scene-05'].durationFrames +
  timings['scene-06'].durationFrames +
  timings['scene-07'].durationFrames +
  timings['scene-08'].durationFrames +
  timings['scene-09'].durationFrames +
  timings['scene-10'].durationFrames;

export const Exp05Video: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={timings['scene-01'].durationFrames}>
        <Scene01Title />
      </Series.Sequence>

      <Series.Sequence durationInFrames={timings['scene-02'].durationFrames}>
        <Scene02Objective />
      </Series.Sequence>

      <Series.Sequence durationInFrames={timings['scene-03'].durationFrames}>
        <Scene03Components />
      </Series.Sequence>

      <Series.Sequence durationInFrames={timings['scene-04'].durationFrames}>
        <Scene04Positioning />
      </Series.Sequence>

      <Series.Sequence durationInFrames={timings['scene-05'].durationFrames}>
        <Scene05FirstConnection />
      </Series.Sequence>

      <Series.Sequence durationInFrames={timings['scene-06'].durationFrames}>
        <Scene06SecondConnection />
      </Series.Sequence>

      <Series.Sequence durationInFrames={timings['scene-07'].durationFrames}>
        <Scene07ThirdConnection />
      </Series.Sequence>

      <Series.Sequence durationInFrames={timings['scene-08'].durationFrames}>
        <Scene08Result />
      </Series.Sequence>

      <Series.Sequence durationInFrames={timings['scene-09'].durationFrames}>
        <Scene09SeriesExplanation />
      </Series.Sequence>

      <Series.Sequence durationInFrames={timings['scene-10'].durationFrames}>
        <Scene10Tinkering />
      </Series.Sequence>
    </Series>
  );
};
