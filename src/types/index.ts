import type {
  FlatGitignoreOptions,
  OnDemandRuleKey,
  OnDemandRuleOptions,
  PartialPrettierExtendedOptions,
  RequiredOnDemandRuleOptions,
  RequiredVueOptions,
  VueOptions,
  RequiredRuleBaseOptions,
  FlatConfigItem,
  PrettierParser
} from "./rule";

export type Awaitable<T> = T | Promise<T>;

export interface BaseOptions {
  cwd: string;
  ignores: string[];
  gitignore?: boolean | FlatGitignoreOptions;
  overrides: Record<string, string>;
  prettierRules: PartialPrettierExtendedOptions;
  usePrettierrc: boolean;
  formatter: {
    html?: boolean;
    css?: boolean;
    json?: boolean;
    markdown?: boolean;
    yaml?: boolean;
    toml?: boolean;
  };
}

export type Options = Partial<BaseOptions> & {
  vue?: VueOptions | boolean;
} & OnDemandRuleOptions & {
    unocss?: boolean;
  };

export type ParsedOptions = BaseOptions & {
  vue?: RequiredVueOptions;
} & Partial<RequiredOnDemandRuleOptions> & {
    unocss?: boolean;
  };

export type {
  OnDemandRuleKey,
  PartialPrettierExtendedOptions,
  RequiredVueOptions,
  RequiredRuleBaseOptions,
  FlatConfigItem,
  PrettierParser
};
