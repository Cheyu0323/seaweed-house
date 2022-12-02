/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#272F2F",
                secondary: "#C5B9B9",
                lightgary: "#F2F2F2",
                accent: "#0096C7"
                
            },
        },
    },
    plugins: [],
};
