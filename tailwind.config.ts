import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "custom-gray": "#A6A6A6", // 배경색
        "regal-blue": "#243c5a",
        "theme-color-blue": "#2A9FC2",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      flexBasis: {
        outerRight: "570px",
      },
      height: {
        content: "440px",
        "post-it": "35px",
        "login-button": "45px",
      },
      width: {
        dotRight: "555px",
        "content-left": "212px",
        "content-right": "540px",
        "post-it": "70px",
        "login-button": "400px",
      },
      borderRadius: {
        "post-it": "0px 10px 10px 0px",
        "login-button": "5px",
        "login-input-top": "8px 8px 0px 0px",
        "login-input-bottom": "0px 0px 8px 8px",
      },
      borderWidth: {
        "3": "3px",
      },
      margin: {
        "content-left": "0 3px 8px 4px",
        "content-right": "0 0 8px 4px",
        "post-it": "29px 7px 0 -1px",
      },
      padding: {
        outerLeft: "16px 0 0px 0",
        "content-left": "20px 5px 5px 5px",
        "content-right": "20px",
        "dot-left": "4px 0 4px 4px",
        "dot-right": "4px 4px 4px 0",
      },
      backgroundImage: {
        "custom-bg": "url('/background.png')", // 배경 이미지 경로
      },
      fontFamily: {
        dungGeunMo: ["DungGeunMo", "sans-serif"], // 커스텀 폰트
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
export default config;
