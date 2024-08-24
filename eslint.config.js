import { require } from 'tsx/cjs/api'

/** @type {{ defineConfig: import('./src/index.ts').defineConfig }} */
const { defineConfig } = require('./src/index.ts', import.meta.url)

export default defineConfig({
  vue: true,
  formatter: {
    html: true,
    css: true,
    json: true,
    markdown: true,
    yaml: true,
    toml: true
  },
  overrides: {
    'vue/multi-word-component-names': [
      'warn',
      {
        ignores: ['index', 'App', '[id]']
      }
    ]
  }
})
