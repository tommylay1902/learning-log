// lib/actions.ts
"use server";

import { cookies } from "next/headers";

export async function setTimezoneCookie(timezone: string) {
  (await cookies()).set({
    name: "user-timezone",
    value: timezone,
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return { success: true };
}
