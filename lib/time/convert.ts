export const convertPomoToHours = (
  pomos: {
    content: string | null;
    created_at: string;
    id: number;
    time_spent: number | null;
    title: string | null;
  }[][]
): number => {
  const totalTimeSpent = pomos?.reduce((acc, pomo) => {
    if (pomo) {
      const totalPomos = pomo.reduce((sum, current) => {
        return sum + (current.time_spent || 0);
      }, 0);
      return acc + totalPomos;
    }
    return acc;
  }, 0);
  return (totalTimeSpent * 50) / 60;
};
