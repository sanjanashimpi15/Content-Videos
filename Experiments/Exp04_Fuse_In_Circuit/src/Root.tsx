import React from 'react';
import {Composition} from 'remotion';
import {Exp04Video} from './Exp04Video';

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="Exp04FuseInCircuit"
        component={Exp04Video}
        durationInFrames={3122}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
