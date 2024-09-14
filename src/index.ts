import { createOptions } from '@/options'
import {
  createFormatterConfig,
  createGitignoreRule,
  createImportConfig,
  createJsConfig,
  createNodeConfig,
  createPrettierConfig,
  createTsConfig
} from '@/configs'
import { getOverridesRules } from '@/shared'
import type { Awaitable, FlatConfigItem, Options } from './types'

export async function defineConfig(options: Partial<Options> = {}, ...userConfigs: Awaitable<FlatConfigItem>[]) {
  const opts = await createOptions(options)

  const ignore: FlatConfigItem = {
    ignores: opts.ignores
  }

  const overrideRecord = getOverridesRules(opts.overrides)

  const js = createJsConfig(overrideRecord.js)
  const node = await createNodeConfig(overrideRecord.n)
  const imp = await createImportConfig(overrideRecord.import)
  const gitignore = await createGitignoreRule(opts.gitignore)
  const ts = await createTsConfig(overrideRecord.ts)
  const prettier = await createPrettierConfig(opts.prettierRules)
  const formatter = await createFormatterConfig(opts.formatter, opts.prettierRules)

  return [ignore, ...js, ...node, ...imp, ...gitignore, ...ts, ...prettier, ...formatter] as FlatConfigItem[]
}

export * from './types'
