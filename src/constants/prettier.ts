import type { PartialPrettierExtendedOptions } from '../types';

export const DEFAULT_PRETTIER_RULES: PartialPrettierExtendedOptions = {
  printWidth: 80,
  tabWidth:2,
  semi:false,
  singleQuote: true,
  bracketSpacing:true,
  bracketSameLine:false,
  trailingComma: 'none',
  arrowParens: 'avoid',
  htmlWhitespaceSensitivity: 'ignore',
  jsdocCapitalizeDescription: false,
  singleAttributePerLine:true
};
