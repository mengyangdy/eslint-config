import { createOptions } from "./options";
import { Awaitable, Options, FlatConfigItem } from "./types";
import { getOverridesRules } from "./shared";
import { createImportConfig, createGitignoreRule } from "./configs";

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

  const userResolved = await Promise.all(userConfigs);

  const configs: FlatConfigItem[] = [
    ...gitignore,
    ignore,
    ...imp,
    ...userResolved,
  ];

  return configs;
}

export * from "./types";
