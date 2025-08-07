"use client";
import { useCookies } from "next-client-cookies";
import React, { useEffect, useState } from "react";
import ReflectCard from "./reflect-card";
import { Button } from "@/components/ui/button";

const Reflect = () => {
  const cookies = useCookies();
  const [numberOfSessions, setNumberOfSessions] = useState<number | null>(null);

  useEffect(() => {
    const pomoCookie = cookies.get("pomosCompleted");
    setNumberOfSessions(pomoCookie ? parseInt(pomoCookie) : 0);
  }, [cookies]);

  if (numberOfSessions === null) {
    return (
      <div className="flex flex-1 flex-col h-full w-full min-h-[60vh]"></div>
    );
  }

  return (
    <div className="flex flex-1 flex-col h-full w-full min-h-[60vh] text-center items-center justify-center">
      {numberOfSessions > 0 ? (
        <ReflectCard numSessions={numberOfSessions} />
      ) : (
        <>
          <div className="text-2xl font-extrabold">
            No New Sessions Completed/Detected. Would you like to add the
            sessions manually?
          </div>
          <div>
            <Button>Add Session(s)</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Reflect;
