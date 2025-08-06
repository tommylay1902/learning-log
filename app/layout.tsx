import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { TimezoneDetector } from "@/components/timezone-setter";
import Nav from "@/components/nav";
import { Suspense } from "react";
import { NavigationEvents } from "@/components/navigation-events";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Tommy's Log",
  description: "A personal learning log to track my progress and insights.",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <TimezoneDetector />
      <body className={`${geistSans.className} antialiased`}>
        <div className="flex flex-col min-h-screen">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Nav />
            <div className="flex-1">{children}</div>
          </ThemeProvider>
        </div>

        <Suspense>
          <NavigationEvents />
        </Suspense>
      </body>
    </html>
  );
}
