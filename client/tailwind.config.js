/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                nyanza: '#ffffff',
                vanilla: '#000000',
                'rosy-brown': '#3e2613',
                chestnut: '#ab614c',
                'golden-brown': '#eaff00',
                'max-blue-purp': '#3bb91f',
                'text-dark': '#3a2e2a',
                'bg-light': '#ece8e0',
            },
            fontFamily: {
                sans: ['"Josefin Sans"', 'sans-serif'],
                header: ['"Epunda Slab"', 'sans-serif'],
                display: ['"Playwrite GB J"', 'cursive'],
            },
        },
    },
    plugins: [],
}
