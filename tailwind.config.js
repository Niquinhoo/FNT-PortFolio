/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      "colors": {
        // Core Cream/Bone White background
        "surface": "#FBFBFA",
        "surface-dim": "#F7F6F3",
        "surface-bright": "#FFFFFF",
        
        // Cards and inner surfaces (Pure white)
        "surface-container-lowest": "#FFFFFF",
        "surface-container-low": "#FFFFFF",
        "surface-container": "#FFFFFF",
        "surface-container-high": "#F9F9F8",
        "surface-container-highest": "#F2F2F2",
        "surface-variant": "#F9F9F8",
        
        // Text (Off-black and muted grays)
        "on-surface": "#111111",
        "on-surface-variant": "#787774",
        "on-background": "#111111",
        
        // Red Accent (Rojo)
        "primary": "#D90429",
        "on-primary": "#FFFFFF",
        "primary-container": "#FDEBEC", // Pale Red
        "on-primary-container": "#9F2F2D", // Text on Pale Red
        "primary-fixed": "#FDEBEC",
        "primary-fixed-dim": "#FAD4D6",
        "on-primary-fixed": "#9F2F2D",
        "on-primary-fixed-variant": "#7A1C1A",
        
        // Orange Accent (Naranja)
        "secondary": "#F77F00",
        "on-secondary": "#FFFFFF",
        "secondary-container": "#FFF0E6", // Pale Orange
        "on-secondary-container": "#B35900", // Text on Pale Orange
        "secondary-fixed": "#FFF0E6",
        "secondary-fixed-dim": "#FFE0CC",
        "on-secondary-fixed": "#B35900",
        
        // Muted/Tertiary
        "tertiary": "#787774",
        "on-tertiary": "#FFFFFF",
        "tertiary-container": "#F2F2F2",
        "on-tertiary-container": "#111111",
        
        // Borders (Ultra-light gray)
        "outline": "#EAEAEA",
        "outline-variant": "rgba(0,0,0,0.06)",
        
        // Background
        "background": "#FBFBFA",
        
        // Error
        "error": "#ba1a1a",
        "on-error": "#ffffff",
        "error-container": "#ffdad6",
        "on-error-container": "#93000a",
      },
      "borderRadius": {
        "DEFAULT": "4px",
        "sm": "2px",
        "md": "6px",
        "lg": "8px",
        "xl": "12px",
        "2xl": "16px",
        "3xl": "24px",
        "full": "9999px"
      },
      "fontFamily": {
        "headline": ["Playfair Display", "serif"],
        "body": ["'Helvetica Neue'", "Helvetica", "Arial", "sans-serif"],
        "label": ["'Helvetica Neue'", "Helvetica", "Arial", "sans-serif"],
        "mono": ["'JetBrains Mono'", "monospace"]
      }
    },
  },
  plugins: [],
}
