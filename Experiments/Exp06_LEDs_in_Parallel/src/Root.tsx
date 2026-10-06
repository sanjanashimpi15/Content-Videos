import React from 'react';
import {Composition} from 'remotion';
import {Exp06Video, EXP06_TOTAL_FRAMES} from './Exp06Video';

export const Root: React.FC = () => {
  return (
    <Composition
      id="Exp06LEDsInParallel"
      component={Exp06Video}
      durationInFrames={EXP06_TOTAL_FRAMES}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
