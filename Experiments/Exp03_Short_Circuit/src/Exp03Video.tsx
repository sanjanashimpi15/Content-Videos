import React from 'react';
import {Series} from 'remotion';
import {Scene01Title} from './scenes/Scene01Title';
import {Scene02Components} from './scenes/Scene02Components';
import {Scene03CircuitDiagram} from './scenes/Scene03CircuitDiagram';
import {Scene04NormalCircuit} from './scenes/Scene04NormalCircuit';
import {Scene05ThirdWireAnimation} from './scenes/Scene05ThirdWireAnimation';
import {Scene06ShortCircuit} from './scenes/Scene06ShortCircuit';
import {Scene07Explanation} from './scenes/Scene07Explanation';
import {Scene08SafetyWarning} from './scenes/Scene08SafetyWarning';
import {Scene09Disconnect} from './scenes/Scene09Disconnect';

export const EXP03_DURATIONS = {
  scene01: 278,
  scene02: 261,
  scene03: 418,
  scene04: 381,
  scene05: 252,
  scene06: 396,
  scene07: 395,
  scene08: 385,
  scene09: 284
};

export const Exp03Video: React.FC = () => {
  return (
    <div style={{flex: 1, backgroundColor: '#F8FAFC'}}>
      <Series>
        <Series.Sequence durationInFrames={EXP03_DURATIONS.scene01}>
          <Scene01Title />
        </Series.Sequence>
        <Series.Sequence durationInFrames={EXP03_DURATIONS.scene02}>
          <Scene02Components />
        </Series.Sequence>
        <Series.Sequence durationInFrames={EXP03_DURATIONS.scene03}>
          <Scene03CircuitDiagram />
        </Series.Sequence>
        <Series.Sequence durationInFrames={EXP03_DURATIONS.scene04}>
          <Scene04NormalCircuit />
        </Series.Sequence>
        <Series.Sequence durationInFrames={EXP03_DURATIONS.scene05}>
          <Scene05ThirdWireAnimation />
        </Series.Sequence>
        <Series.Sequence durationInFrames={EXP03_DURATIONS.scene06}>
          <Scene06ShortCircuit />
        </Series.Sequence>
        <Series.Sequence durationInFrames={EXP03_DURATIONS.scene07}>
          <Scene07Explanation />
        </Series.Sequence>
        <Series.Sequence durationInFrames={EXP03_DURATIONS.scene08}>
          <Scene08SafetyWarning />
        </Series.Sequence>
        <Series.Sequence durationInFrames={EXP03_DURATIONS.scene09}>
          <Scene09Disconnect />
        </Series.Sequence>
      </Series>
    </div>
  );
};
