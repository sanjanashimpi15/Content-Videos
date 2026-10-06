import React from 'react';
import {Composition} from 'remotion';
import {Exp07Video, EXP07_TOTAL_FRAMES} from './Exp07Video';

export const Root: React.FC = () => {
  return (
    <Composition
      id="Exp07LEDsInComplexCircuit"
      component={Exp07Video}
      durationInFrames={EXP07_TOTAL_FRAMES}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
