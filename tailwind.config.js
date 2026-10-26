/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#0B070E",
        "velvet-plum": "#160E1D",
        "plum-charcoal": "#160E1D",
        "royal-purple": "#6B21A8",
        "royal-purple-light": "#C084FC",
        "royal-purple-deep": "#3B0764",
        "cream-ribbon": "#E8D8C8",
        "burnt-orange": "#E86F2C",
        "culinary-gold": "#D4AF37",
        "gold-light": "#F3C663",
        "cream-text": "#FAF6F0",
        "muted-stone": "#B8ACA3",
        "surface-highlight": "#261533",
        "whatsapp-green": "#25D366",
        background: "#0B070E",
        card: "#160E1D",
        primary: "#E86F2C",
        foreground: "#FAF6F0",
        "muted-foreground": "#B8ACA3",
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', "sans-serif"],
        sans: ['"Plus Jakarta Sans"', "sans-serif"],
        script: ['"Cormorant Garamond"', "serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
    },
  },
  plugins: [],
};
