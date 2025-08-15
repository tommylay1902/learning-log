import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const LearningStatsViewSkeleton = () => {
  return (
    <div className="flex flex-row items-center justify-center space-x-4 mb-2 min-w-screen">
      <div className="flex flex-col justify-center items-center md:flex-row gap-8 w-full max-w-6xl px-4">
        {/* Left Section */}

        <div className="min-w-[30vw] space-y-4">
          {/* Heading */}
          <div className="flex justify-center items-center">
            <Skeleton className="h-8 w-[367px]" />
          </div>

          {/* Projects List */}
          <ul className="space-y-3">
            {/* Budget Per Serving */}
            <li className="flex items-center justify-center gap-2">
              <Skeleton className="h-6 w-[213px]" />
              <Skeleton className="h-5 w-5 rounded-full" />
            </li>

            {/* This website! */}
            <li className="flex items-center justify-center gap-2">
              <Skeleton className="h-6 w-[150px]" />
              <Skeleton className="h-5 w-5 rounded-full" />
            </li>
          </ul>
        </div>

        {/* Middle Section */}
        <Card className="flex flex-col border-0 bg-inherit mb-20">
          {/* Card Header Skeleton */}
          <CardHeader className="items-center pb-0">
            <CardTitle>
              <Skeleton className="h-6 w-[280px]" />
            </CardTitle>
          </CardHeader>

          {/* Card Content Skeleton - Pie Chart */}
          <CardContent className="flex-1 pb-0 flex justify-center">
            <Skeleton className="h-[300px] w-[300px] rounded-full" />
          </CardContent>

          {/* Card Footer Skeleton - Stats */}
        </Card>

        {/* Right Section */}
        <div className="min-w-[30vw] text-center space-y-4">
          {/* Heading */}
          <div className="flex justify-center">
            <Skeleton className="h-8 w-[280px]" />
          </div>

          {/* Books List */}
          <ul className="space-y-3">
            {/* DI in .Net */}
            <li className="flex justify-center items-center gap-2">
              <Skeleton className="h-6 w-[120px]" />
              <Skeleton className="h-5 w-5" />
            </li>

            {/* Pro C# */}
            <li className="flex justify-center items-center gap-2">
              <Skeleton className="h-6 w-[80px]" />
              <Skeleton className="h-5 w-5" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LearningStatsViewSkeleton;
