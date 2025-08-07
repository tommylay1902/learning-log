import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";

interface BreakTimerProps {
  initialTime: number;
  onComplete: () => void;
}

const BreakTimer: React.FC<BreakTimerProps> = ({ initialTime, onComplete }) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const toggleRunning = () => {
    setIsRunning((prev) => !prev);
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current as NodeJS.Timeout);
            setIsRunning(false);
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
  }, [isRunning, onComplete]);

  useEffect(() => {
    if (time === 0) {
      const timer = setTimeout(() => {
        setTime(initialTime);
        alert("done!");
        onComplete();
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [time, initialTime, onComplete]);

  useEffect(() => {
    const handleKeyUpEvent = (event: KeyboardEvent) => {
      if (event.key === " ") {
        toggleRunning();
      }
    };

    window.addEventListener("keyup", handleKeyUpEvent);

    return () => {
      window.removeEventListener("keyup", handleKeyUpEvent);
    };
  }, []);

  return (
    <div className="text-center text-8xl font-bold flex flex-col items-center justify-center justify-items-center gap-y-3 h-full pb-32 min-h-[60vh]">
      <div>{isRunning ? "Relax" : "Stopped"}</div>
      <div>
        {Math.floor(time / 60).toFixed(0)}:{" "}
        {time % 60 <= 9 ? "0" + (time % 60) : time % 60}
      </div>
      <div>
        <Button
          className="sm:h-9 md:h-12 rounded-md px-3 w-[20vw] font-bold"
          onClick={() => setIsRunning((prev) => !prev)}
          onMouseDown={(e) => e.preventDefault()}
        >
          {isRunning ? "Stop" : "Start"}
        </Button>
      </div>
    </div>
  );
};

export default BreakTimer;
