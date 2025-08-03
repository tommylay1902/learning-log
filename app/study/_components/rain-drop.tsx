"use client";
import { motion } from "framer-motion";

interface RainDropProps {
  initialX: number;
  delay: number;
  start: boolean;
}
const RainDrop: React.FC<RainDropProps> = ({ initialX, delay, start }) => {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={
        start
          ? {
              y: "100vh",
              opacity: [0.5, 1, 0],
            }
          : {
              y: "0vh",
              opacity: [0, 0, 0],
            }
      }
      transition={{
        duration: Math.random() * 2 + 1,
        repeat: Infinity,
        delay: delay,
        ease: "linear",
      }}
      style={{
        position: "absolute",
        left: initialX,
        width: "2px",
        height: "10px",
        backgroundColor: "rgba(173, 216, 230, 0.8)", // Light blue for rain
      }}
    />
  );
};

export default RainDrop;
