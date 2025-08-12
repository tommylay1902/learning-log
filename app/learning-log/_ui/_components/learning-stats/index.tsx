import React, { use } from "react";

import CurrentProjects from "./current-projects";
import LearningResources from "./learning-resources";
import PieChartContainer from "./piechart-container";

interface LearningStatsProps {
  getCategories: Promise<
    {
      title: string;
      color: string;
      time_spent: {
        sum: number;
      }[];
    }[]
  >;
}

const LearningStats = ({ getCategories }: LearningStatsProps) => {
  const categories = use(getCategories);

  return (
    <div className="flex flex-row items-center justify-center space-x-4 mb-2 min-w-screen">
      <CurrentProjects />
      <PieChartContainer categories={categories} />
      <LearningResources />
    </div>
  );
};

export default LearningStats;
