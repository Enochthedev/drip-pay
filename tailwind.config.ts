import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"], // Kept for potential future use, but default is light
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
        // DripPay Brand Colors (Refined Palette)
        midnight_navy: "#0A0F2C",
        electric_indigo: "#5A48F2",
        drip_teal: "#00C2A8",
        soft_blush_coral: "#FF6B6B",
        ghost_white: "#F9FAFC",
        slate_gray: "#2E2E3A",

        // shadcn/ui CSS variable mappings
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))", // Will be ghost_white
        foreground: "hsl(var(--foreground))", // Will be slate_gray
        primary: {
          DEFAULT: "hsl(var(--primary))", // electric_indigo
          foreground: "hsl(var(--primary-foreground))", // ghost_white
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))", // drip_teal
          foreground: "hsl(var(--secondary-foreground))", // midnight_navy or ghost_white depending on contrast
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))", // soft_blush_coral
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))", // drip_teal or electric_indigo
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))", // Typically white or very light gray on ghost_white
          foreground: "hsl(var(--card-foreground))", // slate_gray
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // For body text, UI elements
        grotesk: ["Space Grotesk", "sans-serif"], // For headings
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
        "subtle-glow": {
          "0%, 100%": { boxShadow: "0 0 15px -5px rgba(90, 72, 242, 0.3)" }, // electric_indigo glow
          "50%": { boxShadow: "0 0 20px 0px rgba(90, 72, 242, 0.5)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "subtle-glow": "subtle-glow 3s infinite ease-in-out",
      },
      boxShadow: {
        "glow-indigo": "0 0 15px 5px rgba(90, 72, 242, 0.2)",
        "glow-teal": "0 0 15px 5px rgba(0, 194, 168, 0.2)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
