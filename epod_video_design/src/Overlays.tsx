import React from 'react';
import {interpolate, Easing} from 'remotion';

export const C = {navy: '#12263A', amber: '#F5A300', grey: '#4A5B6C', green: '#1E9E5A', white: '#FFFFFF', soft: '#C9D6E3'};
export const FONT = "Inter, 'Segoe UI', Helvetica, Arial, sans-serif";

export type Zoom = {t0: number; t1: number; scale: number; cx: number; cy: number; easeIn: number; easeOut: number};
export type Pt = {x: number; y: number};

/** Current zoom scale for time t (seconds from scene start). */
export const zoomScale = (zooms: Zoom[], t: number) => {
  for (const z of zooms) {
    if (t >= z.t0 && t <= z.t1) {
      const k = interpolate(t, [z.t0, z.t0 + z.easeIn, z.t1 - z.easeOut, z.t1], [1, z.scale, z.scale, 1], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic),
      });
      return {s: k, cx: z.cx, cy: z.cy, active: true};
    }
  }
  return {s: 1, cx: 0.5, cy: 0.5, active: false};
};

/** Maps a normalised source-frame point to a normalised output-screen point under the current zoom. */
export const project = (p: Pt, zs: {s: number; cx: number; cy: number}): Pt => {
  const cx = Math.min(Math.max(zs.cx, 0.5 / zs.s), 1 - 0.5 / zs.s);
  const cy = Math.min(Math.max(zs.cy, 0.5 / zs.s), 1 - 0.5 / zs.s);
  return {x: 0.5 + zs.s * (p.x - cx), y: 0.5 + zs.s * (p.y - cy)};
};

