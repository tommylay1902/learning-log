import { useEffect, useState } from "react";

// interface BreakTimerProps {}

const BreakTimer: React.FC = ({}) => {
  const [time, setTime] = useState(600);
  const [isRunning, setIsRunning] = useState(false);
  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (!isRunning && intervalId) {
      clearInterval(intervalId);
    }

    return () => {
      if (intervalId) return clearInterval(intervalId);
    };
  }, [isRunning]);

  useEffect(() => {
    const handleKeyUpEvent = (event: KeyboardEvent) => {
      if (event.key === " ") {
        setIsRunning((isRunning) => !isRunning);
      }
    };

    window.addEventListener("keyup", handleKeyUpEvent);

    return () => {
      window.removeEventListener("keyup", handleKeyUpEvent);
    };
  }, []);

  return (
    <div className="text-center text-8xl font-bold flex flex-col items-center justify-center justify-items-center gap-y-3 h-full pb-32">
      <div>{isRunning ? "Relax" : "Stopped"}</div>
      <div>
        {Math.floor(time / 60).toFixed(0)}:{" "}
        {time % 60 <= 9 ? "0" + (time % 60) : time % 60}
      </div>
    </div>
  );
};

export default BreakTimer;
