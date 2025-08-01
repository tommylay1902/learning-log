import * as React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LearningPieChart } from "./learning-piechart";
import { createClient } from "@/lib/supabase/client";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface LearningStatsProps {
  totalTimeSpent: number;
}

const LearningStats: React.FC<LearningStatsProps> = async ({
  totalTimeSpent,
}) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("category")
    .select(
      `
      title,
      color,
      time_spent:learning_log(
        time_spent.sum()
      )
    `,
    )
    .order("title");

  if (error) console.error(error);
  const filteredDate = data?.filter((d) => d.time_spent[0].sum > 0) ?? [];
  return (
    <div className="flex flex-row items-center justify-center space-x-4 mb-2 min-w-screen">
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0 text-center">
          <CardTitle>Pie Chart - Study Allocation Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <LearningPieChart data={filteredDate} />
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <h1 className="flex gap-x-2">
            Total Working Hours Logged: {totalTimeSpent.toFixed(2)}hrs{" "}
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
          </h1>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LearningStats;
