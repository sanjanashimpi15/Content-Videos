import React from "react";
import { interpolate, staticFile } from "remotion";
import { CALIBRATION } from "../config/calibration";

interface BatteryEpodProps {
  t?: number; // 0 = oblique view, 1 = top-down view
  dimBoard?: boolean;
  dimOpacity?: number;
  children?: React.ReactNode;
}

export const BatteryEpod: React.FC<BatteryEpodProps> = ({
  t = 0,
  dimBoard = false,
  dimOpacity = 0.25,
  children,
}) => {
  // Cross-dissolve mapping during 5C (t: 0 -> 1)
  // Dissolve occurs primarily between t=0.18 and t=0.75 (matching frames 6-24 of 5C)
  const dissolve = interpolate(t, [0.18, 0.75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Blur peak of 5px at midpoint t=0.465, zero at ends
  const blurPx = interpolate(t, [0.18, 0.465, 0.75], [0, 5, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Top-down plate dimensions & holder matching
  // Oblique holder center: (648, 195)
  // TD plate 1400x898, holder center: (702, 435)
  // Scale ratio: 210 / 217 = 0.96774
  const tdScale = CALIBRATION.oblique.holderInnerRx / CALIBRATION.topDown.batteryRadiusTD; // ~0.96774
  const tdWidth = CALIBRATION.topDown.plateWidth * tdScale; // ~1354.8 px
  const tdHeight = CALIBRATION.topDown.plateHeight * tdScale; // ~869.0 px
  const tdLeft = CALIBRATION.oblique.holderCenter.x - CALIBRATION.topDown.holderCenterTD.x * tdScale; // ~ -31.35 px
  const tdTop = CALIBRATION.oblique.holderCenter.y - CALIBRATION.topDown.holderCenterTD.y * tdScale; // ~ -225.97 px

  // Soft black backing disc radius (holder inner radius)
  const backingRadius = CALIBRATION.topDown.holderInnerRadiusTD * tdScale; // ~222.6 px

  return (
    <div
      style={{
        position: "relative",
        width: 1240,
        height: 566,
      }}
    >
      {/* 1. Studio contact shadow of ePod */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "60%",
          width: 1180,
          height: 380,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(18, 35, 55, 0.35) 0%, rgba(18, 35, 55, 0.08) 55%, transparent 75%)",
          filter: "blur(22px)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* 2. Oblique PCB Body Plate (epod_body_oblique.png) */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 1240,
          height: 566,
          opacity: 1 - dissolve,
          filter: blurPx > 0 ? `blur(${blurPx}px)` : undefined,
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        <img
          src={staticFile("assets/epod_body_oblique.png")}
          alt="Battery ePod Board (Oblique)"
          style={{
            width: "100%",
            height: "100%",
            display: "block",
          }}
        />
      </div>

      {/* 3. Top-Down PCB Body Plate (REF-4 epod_body_topdown_inserted.png) */}
      {t > 0 && (
        <div
          style={{
            position: "absolute",
            left: tdLeft,
            top: tdTop,
            width: tdWidth,
            height: tdHeight,
            opacity: dissolve,
            filter: blurPx > 0 ? `blur(${blurPx}px)` : undefined,
            zIndex: 11,
            pointerEvents: "none",
          }}
        >
          <img
            src={staticFile("assets/epod_body_topdown_inserted.png")}
            alt="Battery ePod Board (Top-Down REF-4)"
            style={{
              width: "100%",
              height: "100%",
              display: "block",
            }}
          />
        </div>
      )}

      {/* 4. Soft black disc under hovering overlay in top-down view to hide baked battery */}
      {t > 0 && (
        <div
          style={{
            position: "absolute",
            left: CALIBRATION.oblique.holderCenter.x,
            top: CALIBRATION.oblique.holderCenter.y,
            width: backingRadius * 2,
            height: backingRadius * 2,
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle at center, #111418 0%, #171b20 75%, rgba(23, 27, 32, 0.95) 100%)",
            boxShadow: "inset 0 0 16px rgba(0, 0, 0, 0.85)",
            opacity: dissolve,
            zIndex: 14,
            pointerEvents: "none",
          }}
        />
      )}

      {/* 5. Dim overlay for non-holder area (Scene 3 focus) */}
      {dimBoard && (
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 1240,
            height: 566,
            background: `rgba(0, 0, 0, ${dimOpacity})`,
            maskImage:
              "radial-gradient(circle 260px at 645px 200px, transparent 0%, transparent 60%, black 100%)",
            WebkitMaskImage:
              "radial-gradient(circle 260px at 645px 200px, transparent 0%, transparent 60%, black 100%)",
            zIndex: 13,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Child layers (Battery, Guide Lines, Labels, Debug Overlays) */}
      {children}
    </div>
  );
};
