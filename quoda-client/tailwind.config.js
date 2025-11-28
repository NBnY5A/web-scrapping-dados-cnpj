/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Importante: garante que o Tailwind leia seus componentes
  ],
  theme: {
    extend: {
      // Adicionando a fonte padrão do Material Kit (opcional, mas fica mais bonito)
      fontFamily: {
        sans: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}