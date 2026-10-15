import React from 'react';
import { Audio, Series, staticFile } from 'remotion';
import { Scene01Motor } from './scenes/Scene01Motor';
import { Scene02Propeller } from './scenes/Scene02Propeller';
import { Scene03Alignment } from './scenes/Scene03Alignment';
import { Scene04Insertion } from './scenes/Scene04Insertion';
import { Scene05Final } from './scenes/Scene05Final';

export const SCENE_DURATIONS = {
  scene01: 255, // ~8.5s (Narration: 7.39s)
  scene02: 195, // ~6.5s (Narration: 5.59s)
  scene03: 195, // ~6.5s (Narration: 4.99s)
  scene04: 255, // ~8.5s (Narration: 6.98s)
  scene05: 180, // ~6.0s (Narration: 4.51s)
};

export const TOTAL_DURATION =
  SCENE_DURATIONS.scene01 +
  SCENE_DURATIONS.scene02 +
  SCENE_DURATIONS.scene03 +
  SCENE_DURATIONS.scene04 +
  SCENE_DURATIONS.scene05; // 1080 frames (36.0s)

export const PropellerMotorVideo: React.FC = () => {
  return (
    <div style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <Series>
        {/* Scene 1: Introduce DC Motor */}
        <Series.Sequence durationInFrames={SCENE_DURATIONS.scene01}>
          <Scene01Motor />
          <Audio src={staticFile('audio/scene-01.mp3')} />
        </Series.Sequence>

        {/* Scene 2: Introduce Propeller */}
        <Series.Sequence durationInFrames={SCENE_DURATIONS.scene02}>
          <Scene02Propeller />
          <Audio src={staticFile('audio/scene-02.mp3')} />
        </Series.Sequence>

        {/* Scene 3: Align Propeller */}
        <Series.Sequence durationInFrames={SCENE_DURATIONS.scene03}>
          <Scene03Alignment />
          <Audio src={staticFile('audio/scene-03.mp3')} />
        </Series.Sequence>

        {/* Scene 4: Insert Propeller onto Shaft */}
        <Series.Sequence durationInFrames={SCENE_DURATIONS.scene04}>
          <Scene04Insertion />
          <Audio src={staticFile('audio/scene-04.mp3')} />
        </Series.Sequence>

        {/* Scene 5: Final Assembled View */}
        <Series.Sequence durationInFrames={SCENE_DURATIONS.scene05}>
          <Scene05Final />
          <Audio src={staticFile('audio/scene-05.mp3')} />
        </Series.Sequence>
      </Series>
    </div>
  );
};
