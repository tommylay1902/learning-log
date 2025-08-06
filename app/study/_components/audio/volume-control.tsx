"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { VolumeOff, Volume2 } from "lucide-react";
interface VolumeControlProps {
  isMuted: boolean;
  handleMuteChange: (isMuted: boolean) => void;
}
const VolumeControl: React.FC<VolumeControlProps> = ({
  isMuted,
  handleMuteChange,
}) => {
  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            onClick={() => handleMuteChange(!isMuted)}
            className="cursor-pointer"
          >
            {isMuted ? <VolumeOff size={48} /> : <Volume2 size={48} />}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Will play rain noises when working pomo is activated</p>
        </TooltipContent>
      </Tooltip>
    </>
  );
};

export default VolumeControl;
