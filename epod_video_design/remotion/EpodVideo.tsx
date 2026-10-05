import React from 'react';
import {AbsoluteFill, Sequence, OffthreadVideo, Freeze, Img, Audio, staticFile, useCurrentFrame, interpolate} from 'remotion';
import spec from '../scenes.json';
import {Ring, Arrow, Label, StepBadge, Polarity, Check, LowerThird, zoomScale, project, fade, C, FONT} from './Overlays';

const W = spec.meta.width;
const H = spec.meta.height;
const FPS = spec.meta.fps;

// ---------- Footage scene: real video + zoom + SVG overlays ----------
const FootageScene: React.FC<{scene: any}> = ({scene}) => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const zs = zoomScale(scene.zoom, t);
  const srcFrames = Math.round((scene.source.toSec - scene.source.fromSec) * FPS);
  const startFrom = Math.round(scene.source.fromSec * FPS);

  // Real footage only. The zoom is a CSS transform on the real video.
  const cx = Math.min(Math.max(zs.cx, 0.5 / zs.s), 1 - 0.5 / zs.s);
  const cy = Math.min(Math.max(zs.cy, 0.5 / zs.s), 1 - 0.5 / zs.s);
  const videoStyle: React.CSSProperties = {
    width: W, height: H, transformOrigin: `${cx * 100}% ${cy * 100}%`, transform: `scale(${zs.s})`,
  };
  const video = <OffthreadVideo src={staticFile('epod_source_1080p.mp4')} startFrom={startFrom} muted style={videoStyle} />;

  // Overlay positions are normalised to the SOURCE frame, then projected through the zoom.
  const pr = (p: {x: number; y: number}) => project(p, zs);

  return (
    <AbsoluteFill style={{backgroundColor: '#fff'}}>
      {frame >= srcFrames ? <Freeze frame={srcFrames - 1}>{video}</Freeze> : video}
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute', inset: 0}}>
        {scene.overlays.map((o: any, i: number) => {
          switch (o.type) {
            case 'ring': { const p = pr({x: o.x, y: o.y}); return <Ring key={i} x={p.x * W} y={p.y * H} r={o.r * W * zs.s} t={t} t0={o.t0} t1={o.t1} />; }
            case 'arrow': { const a = pr(o.from); const b = pr(o.to); return <Arrow key={i} a={{x: a.x * W, y: a.y * H}} b={{x: b.x * W, y: b.y * H}} t={t} t0={o.t0} t1={o.t1} />; }
            case 'label': { const a = pr(o.anchor); return <Label key={i} anchor={a} box={o.box} text={o.text} sub={o.sub || undefined} t={t} t0={o.t0} t1={o.t1} W={W} H={H} />; }
            case 'stepBadge': return <StepBadge key={i} n={o.n} text={o.text} t={t} t0={o.t0} t1={o.t1} W={W} H={H} />;
            case 'polarity': return <Polarity key={i} text={o.text} box={o.box} t={t} t0={o.t0} t1={o.t1} W={W} H={H} />;
            case 'check': return <Check key={i} box={o.box} t={t} t0={o.t0} t1={o.t1} W={W} H={H} />;
            case 'lowerThird': return <LowerThird key={i} title={o.title} subtitle={o.subtitle} t={t} t0={o.t0} t1={o.t1} W={W} H={H} />;
            default: return null;
          }
        })}
      </svg>
    </AbsoluteFill>
  );
};

// ---------- Diagram scene: generated explanatory graphic only ----------
const DiagramScene: React.FC<{scene: any}> = ({scene}) => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const dur = scene.out.durationSec;
  return (
    <AbsoluteFill style={{backgroundColor: '#fff', fontFamily: FONT}}>
      <div style={{position: 'absolute', top: 60, width: '100%', textAlign: 'center', fontSize: 56, fontWeight: 700, color: C.navy}}>Inserting the CR2032 battery</div>
      <div style={{position: 'absolute', top: 140, width: '100%', textAlign: 'center', fontSize: 30, color: C.grey}}>Position → Lower → Press flat → Check</div>
      {scene.reveal.map((r: any, i: number) => {
        const o = interpolate(t, [r.t, r.t + 0.5], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        const y = interpolate(t, [r.t, r.t + 0.5], [20, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        return <Img key={r.id} src={staticFile(r.asset)} style={{position: 'absolute', left: 80 + i * 600, top: 230 + y, width: 560, height: 700, opacity: o}} />;
      })}
      <div style={{position: 'absolute', bottom: 40, width: '100%', textAlign: 'center', fontSize: 22, color: C.grey, opacity: fade(t, 0.3, dur)}}>
        Schematic for explanation only, not to scale. The real Battery ePod is shown in the video.
      </div>
    </AbsoluteFill>
  );
};

export const EpodVideo: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: '#fff'}}>
    {(spec.scenes as any[]).map((s) => (
      <Sequence key={s.id} from={s.out.fromFrame} durationInFrames={s.out.durationFrames} name={`${s.id} ${s.title}`}>
        {s.kind === 'diagram' ? <DiagramScene scene={s} /> : <FootageScene scene={s} />}
        {/* Narration: one clip per scene, generated or recorded separately (public/audio/S01.mp3 ...) */}
        <Sequence from={Math.round(s.narration.startSec * FPS)}>
          <Audio src={staticFile(`audio/${s.id}.mp3`)} />
        </Sequence>
      </Sequence>
    ))}
  </AbsoluteFill>
);
