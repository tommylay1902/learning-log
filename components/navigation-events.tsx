"use client";

import { usePathname, useRouter } from "next/navigation";
import { useRef, useEffect } from "react";

export function NavigationEvents() {
  const pathname = usePathname();
  const router = useRouter();
  const previousPath = useRef(pathname);

  useEffect(() => {
    const from = previousPath.current;
    const to = pathname;

    if (from === "/study" && to !== "/study") {
      const confirmed = confirm("Confirm you want to leave the study page.");

      if (!confirmed) {
        // Block navigation by reverting to the previous path
        router.push(from);
        return;
      }
    } else {
      previousPath.current = to;
      return;
    }
  }, [pathname, router]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (pathname === "/study") {
        e.preventDefault();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [pathname]);

  return null;
}
