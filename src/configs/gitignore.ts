import { interopDefault } from "../shared";
import { BaseOptions, FlatConfigItem } from "../types";


export async function createGitignoreRule(options?:BaseOptions['gitignore']){
  if(!options){
    return []
  }
  const configs:FlatConfigItem[]=[]

  const configItem=await interopDefault(import('eslint-config-flat-gitignore')).then(res=>[
    res(typeof options !== 'boolean'?options:{strict:false})
  ])

  configs.push(...configItem)

  return configs
}
