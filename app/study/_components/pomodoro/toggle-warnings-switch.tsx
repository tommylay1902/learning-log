import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ToggleWarningsSwitchProps {
  visible: boolean;
}
const ToggleWarningsSwitch = ({ visible }: ToggleWarningsSwitchProps) => {
  return (
    <div
      className={`delay-500 opacity-0 gap-x-2 flex flex-col gap-y-3
        ${visible ? "animate-float-up delay-250" : "invisible pointer-events-none"}`}
    >
      <div className="flex items-center gap-x-1">
        <Switch
          id="toggle-warnings"
          onFocus={(e) => {
            e.preventDefault();
            e.target.blur();
          }}
        />
        <Label htmlFor="toggle-warnings">Turn off warnings</Label>
      </div>
      <div className="flex items-center gap-x-1">
        <Switch
          id="toggle-pomo"
          onFocus={(e) => {
            e.preventDefault();
            e.target.blur();
          }}
        />
        <Label htmlFor="toggle-pomo">Toggle pomo </Label>
      </div>
    </div>
  );
};

export default ToggleWarningsSwitch;
