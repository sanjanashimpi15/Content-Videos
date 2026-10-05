import React from 'react';
import {Composition} from 'remotion';
import {EpodJumperWireVideo, TOTAL_FRAMES} from './EpodJumperWireVideo';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="EpodJumperWireVideo"
      component={EpodJumperWireVideo}
      durationInFrames={TOTAL_FRAMES}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
