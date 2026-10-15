import React from "react";

interface CameraProps {
  scale?: number;
  x?: number;
  y?: number;
  rotateX?: number;
  rotateY?: number;
  children: React.ReactNode;
}

export const Camera: React.FC<CameraProps> = ({
  scale = 1,
  x = 0,
  y = 0,
  rotateX = 0,
  rotateY = 0,
  children,
}) => {
  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        position: "relative",
        overflow: "hidden",
        perspective: 1400,
        transformStyle: "preserve-3d",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          transformOrigin: "960px 480px",
          transform: `translate3d(${x}px, ${y}px, 0px) scale(${scale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </div>
    </div>
  );
};
