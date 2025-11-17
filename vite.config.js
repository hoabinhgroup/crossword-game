import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/crossword-game/',
  plugins: [vue()],
  server: {
    port: 3000,
    open: true
  }
})

