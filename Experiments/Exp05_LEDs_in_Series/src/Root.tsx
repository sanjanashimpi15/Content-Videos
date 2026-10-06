import React from 'react';
import {Composition} from 'remotion';
import {Exp05Video, EXP05_TOTAL_FRAMES} from './Exp05Video';

export const Root: React.FC = () => {
  return (
    <Composition
      id="Exp05LEDsInSeries"
      component={Exp05Video}
      durationInFrames={EXP05_TOTAL_FRAMES}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
