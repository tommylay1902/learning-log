"use client";
import { useState, useRef } from "react";
import RainContainer from "./rain-container";
import Timer from "./timer";
import VolumeControl from "./volume-control";
import AudioPlayer from "./audio-player";

const Pomodoro = () => {
  const [isWorking, setIsWorking] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

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
    <div className="flex flex-1 overflow-x-hidden">
      <Timer onTimerChange={handleTimerChange} />
      <RainContainer start={isWorking && isActive} />
      <div
        className={isWorking ? "fixed bottom-14 left-14 " : "invisible w-0 h-0"}
      >
        <AudioPlayer ref={audioRef} isMuted={isMuted} />
        <VolumeControl isMuted={isMuted} handleMuteChange={handleMuteChange} />
      </div>
    </div>
  );
};

export default Pomodoro;
