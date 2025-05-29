import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))", // Keep existing shadcn/ui variables
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))", // This will be overridden by Ghost White for the page
        foreground: "hsl(var(--foreground))", // This will be overridden by Slate Gray
        primary: {
          // shadcn/ui primary, can be mapped to Electric Indigo
          DEFAULT: "#5A48F2", // Electric Indigo
          foreground: "#F9FAFC", // Ghost White
        },
        secondary: {
          // shadcn/ui secondary
          DEFAULT: "#00C2A8", // Drip Teal
          foreground: "#0A0F2C", // Midnight Navy
        },
        destructive: {
          DEFAULT: "#FF6B6B", // Soft Blush Coral
          foreground: "#F9FAFC", // Ghost White
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          // shadcn/ui accent, can be mapped to Drip Teal or Electric Indigo
          DEFAULT: "#00C2A8", // Drip Teal
          foreground: "#0A0F2C", // Midnight Navy
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          // shadcn/ui card
          DEFAULT: "#FFFFFF", // Pure white for cards on Ghost White bg, or a very light gray
          foreground: "#2E2E3A", // Slate Gray
        },
        // DripPay Brand Colors
        midnight_navy: "#0A0F2C",
        electric_indigo: "#5A48F2",
        drip_teal: "#00C2A8",
        soft_blush_coral: "#FF6B6B",
        ghost_white: "#F9FAFC",
        slate_gray: "#2E2E3A",
        // Swell specific colors (can be phased out or kept for specific Swell sections)
        swell_purple: {
          light: "#A855F7",
          DEFAULT: "#7C3AED",
          dark: "#6B21A8",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        grotesk: ["Space Grotesk", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "gradient-flow": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "gradient-flow": "gradient-flow 15s ease infinite",
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(270deg, hsl(var(--background)) 20%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
