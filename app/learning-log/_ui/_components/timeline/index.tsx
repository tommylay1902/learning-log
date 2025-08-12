"use client";
import { use } from "react";
import { Separator } from "../../../../../components/ui/separator";
import { AccordionContent } from "@/components/ui/accordion";
import { Database } from "@/database.types";
import { DateTime } from "luxon";

import { beautifyYMD } from "@/lib/time/date";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { convertAndGroupLogs } from "@/lib/time/convert-and-group-logs";
import { convertPomoToHours, convertTotalHoursDaily } from "@/lib/time/convert";

interface TimelineProps {
  fetchLogs: Promise<
    Database["public"]["Tables"]["learning_log"]["Row"][] | null
  >;
  fetchWeeklyLogs: Promise<
    Database["public"]["Tables"]["learning_log"]["Row"][] | null
  >;
  timezone: string;
}
const TimeLine: React.FC<TimelineProps> = ({
  fetchLogs,
  fetchWeeklyLogs,
  timezone,
}) => {
  // const totalDailyTimeSpent = convertTotalHoursDaily(entries);
  const logs = use(fetchLogs);
  const weeklyLogs = use(fetchWeeklyLogs);

  const weeklyHours =
    weeklyLogs?.reduce((acc, log) => {
      return acc + (log.time_spent ? log.time_spent : 0);
    }, 0) ?? 0;

  let entries: Record<
    string,
    Database["public"]["Tables"]["learning_log"]["Row"][]
  > | null = null;

  const totalTime: { total?: number | undefined } = { total: undefined };

  if (logs !== null) {
    entries = convertAndGroupLogs(logs, timezone);
    totalTime.total = convertPomoToHours(Object.values(entries));
  }

  const totalDailyTimeSpent = convertTotalHoursDaily(entries);

  return (
    <>
      <div className="w-full flex justify-center">
        <h1 className="text-6xl font-bold mb-2">Timeline</h1>
      </div>
      <div className="w-full flex justify-center gap-x-6 mb-3">
        <div className="text-2xl underline">
          Total Time Studied: {totalTime.total?.toFixed(2)}hrs
        </div>
        <div className="text-2xl underline">
          Current weekly Total: {((weeklyHours * 50) / 60).toFixed(2)}hrs
        </div>
      </div>
      {/*animate-float-up opacity-0 delay-1000*/}
      <div className="relative w-full ">
        <Separator
          orientation="vertical"
          className="bg-white absolute left-2 top-4"
        />
        {entries !== null &&
          Object.entries(entries).map(([date, logs], index) => (
            <div key={index} className="relative mb-10 pl-8 ">
              <div className="bg-foreground absolute left-0 top-3.5 flex size-4 items-center justify-center rounded-full " />

              <div className="flex items-between justify-between space-x-4 text-3xl font-bold mr-3 border-b-2 border-white pb-2">
                <div className="pt-1">{beautifyYMD(date)}</div>
                <div className="pt-1 flex items-center gap-x-2">
                  Time Studied: {totalDailyTimeSpent[date]}{" "}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-md">
                        Time calculated from{" "}
                        <a
                          href="https://en.wikipedia.org/wiki/Pomodoro_Technique"
                          className="text-blue-600 "
                        >
                          Pomodoro
                        </a>{" "}
                        work sessions only (breaks excluded).
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>

              {logs.map((entry, index) => (
                <div key={index} className=" min-w-screen bg-inherit">
                  <Accordion
                    type="single"
                    collapsible
                    className="min-w-screen border-b-2"
                    defaultValue="item-1"
                  >
                    <AccordionItem value="item-2 min-w-screen">
                      <AccordionTrigger>
                        <div className="flex w-full justify-between gap-4 font-bold underline">
                          <div className="w-40 text-xl text-center">
                            Session Ended:{" "}
                            {DateTime.fromISO(entry.created_at)
                              .setZone(timezone)
                              .toLocaleString(DateTime.TIME_SIMPLE)}
                          </div>
                          <Separator
                            orientation="vertical"
                            className="bg-white h-5"
                          />
                          <div className="w-44 text-xl flex items-center gap-x-2">
                            Time Spent: {entry.time_spent}{" "}
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-md">
                                  Represents how many{" "}
                                  <a
                                    href="https://en.wikipedia.org/wiki/Pomodoro_Technique"
                                    className="text-blue-600 "
                                  >
                                    pomodoro sessions
                                  </a>{" "}
                                  were spent (current split is 50/10)
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <Separator
                            orientation="vertical"
                            className="bg-white h-5"
                          />
                          <div className="w-40 text-xl">{entry.title}</div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="flex flex-col gap- mb-3 text-balance">
                        <div className="text-xl text-center">
                          {entry.content}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              ))}
            </div>
          ))}
      </div>
    </>
  );
};

export default TimeLine;
