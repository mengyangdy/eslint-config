import type {
  FlatConfigItem,
  FlatGitignoreOptions,
  OnDemandRuleKey,
  OnDemandRuleOptions,
  PartialPrettierExtendedOptions,
  PrettierParser,
  RequiredOnDemandRuleOptions,
  RequiredRuleBaseOptions,
  RequiredVueOptions,
  VueOptions
} from './rule'

export type Awaitable<T> = T | Promise<T>

export interface BaseOptions {
  /**
   * 当前工作目录
   *
   * @default process.cwd()
   */
  cwd: string

  /** 项目忽略排查的文件目录 */
  ignores: string[]

  /**
   * git 忽略文件
   *
   * @default true
   * @see https://github.com/antfu/eslint-config-flat-gitignore
   */
  gitignore?: boolean | FlatGitignoreOptions

  /** 覆盖规则 */
  overrides: Record<string, string>

  /**
   * prettier的规则
   *
   * @default
   * ```json
   * {
   *   "printWidth": 120,
   *   "singleQuote": true,
   *   "trailingComma": "none",
   *   "arrowParens": "avoid",
   *   "htmlWhitespaceSensitivity": "ignore"
   * }
   */
  prettierRules: PartialPrettierExtendedOptions

  /**
   * 是否使用.prettierrc 自定义规则
   *
   * @default true
   */
  usePrettierrc: boolean

  /**
   * 是否默认格式化这些文件
   *
   * @default {
   *  "html": true,
   *  "css": true,
   *  "json": true,
   * }
   */
  formatter: {
    html?: boolean
    css?: boolean
    json?: boolean
    markdown?: boolean
    yaml?: boolean
    toml?: boolean
  }
}

export type Options = Partial<BaseOptions> & {
  vue?: VueOptions | boolean
} & OnDemandRuleOptions & {
    unocss?: boolean
  }

export type ParsedOptions = BaseOptions & {
  vue?: RequiredVueOptions
} & Partial<RequiredOnDemandRuleOptions> & {
    unocss?: boolean
  }

export type {
  FlatConfigItem,
  RequiredVueOptions,
  RequiredOnDemandRuleOptions,
  RequiredRuleBaseOptions,
  OnDemandRuleKey,
  PartialPrettierExtendedOptions,
  PrettierParser
}
