import type {Awaitable, FlatConfigItem, Options} from './types'
import {createOptions} from "@/options";
import {createJsConfig} from "@/configs";
import {getOverridesRules} from "@/shared";

export async function defineConfig(options: Partial<Options> = {},...userConfigs: Awaitable<FlatConfigItem>[]){
  const opts=await createOptions(options)

  const ignore: FlatConfigItem = {
    ignores: opts.ignores
  }

  const overrideRecord = getOverridesRules(opts.overrides)


  const js=createJsConfig(overrideRecord.js)

  return [
    ignore,
    ...js
  ] as FlatConfigItem[]
}

export * from './types'