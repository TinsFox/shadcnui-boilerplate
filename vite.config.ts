import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      template: 'index.html',
      inject: {
        data: {
          title: 'index'
        }
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
