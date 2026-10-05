import React from 'react';
import {Series} from 'remotion';
import {Scene01Title} from './scenes/Scene01Title';
import {Scene02Components} from './scenes/Scene02Components';
import {Scene03CircuitDiagram} from './scenes/Scene03CircuitDiagram';
import {Scene04Positioning} from './scenes/Scene04Positioning';
import {Scene05FirstConnection} from './scenes/Scene05FirstConnection';
import {Scene06SecondConnection} from './scenes/Scene06SecondConnection';
import {Scene07LedGlows} from './scenes/Scene07LedGlows';
import {Scene08Explanation} from './scenes/Scene08Explanation';
import {Scene09Tinkering} from './scenes/Scene09Tinkering';
import {Scene10Recap} from './scenes/Scene10Recap';

export const EXP01_DURATIONS = {
  scene01: 321,
  scene02: 257,
  scene03: 455,
  scene04: 274,
  scene05: 269,
  scene06: 253,
  scene07: 321,
  scene08: 536,
  scene09: 265,
  scene10: 218
};

export const Exp01Video: React.FC = () => {
  return (
    <div style={{flex: 1, backgroundColor: '#F8FAFC'}}>
      <Series>
        <Series.Sequence durationInFrames={EXP01_DURATIONS.scene01}>
          <Scene01Title />
        </Series.Sequence>
        <Series.Sequence durationInFrames={EXP01_DURATIONS.scene02}>
          <Scene02Components />
        </Series.Sequence>
        <Series.Sequence durationInFrames={EXP01_DURATIONS.scene03}>
          <Scene03CircuitDiagram />
        </Series.Sequence>
        <Series.Sequence durationInFrames={EXP01_DURATIONS.scene04}>
          <Scene04Positioning />
        </Series.Sequence>
        <Series.Sequence durationInFrames={EXP01_DURATIONS.scene05}>
          <Scene05FirstConnection />
        </Series.Sequence>
        <Series.Sequence durationInFrames={EXP01_DURATIONS.scene06}>
          <Scene06SecondConnection />
        </Series.Sequence>
        <Series.Sequence durationInFrames={EXP01_DURATIONS.scene07}>
          <Scene07LedGlows />
        </Series.Sequence>
        <Series.Sequence durationInFrames={EXP01_DURATIONS.scene08}>
          <Scene08Explanation />
        </Series.Sequence>
        <Series.Sequence durationInFrames={EXP01_DURATIONS.scene09}>
          <Scene09Tinkering />
        </Series.Sequence>
        <Series.Sequence durationInFrames={EXP01_DURATIONS.scene10}>
          <Scene10Recap />
        </Series.Sequence>
      </Series>
    </div>
  );
};
