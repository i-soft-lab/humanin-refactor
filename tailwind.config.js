/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ['App.tsx', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        plight: ['Pretendard-Light', 'sans-serif'],
        pnormal: ['Pretendard-Regular', 'sans-serif'],
        psemibold: ['Pretendard-SemiBold', 'sans-serif'],
        pbold: ['Pretendard-Bold', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
