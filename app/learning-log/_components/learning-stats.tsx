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
import Image from "next/image";
import { SquareArrowOutUpRight } from "lucide-react";

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
      <div className="min-w-[30vw] text-center animate-fade-in-right delay-700 opacity-0">
        <h1 className="font-bold text-2xl inline-flex items-baseline justify-center gap-x-2">
          Current Projects I&apos;m working on
        </h1>
        <ul className="text-2xl text-blue">
          <li className="inline-flex items-center justify-center gap-1">
            <span>Budget Per Serving</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <a href="https://github.com/tommylay1902/BPS" target="_blank">
                  <Image
                    alt="githubLogo"
                    src="svg/github.svg"
                    width="20"
                    height="20"
                    className=" invert inline-flex pb-1 ml-2 hover:scale-125"
                  />
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-md">Click this to see the github repo!</p>
              </TooltipContent>
            </Tooltip>
          </li>
          <li>
            <span>This website!</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="https://github.com/tommylay1902/learning-log"
                  target="_blank"
                >
                  <Image
                    alt="githubLogo"
                    src="svg/github.svg"
                    width="20"
                    height="20"
                    className=" invert inline-flex pb-1 ml-2 hover:scale-125"
                  />
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-md">Click this to see the github repo!</p>
              </TooltipContent>
            </Tooltip>
          </li>
        </ul>
      </div>
      <Card className="flex flex-col border-0 bg-inherit">
        <CardHeader className="items-center pb-0 text-center animate-float-up delay-700 opacity-0">
          <CardTitle>Pie Chart - Study Allocation Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <LearningPieChart data={filteredDate} />
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm animate-float-up opacity-0 delay-700">
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
      <div className="min-w-[30vw] text-center animate-fade-in delay-700 opacity-0">
        <h1 className="font-bold text-2xl inline-flex items-baseline justify-center gap-x-2">
          Current reading resources
        </h1>
        <ul className="text-2xl text-blue">
          <li>
            <div className="inline-flex justify-center items-center ">
              <span>DI in .Net</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href="https://www.amazon.com/Dependency-Injection-NET-Mark-Seemann/dp/1935182501"
                    target="_blank"
                  >
                    <SquareArrowOutUpRight size={18} className={"ml-2"} />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-md">View the book on amazon</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </li>
          <li className="items-center">
            <div className="inline-flex justify-center items-center ">
              <span>Pro C#</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href="https://www.amazon.com/Pro-NET-Foundational-Principles-Programming/dp/1484278682"
                    target="_blank"
                  >
                    <SquareArrowOutUpRight size={18} className={"ml-2"} />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-md">View the book on amazon</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LearningStats;
