import React from "react";
import MultiLog from "../multi-log";

interface ReflectCard {
  numSessions: number;
}
const ReflectCard = ({ numSessions }: ReflectCard) => {
  return (
    <div>
      <MultiLog totalSteps={numSessions} />
    </div>
  );
};

export default ReflectCard;
