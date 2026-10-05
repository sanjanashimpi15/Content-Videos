import React from 'react';
import {Series} from 'remotion';
import {Scene01Title} from './scenes/Scene01Title';
import {Scene02Components} from './scenes/Scene02Components';
import {Scene03CircuitDiagram} from './scenes/Scene03CircuitDiagram';
import {Scene04BuildCircuit} from './scenes/Scene04BuildCircuit';
import {Scene05PencilLeadAsFuse} from './scenes/Scene05PencilLeadAsFuse';
import {Scene06BreakPencilLead} from './scenes/Scene06BreakPencilLead';
import {Scene07LedOff} from './scenes/Scene07LedOff';
import {Scene08FuseConcept} from './scenes/Scene08FuseConcept';
import {Scene09Tinkering} from './scenes/Scene09Tinkering';

export const EXP04_DURATIONS = {
  scene01: 339,
  scene02: 370,
  scene03: 332,
  scene04: 365,
  scene05: 344,
  scene06: 221,
  scene07: 432,
  scene08: 458,
  scene09: 261
};

export const Exp04Video: React.FC = () => {
  return (
    <div style={{flex: 1, backgroundColor: '#F8FAFC'}}>
      <Series>
        <Series.Sequence durationInFrames={EXP04_DURATIONS.scene01}>
          <Scene01Title />
        </Series.Sequence>
        <Series.Sequence durationInFrames={EXP04_DURATIONS.scene02}>
          <Scene02Components />
        </Series.Sequence>
        <Series.Sequence durationInFrames={EXP04_DURATIONS.scene03}>
          <Scene03CircuitDiagram />
        </Series.Sequence>
        <Series.Sequence durationInFrames={EXP04_DURATIONS.scene04}>
          <Scene04BuildCircuit />
        </Series.Sequence>
        <Series.Sequence durationInFrames={EXP04_DURATIONS.scene05}>
          <Scene05PencilLeadAsFuse />
        </Series.Sequence>
        <Series.Sequence durationInFrames={EXP04_DURATIONS.scene06}>
          <Scene06BreakPencilLead />
        </Series.Sequence>
        <Series.Sequence durationInFrames={EXP04_DURATIONS.scene07}>
          <Scene07LedOff />
        </Series.Sequence>
        <Series.Sequence durationInFrames={EXP04_DURATIONS.scene08}>
          <Scene08FuseConcept />
        </Series.Sequence>
        <Series.Sequence durationInFrames={EXP04_DURATIONS.scene09}>
          <Scene09Tinkering />
        </Series.Sequence>
      </Series>
    </div>
  );
};
