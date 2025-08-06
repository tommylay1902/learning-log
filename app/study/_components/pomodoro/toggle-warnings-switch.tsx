import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
const ToggleWarningsSwitch = () => {
  return (
    <div className="animate-float-up delay-500 opacity-0 gap-x-2 flex items-center">
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
