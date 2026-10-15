import { interpolate, Easing } from "remotion";

/**
 * Keyframe tracking data for ePod replacement.
 * Contains position, scale, 3D perspective orientation, and socket center coordinates.
 */
export interface EpodKeyframe {
  /** Relative frame number within the scene or demo */
  frame: number;
  /** Global video frame in Epod3VBatteryInsertion.mp4 */
  videoFrame?: number;
  /** X coordinate of ePod center on 1920x1080 canvas */
  x: number;
  /** Y coordinate of ePod center on 1920x1080 canvas */
  y: number;
  /** Overall scale multiplier for replacement ePod */
  scale: number;
  /** 3D rotation around X axis in degrees (0 = straight top-down, ~58.73 = oblique) */
  rotateX: number;
  /** Rotation around Z axis in degrees */
  rotateZ: number;
  /** Circular disc diameter in pixels */
  diameter: number;
  /** Center X of the battery holder socket relative to ePod center */
  socketOffsetX: number;
  /** Center Y of the battery holder socket relative to ePod center */
  socketOffsetY: number;
  /** Opacity of replacement */
  opacity?: number;
}

/**
 * Scene 5 (Hero Insertion Scene: video frames 893 to 1095, 202 frames total).
 * Prototype runs for 240 frames (8 seconds) covering the complete insertion + lock settle.
 */
export const SCENE_5_VIDEO_START_FRAME = 893;

export const SCENE_5_EPOD_KEYFRAMES: EpodKeyframe[] = [
  // 5A: Hover & start descent (frames 0 to 24) - Camera scale 1.15, panY 120, oblique 58.73 deg
  {
    frame: 0,
    videoFrame: 893,
    x: 968,
    y: 760,
    scale: 1.15,
    rotateX: 58.73,
    rotateZ: 0,
    diameter: 820,
    socketOffsetX: 0,
    socketOffsetY: 0,
    opacity: 1,
  },
  {
    frame: 24,
    videoFrame: 917,
    x: 968,
    y: 760,
    scale: 1.15,
    rotateX: 58.73,
    rotateZ: 0,
    diameter: 820,
    socketOffsetX: 0,
    socketOffsetY: 0,
    opacity: 1,
  },
  // 5B: Approach descent (frames 24 to 76) - Camera scale 1.15 -> 1.25, panY 120 -> 85
  {
    frame: 76,
    videoFrame: 969,
    x: 969,
    y: 730,
    scale: 1.25,
    rotateX: 58.73,
    rotateZ: 0,
    diameter: 820,
    socketOffsetX: 0,
    socketOffsetY: 0,
    opacity: 1,
  },
  // 5C: Tilt from oblique (58.73 deg) to overhead top-down (0 deg) (frames 76 to 108)
  {
    frame: 108,
    videoFrame: 1001,
    x: 940,
    y: 463,
    scale: 1.18,
    rotateX: 0,
    rotateZ: 0,
    diameter: 820,
    socketOffsetX: 0,
    socketOffsetY: 0,
    opacity: 1,
  },
  // 5D: Top-down descent & settle (frames 108 to 202)
  {
    frame: 156,
    videoFrame: 1049,
    x: 940,
    y: 463,
    scale: 1.18,
    rotateX: 0,
    rotateZ: 0,
    diameter: 820,
    socketOffsetX: 0,
    socketOffsetY: 0,
    opacity: 1,
  },
  {
    frame: 202,
    videoFrame: 1095,
    x: 940,
    y: 463,
    scale: 1.18,
    rotateX: 0,
    rotateZ: 0,
    diameter: 820,
    socketOffsetX: 0,
    socketOffsetY: 0,
    opacity: 1,
  },
  // Extended hold / buffer frames (up to 240 / 8 seconds)
  {
    frame: 240,
    videoFrame: 1133,
    x: 940,
    y: 463,
    scale: 1.18,
    rotateX: 0,
    rotateZ: 0,
    diameter: 820,
    socketOffsetX: 0,
    socketOffsetY: 0,
    opacity: 1,
  },
];

/**
 * Computes interpolated ePod tracking state at any given frame.
 */
