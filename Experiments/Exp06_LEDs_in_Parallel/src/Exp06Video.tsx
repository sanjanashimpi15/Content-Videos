import React from 'react';
import {Series} from 'remotion';
import {Scene01Title} from './scenes/Scene01Title';
import {Scene02Components} from './scenes/Scene02Components';
import {Scene03Positioning} from './scenes/Scene03Positioning';
import {Scene04Connection1} from './scenes/Scene04Connection1';
import {Scene05Connection2} from './scenes/Scene05Connection2';
import {Scene06Connection3} from './scenes/Scene06Connection3';
import {Scene07Connection4} from './scenes/Scene07Connection4';
import {Scene08BothOn} from './scenes/Scene08BothOn';
import {Scene09ParallelTheory} from './scenes/Scene09ParallelTheory';
import {Scene10RemoveOneLed} from './scenes/Scene10RemoveOneLed';
import {Scene11Tinkering} from './scenes/Scene11Tinkering';

import timings from '../public/audio/timings.json';

export const EXP06_TOTAL_FRAMES =
  timings['scene-01'].durationFrames +
  timings['scene-02'].durationFrames +
  timings['scene-03'].durationFrames +
  timings['scene-04'].durationFrames +
  timings['scene-05'].durationFrames +
  timings['scene-06'].durationFrames +
  timings['scene-07'].durationFrames +
  timings['scene-08'].durationFrames +
  timings['scene-09'].durationFrames +
  timings['scene-10'].durationFrames +
  timings['scene-11'].durationFrames;

export const Exp06Video: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={timings['scene-01'].durationFrames}>
        <Scene01Title />
      </Series.Sequence>

      <Series.Sequence durationInFrames={timings['scene-02'].durationFrames}>
        <Scene02Components />
      </Series.Sequence>

      <Series.Sequence durationInFrames={timings['scene-03'].durationFrames}>
        <Scene03Positioning />
      </Series.Sequence>

      <Series.Sequence durationInFrames={timings['scene-04'].durationFrames}>
        <Scene04Connection1 />
      </Series.Sequence>

      <Series.Sequence durationInFrames={timings['scene-05'].durationFrames}>
        <Scene05Connection2 />
      </Series.Sequence>

      <Series.Sequence durationInFrames={timings['scene-06'].durationFrames}>
        <Scene06Connection3 />
      </Series.Sequence>

      <Series.Sequence durationInFrames={timings['scene-07'].durationFrames}>
        <Scene07Connection4 />
      </Series.Sequence>

      <Series.Sequence durationInFrames={timings['scene-08'].durationFrames}>
        <Scene08BothOn />
      </Series.Sequence>

      <Series.Sequence durationInFrames={timings['scene-09'].durationFrames}>
        <Scene09ParallelTheory />
      </Series.Sequence>

      <Series.Sequence durationInFrames={timings['scene-10'].durationFrames}>
        <Scene10RemoveOneLed />
      </Series.Sequence>

      <Series.Sequence durationInFrames={timings['scene-11'].durationFrames}>
        <Scene11Tinkering />
      </Series.Sequence>
    </Series>
  );
};
