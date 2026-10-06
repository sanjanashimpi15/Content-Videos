import React from 'react';
import {Series} from 'remotion';
import {Scene01Title} from './scenes/Scene01Title';
import {Scene02Components} from './scenes/Scene02Components';
import {Scene03Positioning} from './scenes/Scene03Positioning';
import {Scene04Connection1} from './scenes/Scene04Connection1';
import {Scene05Connection2} from './scenes/Scene05Connection2';
import {Scene06Connection3} from './scenes/Scene06Connection3';
import {Scene07SwitchReleased} from './scenes/Scene07SwitchReleased';
import {Scene08PressSwitch} from './scenes/Scene08PressSwitch';
import {Scene09HoldSwitch} from './scenes/Scene09HoldSwitch';
import {Scene10ReleaseSwitch} from './scenes/Scene10ReleaseSwitch';
import {Scene11MomentaryConcept} from './scenes/Scene11MomentaryConcept';
import {Scene12ConceptSummary} from './scenes/Scene12ConceptSummary';
import {Scene13Tinkering} from './scenes/Scene13Tinkering';

import timings from '../public/audio/timings.json';

export const EXP08_TOTAL_FRAMES =
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
  timings['scene-11'].durationFrames +
  timings['scene-12'].durationFrames +
  timings['scene-13'].durationFrames;

export const Exp08Video: React.FC = () => {
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
        <Scene07SwitchReleased />
      </Series.Sequence>

      <Series.Sequence durationInFrames={timings['scene-08'].durationFrames}>
        <Scene08PressSwitch />
      </Series.Sequence>

      <Series.Sequence durationInFrames={timings['scene-09'].durationFrames}>
        <Scene09HoldSwitch />
      </Series.Sequence>

      <Series.Sequence durationInFrames={timings['scene-10'].durationFrames}>
        <Scene10ReleaseSwitch />
      </Series.Sequence>

      <Series.Sequence durationInFrames={timings['scene-11'].durationFrames}>
        <Scene11MomentaryConcept />
      </Series.Sequence>

      <Series.Sequence durationInFrames={timings['scene-12'].durationFrames}>
        <Scene12ConceptSummary />
      </Series.Sequence>

      <Series.Sequence durationInFrames={timings['scene-13'].durationFrames}>
        <Scene13Tinkering />
      </Series.Sequence>
    </Series>
  );
};
