module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Noto Serif SC', 'serif', '黑体', '微软雅黑', '幼圆']
    },
    extend: {},
    colors: {
      white: {
        light: 'var(--base-white-op-5)',
        DEFAULT: 'var(--base-white)',
        dark: 'var(--base-white)'
      },
      accent: {
        light: 'var(--base-accent)',
        DEFAULT: 'var(--base-accent)',
        dark: 'var(--base-accent)'
      },
      gray: {
        light: 'var(--base-gray-op-5)',
        DEFAULT: 'var(--base-gray)',
        dark: 'var(--base-gray)'
      },
      black: {
        light: 'var(--base-black-op-5)',
        DEFAULT: 'var(--base-black)',
        dark: 'var(--base-black)'
      }
    }
  },
  corePlugins: {
    container: false
  },
  plugins: [],
  darkMode: 'media'
}
