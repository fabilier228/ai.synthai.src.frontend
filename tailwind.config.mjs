import { lineHeight } from '@mui/system';

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        background: 'var(--background)',
        surface: 'var(--surface)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        error: 'var(--error)',
        muted: 'var(--muted)',
        outline: 'var(--outline)',
        text: 'var(--text)',
        primary_muted: 'var(--primary_muted)',
      },
    },
    // spacing: {
    //   xs: '8px', -> 2
    //   sm: '16px', -> 4
    //   md: '24px', -> 6
    //   lg: '32px', -> 8
    //   xl: '40px', -> 10
    //   '2xl': '56px', -> 14
    //   '3xl': '72px', -> 18
    //   '4xl': '80px', -> 20
    //   '5xl': '96px', -> 24
    // }
    fontFamily: {
      heading: ['var(--font-heading)', 'sans-serif'], 
        sans: ['var(--font-sans)', 'sans-serif'],      
        styled: ['var(--font-styled)', 'sans-serif'],
      
    }, fontSize: {
      h1: ['3rem', { lineHeight: '150%', fontWeight: '700' }],
      h2: ['2rem', { lineHeight: '150%', fontWeight: '700' }],
      h3: ['1.5rem', { lineHeight: '150%', fontWeight: '700' }],
      h4: ['1.25rem', { lineHeight: '150%', fontWeight: '700' }],
      h5: ['1.125rem', { lineHeight: '150%', fontWeight: '700' }],
      body_lg: ['1.125rem', { lineHeight: '1.75rem', fontWeight: '400' }],
      body_md: ['1.125rem', { lineHeight: '1.625rem', fontWeight: '400' }],
      body_nm: ['1rem', { lineHeight: '1.375rem', fontWeight: '400' }],
      body_sm: ['0.875rem', { lineHeight: '1.25rem', fontWeight: '400' }],
      btn_lg: ['2.25rem', { fontWeight: '600' }],
      btn_md: ['1.2rem', { fontWeight: '600' }],
      btn_sm: ['1.125rem', { fontWeight: '600' }],
      btn_b_lg: ['2.25rem', { fontWeight: '700' }],
      btn_b_md: ['1.5rem', { fontWeight: '700' }],
      btn_b_sm: ['1.125rem', { fontWeight: '700' }],
      styled_lg: ['3rem', { fontWeight: '700' }],
      styled_md: ['2rem', { fontWeight: '700' }],
      styled_sm: ['1.125rem', { fontWeight: '700' }],
    }
  },
  plugins: [],
};

export default config;