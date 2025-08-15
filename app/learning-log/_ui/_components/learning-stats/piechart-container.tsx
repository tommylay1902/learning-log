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

  return (
    <Card className="flex flex-col border-0 bg-inherit">
      {/*animate-float-up delay-700 opacity-0*/}
      <CardHeader className="items-center pb-0 text-center ">
        <CardTitle>Pie Chart - Study Allocation Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <PieChartBreakdown data={filteredData} />
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm animate-float-up opacity-0 delay-700"></CardFooter>
    </Card>
  );
};

export default PieChartContainer;
