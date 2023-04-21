import { defineConfig } from 'vite'
import WindiCSS from 'vite-plugin-windicss'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react(), WindiCSS()],
})
