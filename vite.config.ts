import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import presetIcons from '@unocss/preset-icons'
import presetUno from 'unocss/preset-uno'
import UnoCSS from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS({
      shortcuts: {
        'btn': 'block px-3 py-4 text-xl border-2 border-black border-solid rounded-md cursor-pointer',
      },
      presets: [
        presetUno(),
        presetIcons()
      ]
    })    
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