export function getEpodTracking(
  currentFrame: number,
  keyframes: EpodKeyframe[] = SCENE_5_EPOD_KEYFRAMES
): EpodKeyframe {
  if (keyframes.length === 0) {
    throw new Error("EpodTracking: keyframes array must not be empty.");
  }
  if (currentFrame <= keyframes[0].frame) {
    return keyframes[0];
  }
  if (currentFrame >= keyframes[keyframes.length - 1].frame) {
    return keyframes[keyframes.length - 1];
  }

  // Find surrounding keyframe segments
  let prev = keyframes[0];
  let next = keyframes[keyframes.length - 1];
  for (let i = 0; i < keyframes.length - 1; i++) {
    if (currentFrame >= keyframes[i].frame && currentFrame <= keyframes[i + 1].frame) {
      prev = keyframes[i];
      next = keyframes[i + 1];
      break;
    }
  }

  const progress = (currentFrame - prev.frame) / (next.frame - prev.frame);
  const eased = Easing.inOut(Easing.cubic)(progress);

  const x = interpolate(eased, [0, 1], [prev.x, next.x]);
  const y = interpolate(eased, [0, 1], [prev.y, next.y]);
  const scale = interpolate(eased, [0, 1], [prev.scale, next.scale]);
  const rotateX = interpolate(eased, [0, 1], [prev.rotateX, next.rotateX]);
  const rotateZ = interpolate(eased, [0, 1], [prev.rotateZ, next.rotateZ]);
  const diameter = interpolate(eased, [0, 1], [prev.diameter, next.diameter]);
  const socketOffsetX = interpolate(eased, [0, 1], [prev.socketOffsetX, next.socketOffsetX]);
  const socketOffsetY = interpolate(eased, [0, 1], [prev.socketOffsetY, next.socketOffsetY]);
  const opacity = interpolate(eased, [0, 1], [prev.opacity ?? 1, next.opacity ?? 1]);

  return {
    frame: currentFrame,
    x,
    y,
    scale,
    rotateX,
    rotateZ,
    diameter,
    socketOffsetX,
    socketOffsetY,
    opacity,
  };
}

/**
 * Battery tracking state for the real Duracell CR2032 coin cell.
 */
export interface BatteryState {
  x: number;
  y: number;
  scale: number;
  rotateX: number;
  opacity: number;
  dropShadowBlur: number;
  dropShadowOpacity: number;
  dropShadowOffsetY: number;
}

export function getBatteryTracking(frame: number): BatteryState {
  const epod = getEpodTracking(frame);

  // During frames 0 to 72, the real battery from the video is hovering in clear air.
  // The overlay smoothly fades in from frame 72 to 78 as the battery lowers into the socket area,
  // ensuring exactly ONE battery is visible at all times!
  const layerOpacity = interpolate(frame, [72, 78], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  let batteryScale = 1.0;
  let rotateX = 58.73;
  let shadowBlur = 28;
  let shadowOpacity = 0.45;
  let shadowOffsetY = 22;

  if (frame < 76) {
    rotateX = 58.73;
    batteryScale = 1.0;
  } else if (frame < 108) {
    // 5C: Tilt from oblique to top-down
    const progress = (frame - 76) / (108 - 76);
    const eased = Easing.inOut(Easing.cubic)(progress);
    rotateX = interpolate(eased, [0, 1], [58.73, 0]);
    batteryScale = interpolate(eased, [0, 1], [1.0, 1.12]);
  } else if (frame < 156) {
    // 5D: Top-down descent into socket
    const progress = (frame - 108) / (156 - 108);
    const eased = Easing.out(Easing.cubic)(progress);
    rotateX = 0;
    batteryScale = interpolate(eased, [0, 1], [1.12, 1.0]);
    shadowBlur = interpolate(eased, [0, 1], [28, 4]);
    shadowOpacity = interpolate(eased, [0, 1], [0.45, 0.85]);
    shadowOffsetY = interpolate(eased, [0, 1], [22, 2]);
  } else if (frame < 180) {
    // 5D Settle spring
    rotateX = 0;
    shadowBlur = 3;
    shadowOpacity = 0.9;
    shadowOffsetY = 1;
    const dip = interpolate(frame - 156, [0, 5, 14], [1.0, 0.985, 1.0], {
      extrapolateRight: "clamp",
    });
    batteryScale = dip;
  } else {
    // Fully seated
    rotateX = 0;
    batteryScale = 1.0;
    shadowBlur = 2;
    shadowOpacity = 0.92;
    shadowOffsetY = 1;
  }

  return {
    x: epod.x + epod.socketOffsetX,
    y: epod.y + epod.socketOffsetY,
    scale: epod.scale * batteryScale,
    rotateX,
    opacity: layerOpacity,
    dropShadowBlur: shadowBlur,
    dropShadowOpacity: shadowOpacity,
    dropShadowOffsetY: shadowOffsetY,
  };
}
