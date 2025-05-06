## eslint+prettier包

使用：

```bash
pnpm install eslint @dylanjs/eslint-config -D
```

项目根目录下创建`eslint.config.js`文件：

```js
import { defineConfig } from '@dylanjs/eslint-config'
export default defineConfig({
  vue: true,
  react: { files: ['**/*react.tsx'] },
  solid: { files: ['**/*solid.tsx'] },
  svelte: true,
  astro: true,
  unocss: true,
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
```

### 注意

如果在项目中执行`lint`命令使用报错`Error: Cannot find package 'prettier-plugin-jsdoc' imported from C:\Users\my466\Desktop\demo\noop.js`

需要在项目根目录中创建`.npmrc`文件，添加如下内容：

```bash
shamefully-hoist=true
```

这个命令的作用是将依赖项提升到项目的根目录中，这样就可以在项目中使用这些依赖项了。

然后就可以使用了。
