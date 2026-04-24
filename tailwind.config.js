/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          900: "#0A0A0A",
          800: "#0F0F10",
          700: "#111113",
          600: "#16161A"
        },
        mute: {
          100: "#FFFFFF",
          200: "#E5E5E7",
          300: "#A1A1AA",
          400: "#6B6B73"
        },
        accent: {
          blue: "#3B82F6",
          violet: "#8B5CF6"
        }
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"]
      },
      letterSpacing: {
        tightest: "-0.04em",
        luxe: "-0.02em",
        wide2: "0.12em"
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
        power3: "cubic-bezier(0.215, 0.61, 0.355, 1)"
      },
      keyframes: {
        grain: {
          "0%, 100%": { transform: "translate(0,0)" },
          "10%": { transform: "translate(-5%,-5%)" },
          "30%": { transform: "translate(3%,-10%)" },
          "50%": { transform: "translate(-10%,5%)" },
          "70%": { transform: "translate(8%,2%)" },
          "90%": { transform: "translate(-3%,8%)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" }
        }
      },
      animation: {
        grain: "grain 8s steps(6) infinite",
        shimmer: "shimmer 3s linear infinite",
        float: "float 6s ease-in-out infinite"
      }
    }
  },
  plugins: []
};
