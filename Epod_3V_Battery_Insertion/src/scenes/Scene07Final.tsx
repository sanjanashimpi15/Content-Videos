import React from "react";
import { Audio, Easing, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Camera } from "../components/Camera";
import { BatteryEpod } from "../components/BatteryEpod";
import { Battery } from "../components/Battery";
import { Subtitles } from "../components/Subtitles";
import { CALIBRATION } from "../config/calibration";
import { SCENES } from "../config/timing";

export const Scene07Final: React.FC = () => {
  const frame = useCurrentFrame();
  const sceneTiming = SCENES[6];

  const holderCenter = CALIBRATION.oblique.holderCenter;
  const seatedDiameter = CALIBRATION.oblique.batteryRadiusSeated * 2;

  // Slow camera pull-back (scale 1.15 -> 1.00) from frame 15 to 85
  const pullBackProgress = Easing.inOut(Easing.cubic)(
    interpolate(frame, [15, 85], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const cameraScale = interpolate(pullBackProgress, [0, 1], [1.15, 1.00]);

  // Top banner entrance: frames 20 to 45
  const bannerOpacity = interpolate(frame, [20, 45], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Small closing caption entrance: frame 85 onwards
  const captionOpacity = interpolate(frame, [85, 110], [0, 0.9], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        position: "relative",
        background: "radial-gradient(ellipse at 50% 50%, #f7f9fc 0%, #dbe3ed 100%)",
        overflow: "hidden",
      }}
    >
      <Audio src={staticFile(sceneTiming.audioFile)} />

      {/* Camera pull-back revealing full top-down ePod: P at left, N at right, BATTERY below */}
      <Camera scale={cameraScale} y={0}>
        <div
          style={{
            position: "absolute",
            left: (1920 - 1240) / 2,
            top: (1080 - 566) / 2,
            width: 1240,
            height: 566,
          }}
        >
          <BatteryEpod t={1}>
            {/* Seated battery overlay matching baked REF-4 battery */}
            <div
              style={{
                position: "absolute",
                left: holderCenter.x,
                top: holderCenter.y,
                transform: "translate(-50%, -50%)",
                zIndex: 25,
              }}
            >
              <Battery
                diameter={seatedDiameter}
                rotateX={0}
                scale={1.0}
                showSpecular={false}
              />
            </div>
          </BatteryEpod>
        </div>
      </Camera>

      {/* Top Banner: "3V BATTERY INSERTED" */}
      <div
        style={{
          position: "absolute",
          top: 65,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 85,
          opacity: bannerOpacity,
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #12304F 0%, #0d2238 100%)",
            border: "1.5px solid rgba(47, 179, 74, 0.65)",
            boxShadow: "0 10px 32px rgba(18, 48, 79, 0.35)",
            borderRadius: 30,
            padding: "12px 36px",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "#2FB34A",
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: 18,
            }}
          >
            ✓
          </div>
          <span
            style={{
              color: "#FFFFFF",
              fontSize: 26,
              fontWeight: 800,
              fontFamily: "'Inter', sans-serif",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            3V Battery Inserted
          </span>
        </div>
      </div>

      {/* Small closing caption at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 110,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: captionOpacity,
          zIndex: 85,
        }}
      >
        <div
          style={{
            display: "inline-block",
            fontSize: 16,
            color: "#475569",
            fontWeight: 500,
            background: "rgba(255, 255, 255, 0.9)",
            padding: "8px 24px",
            borderRadius: 20,
            border: "1px solid rgba(0, 0, 0, 0.08)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
          }}
        >
          To remove the battery, follow the release procedure shown in the kit instructions.
        </div>
      </div>

      <Subtitles
        text={sceneTiming.subtitle}
        durationInFrames={sceneTiming.durationInFrames}
      />
    </div>
  );
};
