import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import TimeLine from "../_components/timeline";
import { createClient } from "@/lib/supabase/client";
import { cookies } from "next/headers";
import { fetchLogs, fetchWeeklyLogs } from "../../_server/logs";

const TimeLineView = async () => {
  const supabase = createClient();
  const fetchLogsCall = fetchLogs(supabase);
  const fetchWeeklyLogsCall = fetchWeeklyLogs(supabase);

  const timezone =
    (await cookies()).get("user-timezone")?.value || "America/Los_Angeles";

  return (
    <ErrorBoundary fallback={<p>Error...</p>}>
      <Suspense fallback={<p>Loading...</p>}>
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
