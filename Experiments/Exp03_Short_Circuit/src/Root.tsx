import React from 'react';
import {Composition} from 'remotion';
import {Exp03Video} from './Exp03Video';

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="Exp03ShortCircuit"
        component={Exp03Video}
        durationInFrames={3050}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
