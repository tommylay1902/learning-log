import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";

interface WorkTimerProps {
  initialTime: number;
  onActiveChange: (active: boolean) => void;
  // onComplete: () => void;
}

const WorkTimer: React.FC<WorkTimerProps> = ({
  initialTime = 2,
  onActiveChange,
  // onComplete,
}) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const toggleRunning = () => {
    setIsRunning((prev) => !prev);
  };

  useEffect(() => {
    if (isActive) {
    }
  }, [isActive]);

  useEffect(() => {
    onActiveChange(isActive);
  }, [isActive, onActiveChange]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current as NodeJS.Timeout);
            setIsRunning(false);
            setIsActive(false);
            // onComplete();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, time]);

  useEffect(() => {
    if (time === 0) {
      const timer = setTimeout(() => {
        setTime(initialTime);
        alert("done!");
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [time, initialTime]);

  useEffect(() => {
    const handleKeyUpEvent = (event: KeyboardEvent) => {
      if (event.key === " ") {
        toggleRunning();
        setIsActive((prev) => !prev);
      }
    };

    window.addEventListener("keyup", handleKeyUpEvent);

    return () => {
      window.removeEventListener("keyup", handleKeyUpEvent);
    };
  }, []);

  const toggleTimer = () => {
    setIsActive(!isActive);
    setIsRunning((prev) => !prev);
  };

  return (
    <div className="text-center text-8xl font-bold flex flex-col items-center justify-center justify-items-center gap-y-3 h-full pb-32">
      <div>{isRunning ? "Focus" : "Stopped"}</div>
      <div>
        {Math.floor(time / 60).toFixed(0)}:{" "}
        {time % 60 <= 9 ? "0" + (time % 60) : time % 60}
      </div>
      <div>
        <Button
          className="sm:h-9 md:h-12 rounded-md px-3 w-[20vw] font-bold"
          onClick={toggleTimer}
          onMouseDown={(e) => e.preventDefault()}
        >
          {isActive ? "Pause" : "Start"}
        </Button>
      </div>
    </div>
  );
};

export default WorkTimer;
