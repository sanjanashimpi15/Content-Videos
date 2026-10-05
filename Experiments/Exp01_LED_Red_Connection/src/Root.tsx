import React from 'react';
import {Composition} from 'remotion';
import {Exp01Video} from './Exp01Video';

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="Exp01LEDRedConnection"
        component={Exp01Video}
        durationInFrames={3169}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
