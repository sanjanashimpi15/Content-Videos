// Calibration constants measured from authentic photographic plates

export const SHOW_CALIBRATION = false; // Toggle to true for calibration inspection QA

export const CALIBRATION = {
  // 1. OBLIQUE VIEW (epod_body_oblique.png, 1240 x 566 pixel space)
  oblique: {
    plateWidth: 1240,
    plateHeight: 566,
    // Centre of the holder's inner circular opening (floor ring)
    holderCenter: { x: 648, y: 195 },
    // Ellipse radii of the inner circular opening
    holderInnerRx: 210,
    holderInnerRy: 109,
    // Derived board tilt angle: ry / rx = cos(boardRotateX) -> 109 / 210 = 0.5190 -> 58.73 deg
    boardRotateX: 58.73,
    // Battery disc is slightly smaller than holder inner opening (0.94 ratio from REF-4)
    batteryRadiusSeated: 210 * 0.94, // 197.4 px (diameter = 394.8 px)
    // Height units: 1 h-unit corresponds to hover height above seated
    hoverDeltaY: -280, // pixels above seated at h = 1.0 (clear above rim)
  },

  // 2. TOP-DOWN VIEW (epod_body_topdown_inserted.png, 1400 x 898 pixel space)
  topDown: {
    plateWidth: 1400,
    plateHeight: 898,
    // Centre of holder / battery in top-down plate
    holderCenterTD: { x: 702, y: 435 },
    batterySeatedCenterTD: { x: 702, y: 435 },
    // Battery disc radius in top-down plate
    batteryRadiusTD: 217, // diameter = 434 px
    // Holder inner radius in top-down plate (for the soft black backing disc)
    holderInnerRadiusTD: 230,
    // S_hover: scale when hovering just above holder in top view
    scaleHover: 1.12,
  },

  // 3. CANVAS LAYOUT (1920 x 1080 screen space)
  screen: {
    width: 1920,
    height: 1080,
    // Screen position of oblique plate origin
    obliqueLeft: (1920 - 1240) / 2, // 340
    obliqueTop: (1080 - 566) / 2,  // 257
    // Screen position of top-down plate origin (when unshifted)
    topDownLeft: (1920 - 1400) / 2, // 260
    topDownTop: (1080 - 898) / 2,  // 91
  },
};
