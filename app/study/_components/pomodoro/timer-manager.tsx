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

  useEffect(() => {
    onTimerChange(activeTab === "work", isActive);
  }, [activeTab, isActive, onTimerChange]);

  return (
    <>
      <Tabs
        defaultValue="work"
        value={activeTab}
        className={"flex-1 "}
        onValueChange={(value) =>
          setActiveTab(value as "work" | "break" | "reflect")
        }
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
        <TabsList className="fixed mb-4 animate-float-up bottom-4 justify-center items-center flex">
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
    </>
  );
};

export default TimerManager;
