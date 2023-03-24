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
        'btn': 'block px-3 py-4 text-xl border-2 border-amber-500 border-solid rounded-md cursor-pointer bg-gradient-to-b from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-500 hover:decoration-none text-dark-500',
        'btn-blue': 'block px-3 py-4 text-xl border-2 border-blue-500 border-solid rounded-md cursor-pointer bg-gradient-to-b from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 hover:decoration-none text-dark-500',
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
