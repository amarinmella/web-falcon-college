/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./*.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "on-surface-variant": "#43474d",
                "primary-container": "#0a2540",
                "tertiary-container": "#302200",
                "tertiary-fixed-dim": "#e4c278",
                "tertiary-fixed": "#ffdf9b",
                "error": "#ba1a1a",
                "secondary-fixed-dim": "#cac6be",
                "on-error": "#ffffff",
                "on-tertiary-container": "#a58843",
                "inverse-primary": "#b0c8eb",
                "primary": "#000f22",
                "tertiary": "#160e00",
                "on-secondary-container": "#66645d",
                "on-tertiary": "#ffffff",
                "on-secondary": "#ffffff",
                "on-surface": "#1a1c1c",
                "on-background": "#1a1c1c",
                "outline-variant": "#c4c6ce",
                "inverse-surface": "#2f3131",
                "surface-container-low": "#f3f3f4",
                "surface-container-highest": "#e2e2e2",
                "on-secondary-fixed": "#1c1c16",
                "background": "#f9f9f9",
                "surface-container": "#eeeeee",
                "primary-fixed": "#d2e4ff",
                "on-tertiary-fixed": "#251a00",
                "secondary-container": "#e6e2d9",
                "surface-dim": "#dadada",
                "surface-container-high": "#e8e8e8",
                "on-secondary-fixed-variant": "#484740",
                "surface-container-lowest": "#ffffff",
                "inverse-on-surface": "#f0f1f1",
                "on-primary-fixed-variant": "#314865",
                "secondary": "#605e58",
                "surface-tint": "#49607e",
                "surface-variant": "#e2e2e2",
                "error-container": "#ffdad6",
                "surface-bright": "#f9f9f9",
                "primary-fixed-dim": "#b0c8eb",
                "on-primary-container": "#768dad",
                "secondary-fixed": "#e6e2d9",
                "outline": "#74777e",
                "surface": "#f9f9f9",
                "on-primary": "#ffffff",
                "on-error-container": "#93000a",
                "on-primary-fixed": "#001c37",
                "on-tertiary-fixed-variant": "#5a4302"
            },
            borderRadius: {
                "DEFAULT": "0.25rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "full": "9999px"
            },
            spacing: {
                "stack-lg": "32px",
                "section-padding": "80px",
                "stack-md": "16px",
                "margin-mobile": "20px",
                "margin-desktop": "64px",
                "stack-sm": "8px",
                "container-max": "1280px",
                "gutter": "24px"
            },
            fontFamily: {
                "headline-sm": ["Playfair Display"],
                "display-lg-mobile": ["Playfair Display"],
                "body-md": ["Inter"],
                "body-lg": ["Inter"],
                "headline-md": ["Playfair Display"],
                "label-md": ["Inter"],
                "display-lg": ["Playfair Display"]
            },
            fontSize: {
                "headline-sm": ["24px", { lineHeight: "32px", fontWeight: "600" }],
                "display-lg-mobile": ["40px", { lineHeight: "48px", fontWeight: "700" }],
                "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
                "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
                "headline-md": ["32px", { lineHeight: "40px", fontWeight: "600" }],
                "label-md": ["14px", { lineHeight: "20px", letterSpacing: "0.05em", fontWeight: "600" }],
                "display-lg": ["56px", { lineHeight: "64px", letterSpacing: "-0.02em", fontWeight: "700" }]
            }
        }
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/container-queries')
    ]
}
