"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BreakTimer from "./break-timer";
import WorkTimer from "./work-timer";
import { useState, useEffect } from "react";

interface TimerProps {
  onTimerChange: (isWorking: boolean, isActive: boolean) => void;
}
const Timer: React.FC<TimerProps> = ({ onTimerChange }) => {
  const [activeTab, setActiveTab] = useState<"work" | "break">("work");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    onTimerChange(activeTab === "work", isActive);
  }, [activeTab, isActive, onTimerChange]);

  return (
    <>
      <Tabs
        defaultValue="work"
        value={activeTab}
        className={"flex-1 "}
        onValueChange={(value) => setActiveTab(value as "work" | "break")}
      >
        <TabsContent value="work">
          <WorkTimer initialTime={3000} onActiveChange={setIsActive} />
        </TabsContent>
        <TabsContent value="break">
          <BreakTimer initialTime={600} />
        </TabsContent>
        <TabsList className="fixed mb-4 animate-float-up left-1/2 -translate-x-1/2 bottom-4 justify-center">
          <TabsTrigger value="work" className="text-6xl">
            Work
          </TabsTrigger>
          <TabsTrigger value="break" className="text-6xl">
            Break
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </>
  );
};

export default Timer;
