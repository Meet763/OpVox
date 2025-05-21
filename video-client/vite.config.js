import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    cors: true,
    https: {
      key: fs.readFileSync(path.resolve('/Users/vedantpatel/Documents/myserver.key')), // Absolute path
      cert: fs.readFileSync(path.resolve('/Users/vedantpatel/Documents/myserver.crt')), // Absolute path
    },
    port: 5173,
  },

})
