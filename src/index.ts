import { createOptions } from "./options";
import { Awaitable, Options, FlatConfigItem } from "./types";
import { getOverridesRules } from "./shared";
import {
  createImportConfig,
  createGitignoreRule,
  createNodeConfig,
  createJsConfig,
  createUnicornConfig,
  createTsConfig,
  createVueConfig,
  createPrettierConfig,
  createFormatterConfig,
} from "./configs";

export async function defineConfig(
  options: Partial<Options> = {},
  ...userConfigs: Awaitable<FlatConfigItem>[]
) {
  const opts = await createOptions(options);
  const ignore: FlatConfigItem = {
    ignores: opts.ignores,
  };

  const overrideRecord = getOverridesRules(opts.overrides);

  const gitignore = await createGitignoreRule(opts.gitignore);
  const imp = await createImportConfig(overrideRecord.import);
  const node = await createNodeConfig(overrideRecord.n);
  const js = createJsConfig(overrideRecord.js);
  const unicorn = await createUnicornConfig(overrideRecord.unicorn);
  const ts = await createTsConfig(overrideRecord.ts);
  const vue = await createVueConfig(opts.vue, overrideRecord.vue);
  const prettier = await createPrettierConfig(opts.prettierRules);
  const formatter = await createFormatterConfig(
    opts.formatter,
    opts.prettierRules
  );

  const userResolved = await Promise.all(userConfigs);

  const configs: FlatConfigItem[] = [
    ...gitignore,
    ignore,
    ...imp,
    ...node,
    ...js,
    ...unicorn,
    ...ts,
    ...vue,
    ...userResolved,
    ...prettier,
    ...formatter
  ];

  return configs;
}

export * from "./types";
