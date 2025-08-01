"use client";
import React, { useEffect, useState } from "react";

const Timer = () => {
  const [time, setTime] = useState(3000);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (isRunning) {
      const id = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
      setIntervalId(id);
    } else if (!isRunning && intervalId) {
      clearInterval(intervalId);
    }

    return () => {
      if (intervalId) return clearInterval(intervalId);
    };
  }, [isRunning]);

  useEffect(() => {
    const handleKeyUpEvent = (event: KeyboardEvent) => {
      if (event.key === " ") {
        setIsRunning((isRunning) => !isRunning);
      }
    };

    window.addEventListener("keyup", handleKeyUpEvent);

    return () => {
      window.removeEventListener("keyup", handleKeyUpEvent);
    };
  }, []);
  return (
    <div className="text-center text-6xl font-bold flex items-center justify-center justify-items-center">
      {Math.floor(time / 60).toFixed(0)}: {time % 60}
    </div>
  );
};

export default Timer;
