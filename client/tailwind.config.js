/** @type {import('tailwindcss').Config} */
export default {
    content: [],
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx,html}",
    ],
    theme: {
        extend: {
            colors: {
                baseLight: '#1D1A15',
                baseDark: '#171410',
                interactive: '#2D271D',
                text: '#D5D2C8'
            },
            dropShadow: {
                interactive: '0 0 10px rgba(0, 0, 0, 0.4)'
            },
            borderColor: {
                DEFAULT: 'rgba(255, 255, 255, 0.2)'
            }
        },
    },
    plugins: [],
}

