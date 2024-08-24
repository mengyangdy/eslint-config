import type { FlatConfigItem } from 'eslint-config-flat-gitignore'
import type { BaseOptions } from '../types'
import { interopDefault } from '../shared'

export async function createGitignoreRule(options?: BaseOptions['gitignore']) {
  if (!options) {
    return []
  }
  const configs: FlatConfigItem[] = []
  const configItem = await interopDefault(import('eslint-config-flat-gitignore')).then(r => [
    r(typeof options !== 'boolean' ? options : { strict: false })
  ])

  configs.push(...configItem)
  return configs
}
