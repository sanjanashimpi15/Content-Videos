import React from 'react';
import {Series} from 'remotion';
import {Scene01Title} from './scenes/Scene01Title';
import {Scene02Components} from './scenes/Scene02Components';
import {Scene03CircuitDiagram} from './scenes/Scene03CircuitDiagram';
import {Scene04BuildCircuit} from './scenes/Scene04BuildCircuit';
import {Scene05OpenCircuit} from './scenes/Scene05OpenCircuit';
import {Scene06TouchOpenEnds} from './scenes/Scene06TouchOpenEnds';
import {Scene07SteelTest} from './scenes/Scene07SteelTest';
import {Scene08PaperPlasticTest} from './scenes/Scene08PaperPlasticTest';
import {Scene09ConceptSummary} from './scenes/Scene09ConceptSummary';

export const EXP02_DURATIONS = {
  scene01: 357,
  scene02: 310,
  scene03: 429,
  scene04: 476,
  scene05: 348,
  scene06: 395,
  scene07: 416,
  scene08: 497,
  scene09: 395
};

export const Exp02Video: React.FC = () => {
  return (
    <div style={{flex: 1, backgroundColor: '#F8FAFC'}}>
      <Series>
        <Series.Sequence durationInFrames={EXP02_DURATIONS.scene01}>
          <Scene01Title />
        </Series.Sequence>
        <Series.Sequence durationInFrames={EXP02_DURATIONS.scene02}>
          <Scene02Components />
        </Series.Sequence>
        <Series.Sequence durationInFrames={EXP02_DURATIONS.scene03}>
          <Scene03CircuitDiagram />
        </Series.Sequence>
        <Series.Sequence durationInFrames={EXP02_DURATIONS.scene04}>
          <Scene04BuildCircuit />
        </Series.Sequence>
        <Series.Sequence durationInFrames={EXP02_DURATIONS.scene05}>
          <Scene05OpenCircuit />
        </Series.Sequence>
        <Series.Sequence durationInFrames={EXP02_DURATIONS.scene06}>
          <Scene06TouchOpenEnds />
        </Series.Sequence>
        <Series.Sequence durationInFrames={EXP02_DURATIONS.scene07}>
          <Scene07SteelTest />
        </Series.Sequence>
        <Series.Sequence durationInFrames={EXP02_DURATIONS.scene08}>
          <Scene08PaperPlasticTest />
        </Series.Sequence>
        <Series.Sequence durationInFrames={EXP02_DURATIONS.scene09}>
          <Scene09ConceptSummary />
        </Series.Sequence>
      </Series>
    </div>
  );
};
