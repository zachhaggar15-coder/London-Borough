import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Used by the match-score colour ramp on the map and list.
        match: {
          0: "#1f2937",   // dark slate — excluded
          1: "#7f1d1d",
          2: "#b91c1c",
          3: "#dc2626",
          4: "#ea580c",
          5: "#f59e0b",
          6: "#eab308",
          7: "#84cc16",
          8: "#22c55e",
          9: "#16a34a",
          10: "#15803d",
        },
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
