/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}", // Covers all your components and App.js/index.js
    "./page.jsx", // Your root-level page.jsx
  ],
  theme: {
    extend: {
      // --- IMPORTANT: Add your custom colors here ---
      colors: {
        // These names will become Tailwind class prefixes
        // (e.g., bg-background, text-foreground, border-border)
        // We use hsl(var(--variable-name)) to reference your CSS variables
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        popover: "hsl(var(--popover))",
        "popover-foreground": "hsl(var(--popover-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        destructive: "hsl(var(--destructive))",
        "destructive-foreground": "hsl(var(--destructive-foreground))",
        border: "hsl(var(--border))", // This one is crucial for `border-border`
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      // Keep your custom font family definition
      fontFamily: {
        serif: ['"Playfair Display"', "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
