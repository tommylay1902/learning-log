export const getColorClass = (contributions: number) => {
  if (contributions > 4) return "bg-green-900";
  else if (contributions <= 2) return "bg-green-200";
  else if (contributions <= 4) return "bg-green-600";
  else return "bg-gray-600";
};
