import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Main Brand Colors
        brand: {
          primary: "#1a1a1a",    // Main text and important elements
          secondary: "#666666",   // Secondary text and less important elements
        },
        
        // Background Colors
        background: {
          DEFAULT: "#fafafa",     // Main background
          light: "#ffffff",       // Light sections
          dark: "#f5f5f5",        // Dark sections
          accent: "#1a1a1a05",    // Subtle accent backgrounds
        },
        
        // Accent Colors
        accent: {
          purple: {
            DEFAULT: "#8B5CF6",
            light: "#8B5CF620",   // For gradients and subtle effects
          },
          blue: {
            DEFAULT: "#3B82F6",
            light: "#3B82F620",   // For gradients and subtle effects
          },
          pink: {
            DEFAULT: "#EC4899",
            light: "#EC489920",   // For gradients and subtle effects
          },
        },
        
        // Status Colors
        status: {
          success: "#10B981",     // Success states and available status
          error: "#EF4444",       // Error states
          warning: "#F59E0B",     // Warning states
        },
        
        // Border Colors
        border: {
          DEFAULT: "#1a1a1a10",   // Default borders
          dark: "#1a1a1a20",      // Darker borders
          light: "#1a1a1a05",     // Lighter borders
        },
      },
      
      // Add opacity variations for all colors
      opacity: {
        '15': '.15',
        '35': '.35',
        '85': '.85',
      },
    },
  },
  plugins: [],
} satisfies Config;
