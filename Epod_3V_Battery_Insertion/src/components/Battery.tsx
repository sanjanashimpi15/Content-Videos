import React from "react";
import { interpolate, staticFile } from "remotion";

export interface BatteryProps {
  diameter?: number;
  width?: number; // backwards compatibility
  height?: number; // backwards compatibility
  edgeThickness?: number; // backwards compatibility
  rotateX?: number; // 0 (top-down) to ~58.73 (oblique)
  rotateY?: number;
  rotateZ?: number;
  scale?: number;
  opacity?: number;
  showEdgeBand?: boolean;
  edgeBandOpacity?: number;
  showSpecular?: boolean;
  specularProgress?: number;
}

export const Battery: React.FC<BatteryProps> = ({
  diameter,
  width,
  height,
  edgeThickness,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  scale = 1,
  opacity = 1,
  showEdgeBand = true,
  edgeBandOpacity = 1,
  showSpecular = true,
  specularProgress = 0,
}) => {
  const actualDiameter = diameter || width || 394.8;
  // Edge band only visible when rotateX > 8 deg, fades out to 0 as rotateX -> 0
  const angleEdgeOpacity = interpolate(rotateX, [4, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const finalEdgeOpacity = (showEdgeBand ? 1 : 0) * edgeBandOpacity * angleEdgeOpacity;

  // Thickness in pixels (scaled with diameter)
  const thickness = (edgeThickness !== undefined ? edgeThickness : 22) * (actualDiameter / 434);

  // Specular sheen sweep position across diagonal
  const sheenPos = (specularProgress * 300) - 100;

  return (
    <div
      style={{
        position: "relative",
        width: actualDiameter,
        height: actualDiameter,
        transform: `scale(${scale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`,
        transformOrigin: "center center",
        transformStyle: "preserve-3d",
        opacity,
        pointerEvents: "none",
      }}
    >
      {/* 1. Procedural Metallic Edge Band (visible in oblique view, fades as rotateX -> 0) */}
      {finalEdgeOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: actualDiameter,
            height: actualDiameter,
            transform: `translate3d(0px, ${thickness}px, -2px)`,
            borderRadius: "50%",
            background:
              "linear-gradient(90deg, #60646b 0%, #b8bcc4 20%, #f4f7fb 42%, #a8adb6 65%, #595c63 88%, #3f4247 100%)",
            boxShadow: "0 6px 14px rgba(0, 0, 0, 0.45)",
            opacity: finalEdgeOpacity,
            zIndex: 1,
          }}
        />
      )}

      {/* 2. Beveled Metallic Rim Ring */}
      {finalEdgeOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: actualDiameter,
            height: actualDiameter,
            transform: `translate3d(0px, ${thickness * 0.5}px, -1px)`,
            borderRadius: "50%",
            border: "2px solid rgba(255, 255, 255, 0.65)",
            opacity: finalEdgeOpacity,
            zIndex: 2,
          }}
        />
      )}

      {/* 3. Top Face-on Circular Battery Disc (Taken from REF-4, perfectly uncut) */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: actualDiameter,
          height: actualDiameter,
          borderRadius: "50%",
          overflow: "hidden",
          boxShadow: rotateX < 10
            ? "0 4px 18px rgba(0, 0, 0, 0.35)"
            : "0 2px 8px rgba(0, 0, 0, 0.22)",
          zIndex: 3,
        }}
      >
        <img
          src={staticFile("assets/battery_face_topdown.png")}
          alt="Duracell 3V Coin Cell Face"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />

        {/* Specular sheen sweep overlay */}
        {showSpecular && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: `linear-gradient(125deg, transparent ${sheenPos - 35}%, rgba(255, 255, 255, 0.55) ${sheenPos}%, transparent ${sheenPos + 35}%)`,
              mixBlendMode: "overlay",
              pointerEvents: "none",
            }}
          />
        )}
      </div>
    </div>
  );
};
