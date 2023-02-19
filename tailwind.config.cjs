const plugin = require('tailwindcss/plugin')
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                neutral: colors.slate,
                primary: colors.slate,
                secondary: colors.indigo,
            },
        }
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
    corePlugins: {
      preflight: false,
    },
    darkMode: "class",
}
