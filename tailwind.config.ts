import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        geist: ["geist", "sans-serif"],
      },
      keyframes: {
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translate(8px)",
          },
          "80%": {
            opacity: ".8",
            transform: "translate(-2px)",
          },
          "100%": {
            opacity: "1",
            transform: "translate(0)",
          },
        },
        "fade-in-right": {
          "0%": {
            opacity: "0",
            transform: "translate(-8px)",
          },
          "80%": {
            opacity: ".8",
            transform: "translate(-2px)",
          },
          "100%": {
            opacity: "1",
            transform: "translate(0)",
          },
        },
        "float-up": {
          "0%": {
            transform: "translate(0, 100px)", // Starts below (centered)
            opacity: "0",
          },
          "80%": {
            transform: "translate(0, -10px)", // Overshoot (centered)
            opacity: "1",
          },
          "100%": {
            transform: "translate(0, 0)", // Final position (centered)
            opacity: "1",
          },
        },
        "float-up-cell": {
          "0%": {
            transform: "translateY(10px)",
            opacity: "0",
          },
          "80%": {
            transform: "translateY(-2px)",
            opacity: "1",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        pulsewave: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.7" },
          "50%": { transform: "scale(1.25)", opacity: ".8" },
        },
        border: {
          to: { "--border-angle": "360deg" },
        },
      },
      animation: {
        "float-up": "float-up .75s ease-out forwards",
        "float-up-cell": "float-up-cell 0.2s ease-out forwards",
        "fade-in": "fade-in .5s ease-out forwards",
        "fade-in-right": "fade-in-right .5s ease-out forwards",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        pulsewave: "pulsewave 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        border: "border 8s linear infinite",
      },
      animationDelay: {
        "700": "700ms",
        "1200": "1200ms",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
