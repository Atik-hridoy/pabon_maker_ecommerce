/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      "colors": {
              "inverse-primary": "#bec5e5",
              "surface-dim": "#d4dbe2",
              "on-primary-container": "#7b83a0",
              "on-surface-variant": "#45464d",
              "inverse-surface": "#2b3137",
              "outline-variant": "#c6c6ce",
              "on-surface": "#161c22",
              "surface-tint": "#565d79",
              "error-container": "#ffdad6",
              "inverse-on-surface": "#ebf1f9",
              "tertiary-container": "#00201f",
              "on-error": "#ffffff",
              "on-secondary-fixed": "#351000",
              "surface-container-highest": "#dde3eb",
              "secondary-container": "#fe6b00",
              "on-primary-fixed-variant": "#3e4660",
              "primary-container": "#131a33",
              "on-tertiary-fixed-variant": "#00504f",
              "surface-container-low": "#eef4fc",
              "surface": "#f6f9ff",
              "on-tertiary-container": "#219291",
              "primary-fixed-dim": "#bec5e5",
              "on-error-container": "#93000a",
              "on-background": "#161c22",
              "secondary": "#a04100",
              "surface-container-lowest": "#ffffff",
              "on-secondary-fixed-variant": "#7a3000",
              "surface-variant": "#dde3eb",
              "error": "#ba1a1a",
              "on-secondary-container": "#572000",
              "on-tertiary-fixed": "#00201f",
              "on-primary": "#ffffff",
              "on-primary-fixed": "#131a33",
              "surface-container": "#e8eef6",
              "outline": "#76767e",
              "surface-container-high": "#e3e9f1",
              "primary-fixed": "#dbe1ff",
              "on-tertiary": "#ffffff",
              "tertiary-fixed-dim": "#73d6d4",
              "tertiary-fixed": "#90f3f1",
              "tertiary": "#000000",
              "background": "#f6f9ff",
              "secondary-fixed-dim": "#ffb693",
              "primary": "#000000",
              "on-secondary": "#ffffff",
              "secondary-fixed": "#ffdbcc",
              "surface-bright": "#f6f9ff"
      },
      "borderRadius": {
              "DEFAULT": "0.25rem",
              "lg": "0.5rem",
              "xl": "0.75rem",
              "full": "9999px"
      },
      "spacing": {
              "container-max": "1280px",
              "margin-desktop": "48px",
              "stack-lg": "32px",
              "stack-md": "16px",
              "stack-sm": "8px",
              "gutter": "24px",
              "margin-mobile": "16px"
      },
      "fontFamily": {
              "label-caps": ["Geist"],
              "display-lg": ["Inter"],
              "technical-data": ["Geist"],
              "body-sm": ["Inter"],
              "headline-md": ["Inter"],
              "display-lg-mobile": ["Inter"],
              "body-base": ["Inter"]
      },
      "fontSize": {
              "label-caps": ["12px", {"lineHeight": "1.0", "letterSpacing": "0.05em", "fontWeight": "600"}],
              "display-lg": ["48px", {"lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "700"}],
              "technical-data": ["13px", {"lineHeight": "1.4", "fontWeight": "500"}],
              "body-sm": ["14px", {"lineHeight": "1.5", "fontWeight": "400"}],
              "headline-md": ["24px", {"lineHeight": "1.3", "fontWeight": "600"}],
              "display-lg-mobile": ["32px", {"lineHeight": "1.2", "fontWeight": "700"}],
              "body-base": ["16px", {"lineHeight": "1.6", "fontWeight": "400"}]
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
}
