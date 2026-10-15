export interface SceneTiming {
  id: string;
  name: string;
  audioFile: string;
  subtitle: string;
  leadInFrames: number;
  audioFrames: number;
  tailFrames: number;
  durationInFrames: number;
}

export const SCENES: SceneTiming[] = [
  {
    id: "scene-01",
    name: "Intro",
    audioFile: "audio/scene-01.mp3",
    subtitle: "Next, we will insert the 3-volt button battery into the Battery ePod.",
    leadInFrames: 12,
    audioFrames: 175,
    tailFrames: 15,
    durationInFrames: 202,
  },
  {
    id: "scene-02",
    name: "Show Battery",
    audioFile: "audio/scene-02.mp3",
    subtitle: "Use the 3-volt button battery from your kit. Keep the printed, shiny side facing up.",
    leadInFrames: 9,
    audioFrames: 233,
    tailFrames: 12,
    durationInFrames: 254,
  },
  {
    id: "scene-03",
    name: "Battery Holder",
    audioFile: "audio/scene-03.mp3",
    subtitle: "The Battery ePod has a battery holder. The battery will be placed into this holder, which keeps it in place.",
    leadInFrames: 9,
    audioFrames: 271,
    tailFrames: 12,
    durationInFrames: 292,
  },
  {
    id: "scene-04",
    name: "Alignment",
    audioFile: "audio/scene-04.mp3",
    subtitle: "Align the battery with the circular battery holder.",
    leadInFrames: 9,
    audioFrames: 124,
    tailFrames: 12,
    durationInFrames: 145,
  },
  {
    id: "scene-05",
    name: "Insertion",
    audioFile: "audio/scene-05.mp3",
    subtitle: "Now lower the battery straight down into the holder, with the printed side up.",
    leadInFrames: 12,
    audioFrames: 172,
    tailFrames: 18,
    durationInFrames: 202,
  },
  {
    id: "scene-06",
    name: "Seating / Lock",
    audioFile: "audio/scene-06.mp3",
    subtitle: "Gently press the battery down until it sits properly in the holder. The holder locks the battery in place.",
    leadInFrames: 9,
    audioFrames: 257,
    tailFrames: 15,
    durationInFrames: 281,
  },
  {
    id: "scene-07",
    name: "Final View",
    audioFile: "audio/scene-07.mp3",
    subtitle: "The 3-volt battery is now inserted in the Battery ePod, and it is ready to be connected.",
    leadInFrames: 9,
    audioFrames: 202,
    tailFrames: 75, // 2.5s hold on final frame
    durationInFrames: 286,
  },
];

export const TOTAL_FRAMES = SCENES.reduce((sum, s) => sum + s.durationInFrames, 0);

// Key synchronization cue frames (relative to their individual scenes)
export const CUES = {
  // Scene 4 cues
  SCENE_4_ALIGN_START: 10,
  SCENE_4_SNAP_GREEN: 28, // When "Align" is spoken

  // Scene 5 Phase Boundaries (APPROACH -> TILT-TO-TOP-VIEW -> SEAT)
  HOVER_START: 0,
  APPROACH_START: 24,  // When "lower" begins -> oblique descent h: 1.0 -> 0.45
  TILT_START: 76,      // 5C start: camera tilts from oblique to top-down
  TILT_END: 108,      // 5C end: t = 1.0 (straight overhead)
  DESCENT_START: 108, // 5D start: top-down insertion scale: 1.12 -> 1.00
  SETTLE_START: 156,  // Final settle spring 1.00 -> 0.985 -> 1.00
  SEATED_FRAME: 180,  // Fully seated, pixel-matched to baked REF-4 battery

  // Scene 6 cues (Top-Down Seated / Lock)
  SCENE_6_PRESS_START: 20,
  SCENE_6_SITS_PROPERLY: 95, // When "sits properly" spoken -> gentle contact settle
  SCENE_6_LOCK_FLASH: 155,   // When "locks" spoken -> SECURED badge + ring flash
  SCENE_6_STRIP_GLOW: 165,   // Locking strip highlight glow

  // Scene 7 cues (Top-Down Final View)
  SCENE_7_PULL_BACK_START: 15,
  SCENE_7_PULL_BACK_END: 85,
};

// Video constants
export const VIDEO_CONFIG = {
  width: 1920,
  height: 1080,
  fps: 30,
};
