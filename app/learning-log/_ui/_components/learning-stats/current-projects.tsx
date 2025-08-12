import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import React from "react";

const CurrentProjects = () => {
  return (
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
                  className="invert inline-flex pb-1 ml-2 hover:scale-125"
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
  );
};

export default CurrentProjects;
