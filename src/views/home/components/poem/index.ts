import { AudioSourceEnum } from '../source_list'

import { load } from 'jinrishici'
import { reactive } from 'vue'

export interface PoemType {
  content: string
  audioSourceType: AudioSourceEnum
}

export const Poem = [
  {
    content: `
仲春时景好，草木渐舒荣。公门且无事，微雨园林清。<br/>
决决水泉动，忻忻众鸟鸣。闲斋始延瞩，东作兴庶氓。<br/>
即事玩文墨，抱冲披道经。于焉日淡泊，徒使芳尊盈。<br/>
            `,
    audioSourceType: AudioSourceEnum.Birds
  },
  {
    content: `
绿蚁新醅酒，红泥小火炉。<br/>
晚来天欲雪，能饮一杯无？<br/>
`,
    audioSourceType: AudioSourceEnum.Fire
  },
  {
    content: `
蝉鸣空桑林，八月萧关道。<br/>
出塞入塞寒，处处黄芦草。<br/>
从来幽并客，皆共尘沙老。<br/>
莫学游侠儿，矜夸紫骝好。<br/> 
`,
    audioSourceType: AudioSourceEnum.Cicada
  },
  {
    content: `
空山新雨后，天气晚来秋。<br/>
明月松间照，清泉石上流。<br/>
竹喧归浣女，莲动下渔舟。<br/>
随意春芳歇，王孙自可留。<br/> 
            `,
    audioSourceType: AudioSourceEnum.Rain
  },
  {
    content: `
洞庭青草，近中秋，更无一点风色。<br/>
玉鉴琼田三万顷，着我扁舟一叶。<br/>
素月分辉，明河共影，表里俱澄澈。<br/>
悠然心会，妙处难与君说。<br/>
            `,
    audioSourceType: AudioSourceEnum.Water
  },
  {
    content: `
中岁颇好道，晚家南山陲。<br/>
兴来每独往，胜事空自知。<br/>
行到水穷处，坐看云起时。<br/>
偶然值林叟，谈笑无还期。<br/> 
            `,
    audioSourceType: AudioSourceEnum.Clock
  },
  {
    content: `
几回花下坐吹箫，银汉红墙入望遥。<br/>
似此星辰非昨夜，为谁风露立中宵。<br/>
缠绵思尽抽残茧，宛转心伤剥后蕉。<br/>
三五年时三五月，可怜杯酒不曾消。<br/>
            `,
    audioSourceType: AudioSourceEnum.Breeze
  },
  {
    content: `
知者乐水，仁者乐山。<br/>
知者动，仁者静。<br/>
知者乐，仁者寿。<br/>
            `,
    audioSourceType: AudioSourceEnum.Enviroment
  }
] as Array<PoemType>

/**
 * @description 随机获取诗
 * @export
 * @return {*}
 */
export function getPoem(reactiveData: { poem: PoemType }) {
  console.log('getPoem:', reactiveData)

  let len = Poem.length - 1,
    handleSuccess = (res: any) => {
      reactiveData.poem = {
        audioSourceType: AudioSourceEnum.Custom,
        content: res.data.origin.content.join('<br/>')
      }
      console.log('handleSuccess:', reactiveData)
      Promise.resolve(reactiveData)
    },
    handleError = (err: any) => {
      reactiveData.poem = reactive(Poem[Math.floor(Math.random() * (len - 0 + 1) + 0)])
      console.log('handleError:', err, reactiveData)
      Promise.resolve(reactiveData)
    }
  load(handleSuccess, handleError)
}
