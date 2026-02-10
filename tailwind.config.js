/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            gridTemplateColumns: {
                'auto': 'repeat(auto-fit, minmax(200px, 1fr))'
            },
            fontFamily: {
                Inter: ["Inter", "Outfit", "system-ui", "sans-serif"],
                Outfit: ["Outfit", "Inter", "system-ui", "sans-serif"],
                Ovo: ["Lora", "Noto Serif", "Georgia", "serif"],
                Montserrat: ["Montserrat", "Outfit", "Inter", "system-ui", "sans-serif"],
                BeVietnamPro: ["Be Vietnam Pro", "Inter", "system-ui", "sans-serif"]
            },
            animation: {
                spin_slow: 'spin 6s linear infinite'
            },
            colors: {
                lightHover: '#fcf4ff',
                darkHover: '#2a004a',
                darkTheme: '#11001F'
            },
            boxShadow: {
                'black': '4px 4px 0 #000',
                'white': '4px 4px 0 #fff',
            }
        },
    },
    darkMode: 'selector',
    plugins: [],
}