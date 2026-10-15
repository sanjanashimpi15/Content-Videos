import React from "react";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Battery } from "./Battery";
import { BatteryEpod } from "./BatteryEpod";
import { CALIBRATION, SHOW_CALIBRATION } from "../config/calibration";
import { CUES } from "../config/timing";

interface BatteryInsertionProps {
  customH?: number; // 0 = seated, 1.0 = hover (used for manual / Scene 4)
  customT?: number; // 0 = oblique, 1 = top-down
  showArrow?: boolean;
  arrowLabel?: string;
  isScene5Hero?: boolean;
  showTargetRing?: boolean;
  isTargetAligned?: boolean;
  showGuideLine?: boolean;
}

export const BatteryInsertion: React.FC<BatteryInsertionProps> = ({
  customH,
  customT,
  showArrow = false,
  arrowLabel,
  isScene5Hero = false,
  showTargetRing = false,
  isTargetAligned = false,
  showGuideLine = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const holderCenter = CALIBRATION.oblique.holderCenter; // { x: 648, y: 195 }
  const hoverDeltaY = CALIBRATION.oblique.hoverDeltaY;   // -280 px
  const boardRotateX = CALIBRATION.oblique.boardRotateX; // 58.73 deg
  const seatedDiameter = CALIBRATION.oblique.batteryRadiusSeated * 2; // 394.8 px
  const scaleHover = CALIBRATION.topDown.scaleHover;     // 1.12

  // 1. Compute timeline parameters: h in [0, 1] and t in [0, 1]
  let h = customH !== undefined ? customH : 1.0;
  let t = customT !== undefined ? customT : 0.0;
  let batteryScale = 1.0;
  let rotateX = boardRotateX;
  let dropShadowBlur = 28;
  let dropShadowOpacity = 0.45;
  let dropShadowOffsetX = 14;
  let dropShadowOffsetY = 22;
  let rimGlowOpacity = 0;
  let batteryBrightness = 1.0;
  let arrowVisible = showArrow;

  if (isScene5Hero) {
    if (frame < CUES.APPROACH_START) {
      // 5A. HOVER AND START DESCENT (frames 0 to 24)
      // Oblique view, h = 1.0 with tiny bob
      t = 0;
      const bob = Math.sin(frame * 0.25) * 0.02;
      h = 1.0 + bob;
      rotateX = boardRotateX;
      batteryScale = 1.0;
      arrowVisible = true;
    } else if (frame < CUES.TILT_START) {
      // 5B. OBLIQUE APPROACH (frames 24 to 76)
      // h: 1.0 -> 0.45 with Easing.inOut(Easing.cubic)
      // Battery remains 100% visible, unclipped, centred at holderCenter.x
      t = 0;
      const progress = (frame - CUES.APPROACH_START) / (CUES.TILT_START - CUES.APPROACH_START);
      const easedH = Easing.inOut(Easing.cubic)(progress);
      h = interpolate(easedH, [0, 1], [1.0, 0.45]);
      rotateX = boardRotateX;
      batteryScale = 1.0;
      // Arrow fades out before 5C starts
      arrowVisible = frame < CUES.TILT_START - 8;
    } else if (frame < CUES.TILT_END) {
      // 5C. SOFT TILT TO TOP VIEW / MATCH-CUT (frames 76 to 108, 32 frames)
      // t: 0 -> 1 with Easing.inOut(Easing.cubic)
      // h stays at 0.45 (just above holder opening)
      h = 0.45;
      const progress = (frame - CUES.TILT_START) / (CUES.TILT_END - CUES.TILT_START);
      t = Easing.inOut(Easing.cubic)(progress);
      rotateX = interpolate(t, [0, 1], [boardRotateX, 0]);
      batteryScale = interpolate(t, [0, 1], [1.0, scaleHover]);
      arrowVisible = false;
    } else if (frame < CUES.SETTLE_START) {
      // 5D. TOP-DOWN DESCENT (frames 108 to 156, 48 frames)
      // t = 1.0 (straight overhead)
      // battery scale: 1.12 -> 1.00 using Easing.out(Easing.cubic)
      t = 1.0;
      h = 0;
      rotateX = 0;
      arrowVisible = false;

      const progress = (frame - CUES.DESCENT_START) / (CUES.SETTLE_START - CUES.DESCENT_START);
      const easedDescent = Easing.out(Easing.cubic)(progress);
      batteryScale = interpolate(easedDescent, [0, 1], [scaleHover, 1.0]);

      // Drop shadow tightens into socket
      dropShadowBlur = interpolate(easedDescent, [0, 1], [28, 4]);
      dropShadowOpacity = interpolate(easedDescent, [0, 1], [0.45, 0.85]);
      dropShadowOffsetX = interpolate(easedDescent, [0, 1], [14, 1]);
      dropShadowOffsetY = interpolate(easedDescent, [0, 1], [22, 2]);

      // Ambient rim shadow grows at socket edge
      rimGlowOpacity = interpolate(easedDescent, [0, 1], [0, 0.8]);

      // Slight 3% brightness dip in last 6 frames before settle
      if (frame >= CUES.SETTLE_START - 6) {
        batteryBrightness = interpolate(frame, [CUES.SETTLE_START - 6, CUES.SETTLE_START], [1.0, 0.97], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
      }
    } else if (frame < CUES.SEATED_FRAME) {
      // 5D Final settle spring (frames 156 to 180)
      t = 1.0;
      h = 0;
      rotateX = 0;
      arrowVisible = false;
      rimGlowOpacity = 0.8;
      dropShadowBlur = 3;
      dropShadowOpacity = 0.9;
      dropShadowOffsetX = 0;
      dropShadowOffsetY = 1;

      const settleSpring = spring({
        frame: frame - CUES.SETTLE_START,
        fps,
        config: { damping: 16, stiffness: 200, mass: 0.6 },
      });
      // Settle dip: 1.00 -> 0.985 -> 1.00
      const dip = interpolate(
        frame - CUES.SETTLE_START,
        [0, 5, 14],
        [1.0, 0.985, 1.0],
        { extrapolateRight: "clamp" }
      );
      batteryScale = interpolate(settleSpring, [0, 1], [dip, 1.0]);
      batteryBrightness = interpolate(settleSpring, [0, 1], [0.97, 1.0]);
    } else {
      // Fully seated (frame 180 onwards)
      t = 1.0;
      h = 0;
      rotateX = 0;
      batteryScale = 1.0;
      arrowVisible = false;
      rimGlowOpacity = 0.85;
      dropShadowBlur = 2;
      dropShadowOpacity = 0.92;
      dropShadowOffsetX = 0;
      dropShadowOffsetY = 1;
      batteryBrightness = 1.0;
    }
  } else {
    // Non-Scene 5 manual control (e.g. Scene 4)
    rotateX = interpolate(t, [0, 1], [boardRotateX, 0]);
    batteryScale = interpolate(t, [0, 1], [1.0, scaleHover]);
    arrowVisible = showArrow;
  }

  // 2. Battery coordinates in 1240x566 plate space
  // Horizontal center is ALWAYS exactly holderCenter.x (648)
  const batteryCenterX = holderCenter.x;

  // Vertical position:
  // In oblique view (t=0), vertical center is holderCenter.y + h * hoverDeltaY
  // In top-down view (t=1), vertical center is holderCenter.y
  const obliqueCenterY = holderCenter.y + h * hoverDeltaY;
  const topDownCenterY = holderCenter.y;
  const batteryCenterY = interpolate(t, [0, 1], [obliqueCenterY, topDownCenterY]);

  // Battery disc size
  const currentDiameter = seatedDiameter;

  // Oblique floor shadow inside holder
  const obliqueShadowOpacity = interpolate(h, [0, 0.45, 1.0], [0.9, 0.72, 0.35], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }) * (1 - t);
  const obliqueShadowWidth = interpolate(h, [0, 1.0], [390, 270]);
  const obliqueShadowHeight = interpolate(h, [0, 1.0], [200, 135]);
  const obliqueShadowBlur = interpolate(h, [0, 1.0], [6, 22]);

  // Top-down drop shadow opacity (active as t -> 1)
  const topDownShadowOpacity = dropShadowOpacity * t;

  return (
    <BatteryEpod t={t}>
      {/* 1. Oblique Floor Shadow (Inside Holder Opening) */}
      {obliqueShadowOpacity > 0.01 && (
        <div
          style={{
            position: "absolute",
            left: holderCenter.x,
            top: holderCenter.y + interpolate(h, [0, 1.0], [8, 38]),
            width: obliqueShadowWidth,
            height: obliqueShadowHeight,
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse at center, rgba(0, 0, 0, 0.88) 0%, rgba(0, 0, 0, 0.2) 65%, transparent 80%)",
            opacity: obliqueShadowOpacity,
            filter: `blur(${obliqueShadowBlur}px)`,
            zIndex: 18,
            pointerEvents: "none",
          }}
        />
      )}

      {/* 2. Top-Down Drop Shadow under Hovering Battery */}
      {topDownShadowOpacity > 0.01 && (
        <div
          style={{
            position: "absolute",
            left: batteryCenterX + dropShadowOffsetX,
            top: batteryCenterY + dropShadowOffsetY,
            width: currentDiameter * batteryScale * 0.96,
            height: currentDiameter * batteryScale * 0.96,
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle at center, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.35) 60%, transparent 75%)",
            opacity: topDownShadowOpacity,
            filter: `blur(${dropShadowBlur}px)`,
            zIndex: 19,
            pointerEvents: "none",
          }}
        />
      )}

      {/* 3. Ambient Rim Shadow at Socket Lip (Top-Down Descent Cue) */}
      {t > 0.5 && rimGlowOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            left: holderCenter.x,
            top: holderCenter.y,
            width: currentDiameter,
            height: currentDiameter,
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            boxShadow: `inset 0 0 18px rgba(0, 0, 0, ${rimGlowOpacity * 0.95})`,
            opacity: rimGlowOpacity * t,
            zIndex: 20,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Target Alignment Ring (Scene 4) */}
      {showTargetRing && (
        <svg
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 1240,
            height: 566,
            zIndex: 21,
            pointerEvents: "none",
          }}
        >
          <ellipse
            cx={holderCenter.x}
            cy={holderCenter.y}
            rx={CALIBRATION.oblique.holderInnerRx}
            ry={CALIBRATION.oblique.holderInnerRy}
            fill="none"
            stroke={isTargetAligned ? "#2FB34A" : "rgba(18, 48, 79, 0.45)"}
            strokeWidth={3.5}
            strokeDasharray="8 6"
            filter={isTargetAligned ? "drop-shadow(0 0 8px rgba(47, 179, 74, 0.85))" : undefined}
          />
        </svg>
      )}

      {/* Vertical Alignment Guide Line (Scene 4) */}
      {showGuideLine && (
        <svg
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 1240,
            height: 566,
            zIndex: 22,
            pointerEvents: "none",
          }}
        >
          <line
            x1={holderCenter.x}
            y1={batteryCenterY + (seatedDiameter / 2) * Math.cos((rotateX * Math.PI) / 180)}
            x2={holderCenter.x}
            y2={holderCenter.y}
            stroke={isTargetAligned ? "#2FB34A" : "#12304F"}
            strokeWidth={2.5}
            strokeDasharray="6 6"
          />
        </svg>
      )}

      {/* 4. THE BATTERY: One continuous unclipped 3D element */}
      <div
        style={{
          position: "absolute",
          left: batteryCenterX,
          top: batteryCenterY,
          transform: "translate(-50%, -50%)",
          zIndex: 25,
          filter: batteryBrightness < 1.0 ? `brightness(${batteryBrightness})` : undefined,
        }}
      >
        <Battery
          diameter={currentDiameter}
          rotateX={rotateX}
          scale={batteryScale}
          showSpecular={true}
          specularProgress={(frame * 0.015) % 1}
        />
      </div>

      {/* 5. Downward Guide Arrow with Label */}
      {arrowVisible && (
        <div
          style={{
            position: "absolute",
            left: batteryCenterX,
            top: batteryCenterY - (rotateX > 20 ? 115 : 140),
            transform: "translateX(-50%)",
            zIndex: 60,
            pointerEvents: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {arrowLabel && (
            <div
              style={{
                background: "#12304F",
                color: "#FFFFFF",
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: "0.08em",
                padding: "4px 14px",
                borderRadius: 12,
                marginBottom: 6,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                textTransform: "uppercase",
              }}
            >
              {arrowLabel}
            </div>
          )}
          <svg width={36} height={60} viewBox="0 0 36 60">
            <defs>
              <filter id="arrow-shadow-rev2" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.4)" />
              </filter>
            </defs>
            <path
              d="M13 0 H23 V34 H36 L18 60 L0 34 H13 Z"
              fill="#111111"
              stroke="#FFFFFF"
              strokeWidth={1.5}
              filter="url(#arrow-shadow-rev2)"
            />
          </svg>
        </div>
      )}

      {/* 6. DEBUG CALIBRATION OVERLAY (Magenta, active when SHOW_CALIBRATION = true) */}
      {SHOW_CALIBRATION && (
        <svg
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 1240,
            height: 566,
            zIndex: 99,
            pointerEvents: "none",
          }}
        >
          {/* Holder inner ellipse (oblique) or circle (top-down) */}
          <ellipse
            cx={holderCenter.x}
            cy={holderCenter.y}
            rx={interpolate(t, [0, 1], [CALIBRATION.oblique.holderInnerRx, CALIBRATION.oblique.holderInnerRx])}
            ry={interpolate(t, [0, 1], [CALIBRATION.oblique.holderInnerRy, CALIBRATION.oblique.holderInnerRx])}
            fill="none"
            stroke="#ff00ff"
            strokeWidth={2.5}
            strokeDasharray="6 4"
          />

          {/* Holder Center Cross */}
          <line
            x1={holderCenter.x - 24}
            y1={holderCenter.y}
            x2={holderCenter.x + 24}
            y2={holderCenter.y}
            stroke="#ff00ff"
            strokeWidth={2}
          />
          <line
            x1={holderCenter.x}
            y1={holderCenter.y - 24}
            x2={holderCenter.x}
            y2={holderCenter.y + 24}
            stroke="#ff00ff"
            strokeWidth={2}
          />

          {/* Battery Center Cross */}
          <line
            x1={batteryCenterX - 20}
            y1={batteryCenterY}
            x2={batteryCenterX + 20}
            y2={batteryCenterY}
            stroke="#ff00ff"
            strokeWidth={2.5}
          />
          <line
            x1={batteryCenterX}
            y1={batteryCenterY - 20}
            x2={batteryCenterX}
            y2={batteryCenterY + 20}
            stroke="#ff00ff"
            strokeWidth={2.5}
          />

          {/* Vertical axis alignment line */}
          <line
            x1={holderCenter.x}
            y1={Math.min(batteryCenterY, holderCenter.y)}
            x2={holderCenter.x}
            y2={Math.max(batteryCenterY, holderCenter.y)}
            stroke="#ff00ff"
            strokeWidth={1.5}
            strokeDasharray="4 4"
          />

          {/* Readout label */}
          <text
            x={holderCenter.x + 30}
            y={holderCenter.y - 10}
            fill="#ff00ff"
            fontSize={14}
            fontWeight="bold"
            fontFamily="monospace"
          >
            HOLDER ({holderCenter.x}, {holderCenter.y})
          </text>
          <text
            x={batteryCenterX + 30}
            y={batteryCenterY - 10}
            fill="#ff00ff"
            fontSize={14}
            fontWeight="bold"
            fontFamily="monospace"
          >
            BATTERY ({Math.round(batteryCenterX)}, {Math.round(batteryCenterY)}) h={h.toFixed(2)} t={t.toFixed(2)}
          </text>
        </svg>
      )}
    </BatteryEpod>
  );
};
