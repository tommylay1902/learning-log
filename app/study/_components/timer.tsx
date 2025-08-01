"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BreakTimer from "./break-timer";
import WorkTimer from "./work-timer";

const Timer = () => {
  return (
    <>
      {/* {mode === "work" ? <WorkTimer /> : <BreakTimer />} */}

      <Tabs defaultValue="work" className={"flex-1 "}>
        <TabsContent value="work">
          <WorkTimer initialTime={3000} />
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
