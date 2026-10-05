import React from 'react';
import {Composition} from 'remotion';
import {Exp02Video} from './Exp02Video';

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="Exp02ContinuityTester"
        component={Exp02Video}
        durationInFrames={3623}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
