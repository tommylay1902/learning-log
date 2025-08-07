"use client";
import { useCookies } from "next-client-cookies";
import React, { useEffect, useState } from "react";
import ReflectCard from "./reflect-card";

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
    <div className="flex flex-1 flex-col h-full w-full min-h-[60vh] text-center">
      {numberOfSessions > 0 ? (
        <ReflectCard numSessions={numberOfSessions} />
      ) : (
        <div className="text-6xl font-extrabold">No Sessions Completed</div>
      )}
    </div>
  );
};

export default Reflect;
