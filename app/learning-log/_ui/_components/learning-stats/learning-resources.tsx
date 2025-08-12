import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SquareArrowOutUpRight } from "lucide-react";
import React from "react";

const LearningResources = () => {
  return (
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
  );
};

export default LearningResources;
