/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'neo-yellow': '#FFD600',
                'neo-pink': '#FF90E8',
                'neo-blue': '#23A6D5',
                'neo-green': '#C1F2A5',
                'neo-orange': '#FF7A5C',
                'neo-purple': '#A78BFA',
                'neo-black': '#000000',
                'neo-white': '#FFFFFF',
                'neo-gray': '#F0F0F0',
                'neo-cold': '#EDF2FB',
            },
            fontFamily: {
                'sans': ['Onest', 'system-ui', 'sans-serif'],
                'display': ['Geologica', 'system-ui', 'sans-serif'],
                'comfortaa': ['Comfortaa', 'cursive'],
            },
            boxShadow: {
                'neo': '5px 5px 0px 0px rgba(0,0,0,1)',
                'neo-hover': '8px 8px 0px 0px rgba(0,0,0,1)',
                'neo-sm': '3px 3px 0px 0px rgba(0,0,0,1)',
            },
            borderWidth: {
                'neo': '3px',
            },
            transform: {
                'neo-hover': 'translate(-2px, -2px)',
            }
        },
    },
    plugins: [],
}