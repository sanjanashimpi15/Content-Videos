import React from 'react';
import { Composition } from 'remotion';
import { PropellerMotorVideo, TOTAL_DURATION } from './PropellerMotorVideo';

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="PropellerMotorVideo"
        component={PropellerMotorVideo}
        durationInFrames={TOTAL_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
