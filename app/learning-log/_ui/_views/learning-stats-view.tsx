import { createClient } from "@/lib/supabase/client";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import LearningStats from "../_components/learning-stats";
import { getCategories } from "../../_server/categories";

interface LearningStatsProps {
  totalTimeSpent?: number;
}

const LearningStatsView: React.FC<LearningStatsProps> = async (
  {
    // totalTimeSpent = 0,
  },
) => {
  const supabase = createClient();
  const getCategoriesCall = getCategories(supabase);

  return (
    <ErrorBoundary fallback={<p>error...</p>}>
      <Suspense fallback={<p>loading...</p>}>
        <LearningStats getCategories={getCategoriesCall} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default LearningStatsView;
