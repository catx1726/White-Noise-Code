import * as path from 'path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), createSvgIconsPlugin({ iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')] })],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  base: './',
  resolve: { alias: { '@': path.resolve('./src') } },
  server: {
    port: 9817,
    open: true,
    cors: true,
    host: '192.168.31.19'
  }
})
