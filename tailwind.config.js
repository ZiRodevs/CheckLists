module.exports = {
  content: [
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    './src/**/*.tsx',
    './src/**/*.ts',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('flowbite/plugin')],
};
