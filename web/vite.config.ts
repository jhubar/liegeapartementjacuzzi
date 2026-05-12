import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages project site: https://<user>.github.io/<repo>/
// Must match the repository name (see remote on GitHub).
const repo = 'liegeapartementjacuzzi'

export default defineConfig(({ command, mode }) => ({
  plugins: [react()],
  base:
    command === 'serve' && mode === 'development'
      ? '/'
      : `/${repo}/`,
}))
