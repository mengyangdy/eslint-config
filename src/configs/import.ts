import type { FlatConfigItem } from "../types"
import { interopDefault } from "../shared";

export async function createImportConfig(
  overrides: Record<string, string> = {}
) {
  const pluginImport = await interopDefault(import("eslint-plugin-import-x"));

  const configs: FlatConfigItem[] = [
    {
      plugins: {
        import: pluginImport,
      },
      rules: {
        "import/first": "error",
        "import/no-duplicates": "error",
        "import/no-mutable-exports": "error",
        "import/no-named-default": "error",
        "import/no-self-import": "error",
        "import/no-webpack-loader-syntax": "error",
        "import/order": [
          "error",
          {
            groups: [
              "builtin",
              "external",
              "internal",
              "parent",
              "sibling",
              "index",
              "object",
            ],
            "newlines-between": "always",
            pathGroups: [{ group: "internal", pattern: "{{@,~}/,#}**" }],
          },
        ],
        ...overrides,
      },
    },
  ];

  return configs;
}
