module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    {
      pattern: /hover:(bg-indigo-500|bg-indigo-700|text-white)/,
    },
  ],
}
