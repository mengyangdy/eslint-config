import {defineConfig} from "tsup";

export default defineConfig({
  entry:['src/index.ts'],
  clean:true,
  dts:true,
  format:['cjs','esm'],
  external:[

  ],
  sourcemap:false,
  target:'node14',
  minify:true,
  shims:true
})