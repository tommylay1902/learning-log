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

  const handleOnComplete = () => {
    switch (activeTab) {
      case "work":
        setActiveTab("break");
        break;
      case "break":
        setActiveTab("work");
        break;
      default:
        setActiveTab("break");
    }
  };
  const handleTabChange = (newTab: "work" | "break" | "reflect") => {
    if (newTab === "work") {
      setActiveTab("work");
      return;
    }

    if (isActive && activeTab === "work") {
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
      activationMode="manual"
    >
      <TabsContent value="work">
        <WorkTimer
          initialTime={3}
          onActiveChange={setIsActive}
          onComplete={handleOnComplete}
        />
      </TabsContent>
      <TabsContent value="break">
        <BreakTimer initialTime={3} onComplete={handleOnComplete} />
      </TabsContent>
      <TabsContent value="reflect">
        <div>hello</div>
      </TabsContent>

      <TabsList
        className={`bottom-4 mb-4 flex animate-float-up items-center justify-center w-screen transition-all duration-1000 ${isActive ? "border-b-black" : "border-b-white"}`}
        onFocus={(e) => {
          e.preventDefault();
          e.target.blur();
        }}
      >
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
