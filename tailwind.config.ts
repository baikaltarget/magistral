import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        page: "#F2F3F5", sheet: "#FFFFFF", ink: "#1B2733", muted: "#5E6B78", line: "#E4E7EB",
        accent: { DEFAULT: "#EC691F", deep: "#C9551A", soft: "#FDF0E7" },
      },
      fontFamily: { sans: ["'Manrope Variable'", "Manrope", "system-ui", "-apple-system", "Segoe UI", "sans-serif"] },
      borderRadius: { xl2: "1.75rem", pill: "999px" },
      maxWidth: { site: "1400px" },
      boxShadow: { card: "0 1px 2px rgba(27,39,51,.04), 0 8px 24px -12px rgba(27,39,51,.12)" },
    },
  },
  plugins: [],
};
export default config;
