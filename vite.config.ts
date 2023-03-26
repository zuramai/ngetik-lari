import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import presetIcons from '@unocss/preset-icons'
import presetWind from 'unocss/preset-wind'
import presetMini from 'unocss/preset-mini'
import UnoCSS from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS({
      shortcuts: {
        'btn': 'border-2 border-amber-500 border-solid rounded-md enabled:cursor-pointer bg-gradient-to-b from-amber-500 to-orange-500 enabled:hover:from-amber-400 enabled:hover:to-orange-500 enabled:hover:decoration-none text-dark-500 disabled:opacity-80 disabled:hover:none',
        'btn-sm': 'block px-3 py-2',
        'btn-lg': 'block px-3 py-2 border-amber-500 bg-gradient-to-b from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-500 hover:decoration-none text-dark-500',
        'btn-blue': 'block px-3 py-4 border-blue-500 bg-gradient-to-b from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 hover:decoration-none text-dark-500',
        'btn-disabled': '',
        'text-link': 'text-orange-500 underline',
        'alert': 'px-3 py-2 bg-red-500 bg-opacity-30 mb-2 rounded-md',
        'table': 'w-full'
      },
      presets: [
        presetMini(),
        presetWind(),
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
