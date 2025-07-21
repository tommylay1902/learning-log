import React from "react";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import { Database } from "@/database.types";

interface TimelineProps {
  entries: Database["public"]["Tables"]["log"]["Row"][] | null;
}
const TimeLine: React.FC<TimelineProps> = ({ entries }) => {
  const conversionDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  return (
    <section className="bg-background ">
      <div className="container mx-auto py-2">
        <h1 className="text-foreground mb-10 text-center text-3xl font-bold tracking-tighter sm:text-6xl">
          Tommy Lay&apos;s Learning Log
        </h1>
        <div className="relative mx-auto max-w-4xl">
          <Separator
            orientation="vertical"
            className="bg-muted absolute left-2 top-4"
          />
          {entries !== null &&
            entries.map((entry, index) => (
              <div key={index} className="relative mb-10 pl-8">
                <div className="bg-foreground absolute left-0 top-3.5 flex size-4 items-center justify-center rounded-full" />

                <div className="flex h-5 items-center space-x-4 text-2xl font-bold">
                  <div>{conversionDate(entry.created_at.split("T")[0])}</div>

                  <Separator orientation="vertical" />
                  <div>{entry.title}</div>
                </div>

                <Card className="my-5 border-none shadow-none">
                  <CardContent className="px-0 xl:px-2">
                    <div className="flex items-center space-x-5 pt-2 flex-shrink-0">
                      <div className="flex-shrink-0 pt-2 font-semibold">
                        {entry.time_spent} Pomos
                      </div>
                      <Separator
                        orientation="vertical"
                        className="min-h-full"
                      />
                      <div className="pt-2"> {entry.content}</div>
                    </div>
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
