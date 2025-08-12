import LearningStatsView from "./learning-stats-view";
import TimeLineView from "./timeline-view";

const MainView = async () => {
  // const supabase = createClient();
  // const logs = await fetchLogs(supabase);
  return (
    <section className="flex-1">
      <div className="py-2 mx-8">
        <LearningStatsView />
        <TimeLineView />
      </div>
    </section>
  );
};

export default MainView;
