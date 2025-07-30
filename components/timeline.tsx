import React from "react";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import { Accordion, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { AccordionContent } from "@radix-ui/react-accordion";
import { Database } from "@/database.types";
import { DateTime } from "luxon";
import { cookies } from "next/headers";
import { convertPomoToHours, convertTotalHoursDaily } from "@/lib/time/convert";

interface TimelineProps {
  entries: Record<string, Database["public"]["Tables"]["log"]["Row"][]> | null;
}
const TimeLine: React.FC<TimelineProps> = async ({ entries }) => {
  const timezone =
    (await cookies()).get("user-timezone")?.value || "America/Los_Angeles";
  const totalTimeSpent = convertPomoToHours(Object.values(entries!));
  const totalDailyTimeSpent = convertTotalHoursDaily(entries);
  return (
    <section className="bg-background ">
      <div className="container mx-auto py-2">
        <h1 className="text-foreground mb-4 text-center text-3xl font-bold tracking-tighter sm:text-6xl">
          DO NOT GIVE UP
        </h1>

        <div className="flex flex-row items-center justify-center space-x-4 mb-2">
          <Card>
            <CardContent className="text-center text-2xl font-extrabold p-4">
              <h1>Example Stats</h1>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center text-2xl font-extrabold p-4">
              <h1>Total Hours Logged: {totalTimeSpent.toFixed(2)}hrs</h1>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center text-2xl font-extrabold p-4">
              <h1>Example Stats</h1>
            </CardContent>
          </Card>
        </div>
        <div className="relative mx-auto w-[90vw]">
          <Separator
            orientation="vertical"
            className="bg-muted absolute left-2 top-4"
          />
          {entries !== null &&
            Object.entries(entries).map(([date, logs], index) => (
              <div key={index} className="relative mb-10 pl-8">
                <div className="bg-foreground absolute left-0 top-3.5 flex size-4 items-center justify-center rounded-full" />

                <div className="flex h-5 items-between space-x-4 text-3xl font-bold">
                  <div>
                    {date}: <span>{totalDailyTimeSpent[date]}hrs</span>
                  </div>
                </div>

                {logs.map((entry, index) => (
                  <div key={index} className=" min-w-screen">
                    <Accordion
                      type="single"
                      collapsible
                      className="min-w-screen"
                      defaultValue="item-1"
                    >
                      <AccordionItem value="item-2 min-w-screen">
                        <AccordionTrigger>
                          <div className="flex w-full justify-between gap-4 font-bold underline">
                            <div className="w-40 text-xl">
                              Session Ended:{" "}
                              {DateTime.fromISO(entry.created_at)
                                .setZone(timezone)
                                .toLocaleString(DateTime.TIME_SIMPLE)}
                            </div>
                            <Separator
                              orientation="vertical"
                              className="bg-white h-5"
                            />
                            <div className="w-40 text-xl">
                              Time Spent: {entry.time_spent}
                            </div>
                            <Separator
                              orientation="vertical"
                              className="bg-white h-5"
                            />
                            <div className="w-40 text-xl">{entry.title}</div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                          <div className="text-lg">{entry.content}</div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                ))}

                <Card className="my-5 border-none shadow-none">
                  <CardContent className="px-0 xl:px-2">
                    <div className="flex items-center space-x-5 pt-2 flex-shrink-0"></div>
                  </CardContent>
                </Card>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default TimeLine;
