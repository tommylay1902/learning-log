"use client";
import { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { currentMonthName } from "@/lib/time/date";
import { getColorClass } from "../../_helpers/color-class";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface LearningStreaksProps {
  dailyHours: Record<number, number>;
  daysThisMonth: number;
}

const LearningStreaks: React.FC<LearningStreaksProps> = ({
  dailyHours,
  daysThisMonth = 30,
}) => {
  const [weeks, setWeeks] = useState<number[][]>([]);
  const maxAnimationDelay = useMemo(() => {
    const lastWeekIndex = Math.ceil(daysThisMonth / 7) - 1;
    const lastDayInLastWeek = daysThisMonth % 7 || 7;
    return (lastWeekIndex * 7 + lastDayInLastWeek) * 0.003;
  }, [daysThisMonth]);

  useEffect(() => {
    const calculateWeeks = () => {
      const newWeeks: number[][] = [];
      let currentWeek: number[] = [];

      for (let i = 1; i <= daysThisMonth; i++) {
        currentWeek.push(i);
        if (currentWeek.length === 7 || i === daysThisMonth) {
          newWeeks.push(currentWeek);
          currentWeek = [];
        }
      }
      setWeeks(newWeeks);
    };

    calculateWeeks();
  }, [daysThisMonth]);
  return (
    <Table className="w-full border-separate border-spacing-2">
      <TableCaption
        className="font-bold text-xl text-center text-white opacity-0 animate-fade-in m-2"
        style={{ animationDelay: `${maxAnimationDelay + 0.3}s` }}
      >
        Learning Streaks {currentMonthName()}
      </TableCaption>
      <TableHeader>
        <TableRow>{}</TableRow>
      </TableHeader>
      <TableBody>
        {weeks.map((week, weekIndex) => (
          <TableRow
            key={weekIndex}
            className="hover:bg-transparent justify-center"
          >
            {week.map((day) => (
              <Tooltip key={day}>
                <TooltipTrigger asChild>
                  <TableCell
                    key={day}
                    className={`w-6 h-6 hover:scale-110 opacity-0 rounded-full animate-float-up-cell cursor-pointer ${getColorClass(dailyHours[day])}`}
                    style={{
                      animationDelay: `${(weekIndex * 7 + day) * 0.003}s`,
                    }}
                  ></TableCell>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {dailyHours[day]
                      ? `${dailyHours[day].toFixed(2)}hrs on ${day} ${currentMonthName()}`
                      : `No hours logged for ${day} ${currentMonthName()}`}
                  </p>
                </TooltipContent>
              </Tooltip>
            ))}
            {week.length < 7 &&
              Array(7 - week.length)
                .fill(0)
                .map((_, i) => (
                  <TableCell key={`empty-${i}`} className="w-4 h-4"></TableCell>
                ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LearningStreaks;
