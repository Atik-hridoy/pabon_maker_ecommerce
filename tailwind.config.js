/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      "colors": {
              "surface-container": "#e7eeff",
              "primary-container": "#0052ff",
              "surface-container-highest": "#d8e3fb",
              "on-primary-container": "#dfe3ff",
              "surface": "#f9f9ff",
              "on-secondary-fixed": "#002113",
              "secondary-fixed": "#6ffbbe",
              "inverse-surface": "#263143",
              "on-tertiary-fixed-variant": "#2f2ebe",
              "error-container": "#ffdad6",
              "on-surface-variant": "#434656",
              "tertiary-container": "#5153de",
              "on-primary-fixed": "#001452",
              "on-background": "#111c2d",
              "primary": "#003ec7",
              "inverse-on-surface": "#ecf1ff",
              "tertiary": "#3737c5",
              "tertiary-fixed": "#e1e0ff",
              "primary-fixed-dim": "#b7c4ff",
              "on-secondary-fixed-variant": "#005236",
              "on-secondary": "#ffffff",
              "on-secondary-container": "#00714d",
              "surface-bright": "#f9f9ff",
              "on-surface": "#111c2d",
              "on-tertiary": "#ffffff",
              "secondary": "#006c49",
              "on-error-container": "#93000a",
              "surface-tint": "#004ced",
              "secondary-container": "#6cf8bb",
              "surface-variant": "#d8e3fb",
              "on-primary-fixed-variant": "#0038b6",
              "on-tertiary-container": "#e3e2ff",
              "outline-variant": "#c3c5d9",
              "primary-fixed": "#dde1ff",
              "on-tertiary-fixed": "#07006c",
              "secondary-fixed-dim": "#4edea3",
              "surface-container-lowest": "#ffffff",
              "on-primary": "#ffffff",
              "outline": "#737688",
              "error": "#ba1a1a",
              "background": "#f9f9ff",
              "inverse-primary": "#b7c4ff",
              "tertiary-fixed-dim": "#c0c1ff",
              "surface-dim": "#cfdaf2",
              "on-error": "#ffffff",
              "surface-container-low": "#f0f3ff",
              "surface-container-high": "#dee8ff"
      },
      "borderRadius": {
              "DEFAULT": "0.125rem",
              "lg": "0.25rem",
              "xl": "0.5rem",
              "full": "0.75rem"
      },
      "spacing": {
              "margin-mobile": "16px",
              "max-width": "1440px",
              "margin-desktop": "64px",
              "unit": "4px",
              "gutter": "24px"
      },
      "fontFamily": {
              "title-sm": ["Space Grotesk"],
              "body-lg": ["Inter"],
              "headline-md-mobile": ["Space Grotesk"],
              "display-lg": ["Space Grotesk"],
              "body-md": ["Inter"],
              "display-lg-mobile": ["Space Grotesk"],
              "code-label": ["JetBrains Mono"],
              "headline-md": ["Space Grotesk"],
              "caption": ["Inter"]
      },
      "fontSize": {
              "title-sm": ["20px", {"lineHeight": "28px", "fontWeight": "500"}],
              "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}],
              "headline-md-mobile": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
              "display-lg": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
              "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
              "display-lg-mobile": ["32px", {"lineHeight": "40px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
              "code-label": ["14px", {"lineHeight": "20px", "letterSpacing": "0.02em", "fontWeight": "500"}],
              "headline-md": ["32px", {"lineHeight": "40px", "fontWeight": "600"}],
              "caption": ["12px", {"lineHeight": "16px", "fontWeight": "500"}]
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
}
