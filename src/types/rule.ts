import type { FlatGitignoreOptions } from "eslint-config-flat-gitignore";

import type {
  RequiredOptions,
  LiteralUnion,
  BuiltInParserName,
} from "prettier";

import type { JsdocOptions } from "prettier-plugin-jsdoc";

import {
  FlatESLintConfigItem,
  MergeIntersection,
  EslintRules,
  ImportRules,
  NRules,
  UnicornRules,
  TypeScriptRules,
  VueRules,
  ReactRules,
  ReactHooksRules,
  RuleConfig
} from "@antfu/eslint-define-config";

export type PrettierCustomParser = "astro" | "svelte" | "jsdoc-parser" | "toml";

export type PrettierParser = BuiltInParserName | PrettierCustomParser;

export interface PrettierOptions extends RequiredOptions {
  parser: LiteralUnion<PrettierParser>;
}

export type PartialPrettierExtendedOptions = Partial<PrettierOptions> &
  Partial<JsdocOptions>;

export type RuleBaseOptions<T = NonNullable<unknown>> = T & {
  files?: string[];
};

export type VueOptions = RuleBaseOptions<{
  version?: 2 | 3;
}>;

export type RequiredVueOptions = Required<VueOptions>;

export type RequiredRuleBaseOptions = Required<RuleBaseOptions>;

export type OnDemandRuleKey =
  | "vue"
  | "react"
  | "react-native"
  | "solid"
  | "svelte"
  | "astro";

export type OnDemandRuleOptions = Partial<
  Record<Exclude<OnDemandRuleKey, "vue">, RuleBaseOptions | boolean>
>;

export type RequiredOnDemandRuleOptions = Record<
  Exclude<OnDemandRuleKey, "vue">,
  RequiredRuleBaseOptions
>;

type WrapRuleConfig<T extends { [key: string]: any }> = {
  [K in keyof T]: T[K] extends RuleConfig ? T[K] : RuleConfig<T[K]>;
};

export type EslintFlatRules = WrapRuleConfig<
  MergeIntersection<
    EslintRules &
      ImportRules &
      NRules &
      UnicornRules &
      TypeScriptRules &
      VueRules &
      ReactRules &
      ReactHooksRules
  >
>;

export type FlatConfigItem = Omit<
  FlatESLintConfigItem<EslintFlatRules, false>,
  "plugins"
> & {
  plugins?: Record<string, any>;
};

export type { FlatGitignoreOptions };
