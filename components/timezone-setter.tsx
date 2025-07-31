"use client";

import { setTimezoneCookie } from "@/app/actions";
import { useEffect } from "react";

export function TimezoneDetector() {
  useEffect(() => {
    try {
      const detectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setTimezoneCookie(detectedTimezone);
    } catch (error) {
      console.error("Timezone detection failed:", error);
    }
  }, []);

  return null;
}
