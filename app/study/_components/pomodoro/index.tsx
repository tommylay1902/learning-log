"use client";
import { useState, useRef, useEffect } from "react";
import RainContainer from "../raindrops";
import TimerManager from "./timer-manager";

import Audio from "../audio";
import ToggleWarningsSwitch from "./toggle-warnings-switch";

const Pomodoro = () => {
  const [isWorking, setIsWorking] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isWorking && isActive) {
        e.preventDefault();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isWorking, isActive]);

  const handleTimerChange = (isWorking: boolean, isActive: boolean) => {
    setIsWorking(isWorking);
    setIsActive(isActive);

    if (audioRef.current) {
      if (isWorking && isActive && !isMuted) {
        audioRef.current
          .play()
          .catch((e) => console.error("Audio play failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  };

  const handleMuteChange = (isMuted: boolean) => {
    setIsMuted(isMuted);
  };

  return (
    <div className="flex overflow-x-hidden h-full">
      {/*need to fix my layout this seems so hacky*/}
      <div
        className={`fixed inset-0 -z-10 tranisition-all duration-1000
          ${isWorking && isActive ? "bg-black" : "bg-transparent"}`}
      />
      <div className="flex flex-col items-center h-full">
        <TimerManager onTimerChange={handleTimerChange} />
        <ToggleWarningsSwitch visible={!isActive} />
      </div>

      <RainContainer start={isWorking && isActive} />
      <div
        className={isWorking ? "fixed bottom-14 left-14" : "invisible w-0 h-0"}
      >
        <Audio
          ref={audioRef}
          isMuted={isMuted}
          handleMuteChange={handleMuteChange}
        />
      </div>
    </div>
  );
};

export default Pomodoro;
