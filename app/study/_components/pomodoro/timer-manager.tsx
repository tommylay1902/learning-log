"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BreakTimer from "./break-timer";
import WorkTimer from "./work-timer";
import { useState, useEffect } from "react";
import { useCookies } from "next-client-cookies";

interface TimerManagerProps {
  onTimerChange: (isWorking: boolean, isActive: boolean) => void;
}

const TimerManager: React.FC<TimerManagerProps> = ({ onTimerChange }) => {
  const cookies = useCookies();
  const [activeTab, setActiveTab] = useState<"work" | "break" | "reflect">(
    "work",
  );
  const [isActive, setIsActive] = useState(false);
  const [displayAlertBadge, setDisplayAlertBadge] = useState(false);

  useEffect(() => {
    setDisplayAlertBadge(
      cookies.get("pomosCompleted") ? true : false && !isActive,
    );
  }, [cookies, isActive]);

  const handleOnComplete = () => {
    switch (activeTab) {
      case "work":
        setActiveTab("break");
        const sessionsCompleted = cookies.get("pomosCompleted");
        if (sessionsCompleted) {
          cookies.set("pomosCompleted", parseInt(sessionsCompleted) + 1 + "");
        } else {
          cookies.set("pomosCompleted", "1");
        }
        setDisplayAlertBadge(true);
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
          initialTime={3000}
          onActiveChange={setIsActive}
          onComplete={handleOnComplete}
        />
      </TabsContent>
      <TabsContent value="break">
        <BreakTimer initialTime={600} onComplete={handleOnComplete} />
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
        <TabsTrigger value="reflect" className="text-6xl relative">
          Reflect
          {displayAlertBadge && (
            <span
              className="absolute top-0 right-0 ml-2 flex h-5 w-5
            items-center justify-center rounded-full
            bg-yellow-500 text-xs text-white opacity-0 animate-fade-in delay-1200"
            />
          )}
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default TimerManager;