/** Opacity envelope: fade in/out over 0.3 s inside [t0, t1]. */
export const fade = (t: number, t0: number, t1: number, f = 0.3) =>
  interpolate(t, [t0, t0 + f, t1 - f, t1], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

const textW = (s: string, size: number) => s.length * size * 0.56;

export const Ring: React.FC<{x: number; y: number; r: number; t: number; t0: number; t1: number}> = ({x, y, r, t, t0, t1}) => {
  const pulse = 1 + 0.05 * Math.sin((t - t0) * 2 * Math.PI / 1.6);
  const o = fade(t, t0, t1);
  return (
    <g opacity={o}>
      <circle cx={x} cy={y} r={r * pulse} fill="none" stroke={C.navy} strokeWidth={13} opacity={0.55} />
      <circle cx={x} cy={y} r={r * pulse} fill="none" stroke={C.amber} strokeWidth={7} />
    </g>
  );
};

export const Arrow: React.FC<{a: Pt; b: Pt; t: number; t0: number; t1: number}> = ({a, b, t, t0, t1}) => {
  const draw = interpolate(t, [t0, t0 + 0.8], [0, 1], {extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  const nudge = t > t0 + 0.8 ? 8 * Math.sin((t - t0 - 0.8) * 2 * Math.PI / 1.4) : 0;
  const ang = Math.atan2(b.y - a.y, b.x - a.x);
  const ex = a.x + (b.x - a.x) * draw + Math.cos(ang) * nudge;
  const ey = a.y + (b.y - a.y) * draw + Math.sin(ang) * nudge;
  const h = 34;
  const p1 = `${ex},${ey}`;
  const p2 = `${ex - h * Math.cos(ang - 0.45)},${ey - h * Math.sin(ang - 0.45)}`;
  const p3 = `${ex - h * Math.cos(ang + 0.45)},${ey - h * Math.sin(ang + 0.45)}`;
  return (
    <g opacity={fade(t, t0, t1)}>
      <line x1={a.x} y1={a.y} x2={ex} y2={ey} stroke={C.navy} strokeWidth={17} strokeLinecap="round" opacity={0.55} />
      <line x1={a.x} y1={a.y} x2={ex} y2={ey} stroke={C.amber} strokeWidth={9} strokeLinecap="round" />
      <polygon points={`${p1} ${p2} ${p3}`} fill={C.amber} stroke={C.navy} strokeWidth={3} strokeLinejoin="round" />
    </g>
  );
};

export const Label: React.FC<{anchor: Pt; box: Pt; text: string; sub?: string; t: number; t0: number; t1: number; W: number; H: number}> =
({anchor, box, text, sub, t, t0, t1, W, H}) => {
  const fs = 34, ss = 24, pad = 26;
  const w = Math.max(textW(text, fs), sub ? textW(sub, ss) : 0) + pad * 2 + 14;
  const h = sub ? 96 : 66;
  const bx = box.x * W, by = box.y * H;
  return (
    <g opacity={fade(t, t0, t1)}>
      <line x1={anchor.x * W} y1={anchor.y * H} x2={bx} y2={by} stroke={C.amber} strokeWidth={4} />
      <circle cx={anchor.x * W} cy={anchor.y * H} r={8} fill={C.amber} stroke={C.navy} strokeWidth={3} />
      <rect x={bx - w / 2} y={by - h / 2} width={w} height={h} rx={14} fill={C.navy} />
      <rect x={bx - w / 2} y={by - h / 2} width={9} height={h} rx={4} fill={C.amber} />
      <text x={bx - w / 2 + pad + 6} y={sub ? by - 8 : by + 12} fontFamily={FONT} fontWeight={700} fontSize={fs} fill={C.white}>{text}</text>
      {sub && <text x={bx - w / 2 + pad + 6} y={by + 28} fontFamily={FONT} fontSize={ss} fill={C.soft}>{sub}</text>}
    </g>
  );
};

export const StepBadge: React.FC<{n: number; text: string; t: number; t0: number; t1: number; W: number; H: number}> = ({n, text, t, t0, t1, W, H}) => {
  const w = textW(text, 32) + 150;
  const slide = interpolate(t, [t0, t0 + 0.4], [-30, 0], {extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  return (
    <g opacity={fade(t, t0, t1)} transform={`translate(${64 + slide}, ${64})`}>
      <rect width={w} height={92} rx={46} fill={C.navy} />
      <circle cx={46} cy={46} r={32} fill={C.amber} />
      <text x={46} y={58} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={36} fill={C.navy}>{n}</text>
      <text x={98} y={58} fontFamily={FONT} fontSize={32} fill={C.white}>{text}</text>
    </g>
  );
};

export const Polarity: React.FC<{text: string; box: Pt; t: number; t0: number; t1: number; W: number; H: number}> = ({text, box, t, t0, t1, W, H}) => {
  const w = textW(text, 30) + 150;
  return (
    <g opacity={fade(t, t0, t1)} transform={`translate(${box.x * W - w / 2}, ${box.y * H - 46})`}>
      <rect width={w} height={92} rx={46} fill={C.navy} />
      <circle cx={46} cy={46} r={32} fill={C.amber} />
      <text x={46} y={60} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={44} fill={C.navy}>+</text>
      <text x={98} y={58} fontFamily={FONT} fontSize={30} fill={C.white}>{text}</text>
    </g>
  );
};

export const Check: React.FC<{box: Pt; t: number; t0: number; t1: number; W: number; H: number}> = ({box, t, t0, t1, W, H}) => {
  const pop = interpolate(t, [t0, t0 + 0.35], [0.6, 1], {extrapolateRight: 'clamp', easing: Easing.out(Easing.back(2))});
  return (
    <g opacity={fade(t, t0, t1)} transform={`translate(${box.x * W}, ${box.y * H - 96}) scale(${pop})`}>
      <circle r={42} fill={C.green} stroke={C.white} strokeWidth={5} />
      <path d="M-20 2 l14 15 l27 -32" fill="none" stroke={C.white} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
};

export const LowerThird: React.FC<{title: string; subtitle: string; t: number; t0: number; t1: number; W: number; H: number}> = ({title, subtitle, t, t0, t1, W, H}) => {
  const slide = interpolate(t, [t0, t0 + 0.5], [-60, 0], {extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  return (
    <g opacity={fade(t, t0, t1, 0.5)} transform={`translate(${80 + slide}, ${H - 260})`}>
      <rect width={1100} height={150} rx={6} fill={C.navy} opacity={0.94} />
      <rect width={12} height={150} fill={C.amber} />
      <text x={48} y={66} fontFamily={FONT} fontWeight={700} fontSize={50} fill={C.white}>{title}</text>
      <text x={48} y={112} fontFamily={FONT} fontSize={30} fill={C.soft}>{subtitle}</text>
    </g>
  );
};
