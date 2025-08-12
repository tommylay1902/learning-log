import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

import { PieChartBreakdown } from "./piechart-breakdown";
// import { PieChartBreakdown } from "./piechart-breakdown";

interface PieChartContainerProps {
  categories: {
    title: string;
    color: string;
    time_spent: {
      sum: number;
    }[];
  }[];
}
const PieChartContainer = async ({ categories }: PieChartContainerProps) => {
  const filteredData = categories?.filter((d) => d.time_spent[0].sum > 0) ?? [];
  // const supabase = createClient();
  // const { data: weeklyLogs, error: weeklyLogErrors } = await supabase
  //   .from("learning_log")
  //   .select()
  //   .gte("created_at", getLastMonday().toISOString());

  // if (weeklyLogErrors) throw new Error();

  // const weeklyHours = weeklyLogs.reduce((acc, log) => {
  //   return acc + (log.time_spent ? log.time_spent : 0);
  // }, 0);

  return (
    <Card className="flex flex-col border-0 bg-inherit">
      <CardHeader className="items-center pb-0 text-center animate-float-up delay-700 opacity-0">
        <CardTitle>Pie Chart - Study Allocation Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <PieChartBreakdown data={filteredData} />
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm animate-float-up opacity-0 delay-700">
        {/*<h1 className="flex gap-x-2">
          Total Working Hours Logged: {totalTimeSpent.toFixed(2)}
          <Tooltip>
            <TooltipTrigger asChild>
              <Info size={16} />
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
        </h1>*/}
        {/*<h1>
          Total hours spent this week: {((weeklyHours * 50) / 60).toFixed(2)}
        </h1>*/}
      </CardFooter>
    </Card>
  );
};

export default PieChartContainer;
