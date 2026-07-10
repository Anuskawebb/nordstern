import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: 'var(--color-canvas)',
        surface: 'var(--color-surface)',
        'surface-2': 'var(--color-surface-2)',
        line: 'var(--color-line)',
        ink: 'var(--color-ink)',
        muted: 'var(--color-muted)',
        faint: 'var(--color-faint)',
        brand: {
          50: 'var(--color-brand-50)',
          100: 'var(--color-brand-100)',
          DEFAULT: 'var(--color-brand)',
          strong: 'var(--color-brand-strong)',
          deep: 'var(--color-brand-deep)',
        },
        success: 'var(--color-success)',
        'success-bg': 'var(--color-success-bg)',
        warning: 'var(--color-warning)',
        'warning-bg': 'var(--color-warning-bg)',
        danger: 'var(--color-danger)',
        'danger-bg': 'var(--color-danger-bg)',
        info: 'var(--color-info)',
        'info-bg': 'var(--color-info-bg)',
      },
    },
  },
  plugins: [],
};

export default config;
