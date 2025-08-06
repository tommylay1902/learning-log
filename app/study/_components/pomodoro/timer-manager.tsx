"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BreakTimer from "./break-timer";
import WorkTimer from "./work-timer";
import { useState, useEffect } from "react";

interface TimerManagerProps {
  onTimerChange: (isWorking: boolean, isActive: boolean) => void;
}

const TimerManager: React.FC<TimerManagerProps> = ({ onTimerChange }) => {
  const [activeTab, setActiveTab] = useState<"work" | "break" | "reflect">(
    "work",
  );
  const [isActive, setIsActive] = useState(false);

  const handleTabChange = (newTab: "work" | "break" | "reflect") => {
    if (newTab === "work") {
      setActiveTab("work");
      return;
    }

    if (isActive) {
      const confirmed = confirm(
        "Are you sure you want to switch out of work mode? Time will be reset",
      );
      if (!confirmed) {
        setActiveTab("work");
        return;
      }
    }

    setActiveTab(newTab);
  };

  useEffect(() => {
    onTimerChange(activeTab === "work", isActive);
  }, [activeTab, isActive, onTimerChange]);

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => handleTabChange(value as typeof activeTab)}
      className="flex-1"
      activationMode="manual"
    >
      <TabsContent value="work">
        <WorkTimer initialTime={3000} onActiveChange={setIsActive} />
      </TabsContent>
      <TabsContent value="break">
        <BreakTimer initialTime={600} />
      </TabsContent>
      <TabsContent value="reflect">
        <div>hello</div>
      </TabsContent>

      <TabsList className="fixed bottom-4 mb-4 flex animate-float-up items-center justify-center">
        <TabsTrigger value="work" className="text-6xl">
          Work
        </TabsTrigger>
        <TabsTrigger value="break" className="text-6xl">
          Break
        </TabsTrigger>
        <TabsTrigger value="reflect" className="text-6xl">
          Reflect
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default TimerManager;
