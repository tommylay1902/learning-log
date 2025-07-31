import React from "react";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import { Accordion, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { AccordionContent } from "@radix-ui/react-accordion";
import { Database } from "@/database.types";
import { DateTime } from "luxon";
import { cookies } from "next/headers";
import { convertTotalHoursDaily } from "@/lib/time/convert";
import { beautifyYMD } from "@/lib/time/date";

interface TimelineProps {
  entries: Record<
    string,
    Database["public"]["Tables"]["learning_log"]["Row"][]
  > | null;
}
const TimeLine: React.FC<TimelineProps> = async ({ entries }) => {
  const timezone =
    (await cookies()).get("user-timezone")?.value || "America/Los_Angeles";

  const totalDailyTimeSpent = convertTotalHoursDaily(entries);
  return (
    <div className="relative w-full">
      <Separator
        orientation="vertical"
        className="bg-white absolute left-2 top-4"
      />
      {entries !== null &&
        Object.entries(entries).map(([date, logs], index) => (
          <div key={index} className="relative mb-10 pl-8">
            <div className="bg-foreground absolute left-0 top-3.5 flex size-4 items-center justify-center rounded-full " />

            <div className="flex items-between justify-between space-x-4 text-3xl font-bold mr-3 border-b-2 border-white pb-2">
              <div className="pt-1">{beautifyYMD(date)}</div>
              <div className="pt-1">
                <span>Time Studied: {totalDailyTimeSpent[date]}hrs</span>
              </div>
            </div>

            {logs.map((entry, index) => (
              <div key={index} className=" min-w-screen">
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
                    <AccordionContent className="flex flex-col gap- mb-3 text-balance">
                      <div className="text-xl text-center">{entry.content}</div>
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
  );
};

export default TimeLine;
