import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'var(--background)',
  			foreground: 'var(--foreground)',
			mydark1 :"#0E0E0E",
			mydark2 :"#1F1E1E",
			mylight1 :"#FFDD83",
			mylight2 :"#CC8C18",
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		brightness:{
			35: ".35",
		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
