import {
  createFormatterConfig,
  createGitignoreRule,
  createImportConfig,
  createJsConfig,
  createNodeConfig,
  createPrettierConfig,
  createTsConfig,
  createVueConfig
} from './configs'
import { createOptions } from './options'
import { getOverridesRules } from './shared'
import type { Awaitable, FlatConfigItem, Options } from './types'

export async function defineConfig(options: Partial<Options> = {}, ...userConfigs: Awaitable<FlatConfigItem>[]) {
  const opts = await createOptions(options)

  const ignore: FlatConfigItem = {
    ignores: opts.ignores
  }

  const overrideRecord = getOverridesRules(opts.overrides)

  const gitignore = await createGitignoreRule(opts.gitignore)
  const js = createJsConfig(overrideRecord.js)
  const node = await createNodeConfig(overrideRecord.n)
  const imp = await createImportConfig(overrideRecord.import)
  const ts = await createTsConfig(overrideRecord.ts)
  const vue = await createVueConfig(opts.vue, overrideRecord.vue)
  const prettier = await createPrettierConfig(opts.prettierRules)
  const formatter = await createFormatterConfig(opts.formatter, opts.prettierRules)

  const userResolved = await Promise.all(userConfigs)

  const configs: FlatConfigItem[] = [
    ...gitignore,
    ignore,
    ...js,
    ...node,
    ...imp,
    ...ts,
    ...vue,
    ...prettier,
    ...formatter,
    ...userResolved
  ]

  return configs
}

export * from './types'
