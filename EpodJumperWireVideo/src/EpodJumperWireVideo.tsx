import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {Scene01Intro} from './scenes/Scene01Intro';
import {Scene02Led} from './scenes/Scene02Led';
import {Scene03Battery} from './scenes/Scene03Battery';
import {Scene04Positioning} from './scenes/Scene04Positioning';
import {Scene05WireConnection} from './scenes/Scene05WireConnection';
import {Scene06Final} from './scenes/Scene06Final';

export const SCENE_DURATIONS = {
  scene1: 210, // ~7.0s
  scene2: 210, // ~7.0s
  scene3: 225, // ~7.5s
  scene4: 240, // ~8.0s
  scene5: 360, // ~12.0s
  scene6: 195  // ~6.5s
};

export const TOTAL_FRAMES =
  SCENE_DURATIONS.scene1 +
  SCENE_DURATIONS.scene2 +
  SCENE_DURATIONS.scene3 +
  SCENE_DURATIONS.scene4 +
  SCENE_DURATIONS.scene5 +
  SCENE_DURATIONS.scene6; // 1440 frames = 48s

export const EpodJumperWireVideo: React.FC = () => {
  const s1Start = 0;
  const s2Start = s1Start + SCENE_DURATIONS.scene1;
  const s3Start = s2Start + SCENE_DURATIONS.scene2;
  const s4Start = s3Start + SCENE_DURATIONS.scene3;
  const s5Start = s4Start + SCENE_DURATIONS.scene4;
  const s6Start = s5Start + SCENE_DURATIONS.scene5;

  return (
    <AbsoluteFill style={{backgroundColor: '#FFFFFF'}}>
      {/* SCENE 1: JUMPER WIRES INTRO */}
      <Sequence from={s1Start} durationInFrames={SCENE_DURATIONS.scene1} name="Scene 1: Jumper Wires Intro">
        <Scene01Intro />
        <Sequence from={10}>
          <Audio src={staticFile('audio/scene-01.mp3')} />
        </Sequence>
      </Sequence>

      {/* SCENE 2: LED EPOD */}
      <Sequence from={s2Start} durationInFrames={SCENE_DURATIONS.scene2} name="Scene 2: LED ePod">
        <Scene02Led />
        <Sequence from={10}>
          <Audio src={staticFile('audio/scene-02.mp3')} />
        </Sequence>
      </Sequence>

      {/* SCENE 3: 3V BATTERY EPOD */}
      <Sequence from={s3Start} durationInFrames={SCENE_DURATIONS.scene3} name="Scene 3: 3V Battery ePod">
        <Scene03Battery />
        <Sequence from={10}>
          <Audio src={staticFile('audio/scene-03.mp3')} />
        </Sequence>
      </Sequence>

      {/* SCENE 4: POSITION BOTH EPODS */}
      <Sequence from={s4Start} durationInFrames={SCENE_DURATIONS.scene4} name="Scene 4: Position Both ePods">
        <Scene04Positioning />
        <Sequence from={10}>
          <Audio src={staticFile('audio/scene-04.mp3')} />
        </Sequence>
      </Sequence>

      {/* SCENE 5: JUMPER WIRE CONNECTION */}
      <Sequence from={s5Start} durationInFrames={SCENE_DURATIONS.scene5} name="Scene 5: Jumper Wire Connection">
        <Scene05WireConnection />
        <Sequence from={10}>
          <Audio src={staticFile('audio/scene-05.mp3')} />
        </Sequence>
      </Sequence>

      {/* SCENE 6: FINAL CONNECTED SETUP */}
      <Sequence from={s6Start} durationInFrames={SCENE_DURATIONS.scene6} name="Scene 6: Final Connected Setup">
        <Scene06Final />
        <Sequence from={10}>
          <Audio src={staticFile('audio/scene-06.mp3')} />
        </Sequence>
      </Sequence>
    </AbsoluteFill>
  );
};
