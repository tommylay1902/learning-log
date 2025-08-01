"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BreakTimer from "./break-timer";
import WorkTimer from "./work-timer";

const Timer = () => {
  return (
    <>
      {/* {mode === "work" ? <WorkTimer /> : <BreakTimer />} */}

      <Tabs defaultValue="work" className=" justify-center items-center flex-1">
        <TabsContent value="work">
          <WorkTimer />
        </TabsContent>
        <TabsContent value="break">
          <BreakTimer />
        </TabsContent>
        <TabsList className="fixed mb-4 animate-float-up left-1/2 -translate-x-1/2 bottom-4">
          <TabsTrigger value="work" className="text-3xl">
            Work
          </TabsTrigger>
          <TabsTrigger value="break" className="text-3xl">
            Break
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </>
  );
};

export default Timer;
