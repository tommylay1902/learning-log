import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import TimeLine from "../_components/timeline";
import { createClient } from "@/lib/supabase/client";
import { cookies } from "next/headers";
import { fetchLogs, fetchWeeklyLogs } from "../../_server/logs";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

const TimeLineView = async () => {
  const supabase = createClient();
  const fetchLogsCall = fetchLogs(supabase);
  const fetchWeeklyLogsCall = fetchWeeklyLogs(supabase);

  const timezone =
    (await cookies()).get("user-timezone")?.value || "America/Los_Angeles";

  return (
    <ErrorBoundary fallback={<p>Error...</p>}>
      <Suspense
        fallback={
          <div className="flex flex-col justify-center items-center mt-[10dvh]">
            <div>
              <LoadingSpinner className="w-[10dvw] h-[10dvh]  text-center" />
            </div>
            <p className="text-muted-foreground">Getting learning logs...</p>
          </div>
        }
      >
        <TimeLine
          fetchLogs={fetchLogsCall}
          fetchWeeklyLogs={fetchWeeklyLogsCall}
          timezone={timezone}
        />
      </Suspense>
    </ErrorBoundary>
  );
};

export default TimeLineView;
