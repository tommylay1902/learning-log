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
      <>
        <AudioPlayer ref={ref} isMuted={isMuted} />
        <VolumeControl isMuted={isMuted} handleMuteChange={handleMuteChange} />
      </>
    );
  },
);

Audio.displayName = "audio";

export default Audio;
