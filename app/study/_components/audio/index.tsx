import React, { forwardRef } from "react";
import AudioPlayer from "./audio-player";
import VolumeControl from "./volume-control";

interface AudioProps {
  isMuted: boolean;
  handleMuteChange: (isMuted: boolean) => void;
}

const Audio = forwardRef<HTMLAudioElement, AudioProps>(
  ({ isMuted, handleMuteChange }, ref) => {
    return (
      <div className={`flex items-center gap-4 `}>
        <AudioPlayer ref={ref} isMuted={isMuted} />
        <VolumeControl isMuted={isMuted} handleMuteChange={handleMuteChange} />
      </div>
    );
  },
);

Audio.displayName = "audio";

export default Audio;
