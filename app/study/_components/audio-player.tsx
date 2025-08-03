import React, { forwardRef, useEffect } from "react";

interface AudioPlayerProps {
  isMuted: boolean;
}

const AudioPlayer = forwardRef<HTMLAudioElement, AudioPlayerProps>(
  ({ isMuted }, ref) => {
    useEffect(() => {
      if (ref && typeof ref !== "function" && ref.current) {
        ref.current.muted = isMuted;
      }
    }, [isMuted, ref]);

    return (
      <div className="invisible w-0">
        <audio ref={ref} controls loop muted={isMuted}>
          <source src="/sounds/rain.mp3" type="audio/mpeg" />
          Your browser does not support the audio tag.
        </audio>
      </div>
    );
  },
);

AudioPlayer.displayName = "AudioPlayer";

export default AudioPlayer;
