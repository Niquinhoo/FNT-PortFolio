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
        "surface": "var(--surface)",
        "surface-dim": "var(--surface-dim)",
        "surface-bright": "var(--surface-bright)",
        
        // Cards and inner surfaces
        "surface-container-lowest": "var(--surface-bright)",
        "surface-container-low": "var(--surface-container)",
        "surface-container": "var(--surface-container)",
        "surface-container-high": "var(--surface-container-high)",
        "surface-container-highest": "var(--surface-container-highest)",
        "surface-variant": "var(--surface-container-high)",
        
        // Text
        "on-surface": "var(--on-surface)",
        "on-surface-variant": "var(--on-surface-variant)",
        "on-background": "var(--on-surface)",
        
        // Red Accent (Rojo)
        "primary": "var(--primary)",
        "on-primary": "var(--on-primary)",
        "primary-container": "var(--primary-container)",
        "on-primary-container": "var(--on-primary-container)",
        
        // Dark Red Accent
        "secondary": "var(--secondary)",
        "on-secondary": "var(--on-secondary)",
        "secondary-container": "var(--primary-container)",
        "on-secondary-container": "var(--secondary)",
        
        // Muted/Tertiary
        "tertiary": "var(--on-surface-variant)",
        "on-tertiary": "var(--surface)",
        
        // Borders
        "outline": "var(--outline)",
        "outline-variant": "var(--outline-variant)",
        
        // Background
        "background": "var(--surface)",
        
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
        "serif": ["Playfair Display", "serif"],
        "sans": ["Inter", "sans-serif"],
        "body": ["Inter", "sans-serif"],
        "label": ["Inter", "sans-serif"],
        "mono": ["Fira Code", "monospace"],
        "inter": ["Inter", "sans-serif"]
      }
    },
  },
  plugins: [],
}
