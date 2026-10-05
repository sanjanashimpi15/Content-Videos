import React from 'react';
import {Composition} from 'remotion';
import {EpodVideo} from './EpodVideo';
import spec from '../scenes.json';

export const RemotionRoot: React.FC = () => (
  <Composition id="EpodBatteryInsertion" component={EpodVideo}
    durationInFrames={spec.meta.totalFrames} fps={spec.meta.fps}
    width={spec.meta.width} height={spec.meta.height} />
);
