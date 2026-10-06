import React from 'react';
import {Composition} from 'remotion';
import {Exp08Video, EXP08_TOTAL_FRAMES} from './Exp08Video';

export const Root: React.FC = () => {
  return (
    <Composition
      id="Exp08LightControlMomentary"
      component={Exp08Video}
      durationInFrames={EXP08_TOTAL_FRAMES}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
