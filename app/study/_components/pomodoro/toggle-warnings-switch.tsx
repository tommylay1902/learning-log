import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ToggleWarningsSwitchProps {
  visible: boolean;
}
const ToggleWarningsSwitch = ({ visible }: ToggleWarningsSwitchProps) => {
  return (
    <div
      className={`delay-500 opacity-0 gap-x-2 flex items-center
        ${visible ? "animate-float-up delay-250" : "invisible pointer-events-none"}`}
    >
      <Switch
        id="toggle-warnings"
        onFocus={(e) => {
          e.preventDefault();
          e.target.blur();
        }}
      />
      <Label htmlFor="toggle-warnings">Turn off warnings for this page</Label>
    </div>
  );
};

export default ToggleWarningsSwitch;
