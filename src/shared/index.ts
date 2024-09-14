import {readFile} from 'node:fs/promises'
import path from 'node:path'
import {PartialPrettierExtendedOptions, Awaitable} from "@/types";


export async function interopDefault<T>(m: Awaitable<T>): Promise<T extends { default: infer U } ? U : T> {
  const resolved = await m
  return (resolved as any).default || resolved
}

export async function loadPrettierConfig(cwd: string) {
  let prettierConfig: PartialPrettierExtendedOptions = {}

  try {
    const prettierrc = await readFile(path.join(cwd, '.prettierrc'), 'utf-8')

    prettierConfig = JSON.parse(prettierrc)
  } catch {
  }

  return prettierConfig
}

type OverrideRuleKey =
  | 'ts'
  | 'import'
  | 'n'
  | 'unicorn'
  | 'vue'
  | 'react'
  | 'react-native'
  | 'astro'
  | 'svelte'
  | 'solid'
  | 'unocss'

export function getOverridesRules(overrides: Record<string, string> = {}) {
  const overrideRecord = {
    js: {}
  } as Record<OverrideRuleKey | 'js', Record<string, string>>

  const rulePrefixes: Record<OverrideRuleKey, string> = {
    ts: '@typescript-eslint/',
    import: 'import/',
    n: 'n/',
    unicorn: 'unicorn/',
    vue: 'vue/',
    'react-native': 'react-native/',
    react: 'react/',
    astro: 'astro/',
    svelte: 'svelte/',
    solid: 'solid/',
    unocss: 'unocss/'
  }

  const overrideRuleKeys = Object.keys(rulePrefixes) as OverrideRuleKey[]

  overrideRuleKeys.forEach(key => {
    overrideRecord[key] = {}
  })

  const ruleKeys = Object.keys(overrides)

  ruleKeys.forEach(key => {
    const hasMatch = overrideRuleKeys.some(overrideKey => {
      const prefix = rulePrefixes[overrideKey]

      const matched = key.startsWith(prefix)

      if (matched) {
        overrideRecord[overrideKey][key] = overrides[key]
      }

      return matched
    })

    if (!hasMatch) {
      overrideRecord.js[key] = overrides[key]
    }
  })

  return overrideRecord
}