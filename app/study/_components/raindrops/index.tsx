"use client";
import React, { useEffect, useState } from "react";
import RainDrop from "./rain-drop";

interface RainContainerProps {
  start: boolean;
}

const RainContainer: React.FC<RainContainerProps> = ({ start }) => {
  const [drops, setDrops] = useState<
    Array<{ id: number; initialX: number; delay: number }>
  >([]);

  useEffect(() => {
    if (start) {
      const numDrops = 50;
      setDrops(
        Array.from({ length: numDrops }, (_, i) => ({
          id: i,
          initialX: Math.random() * window.innerWidth,
          delay: Math.random() * 5,
        })),
      );
    } else {
      setDrops([]);
    }
  }, [start]);

  if (drops.length === 0) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "75vh",
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {drops.map((drop) => (
        <RainDrop
          key={drop.id}
          initialX={drop.initialX}
          delay={drop.delay}
          start={start}
        />
      ))}
    </div>
  );
};

export default RainContainer;
