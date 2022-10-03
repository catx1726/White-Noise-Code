import { AudioSourceEnum } from '../source_list'

export interface PoemType {
  content: string
  audioSourceType: AudioSourceEnum
}

export const Poem = [
  {
    content: `
仲春时景好，草木渐舒荣。公门且无事，微雨园林清。
决决水泉动，忻忻众鸟鸣。闲斋始延瞩，东作兴庶氓。
即事玩文墨，抱冲披道经。于焉日淡泊，徒使芳尊盈。
            `,
    audioSourceType: AudioSourceEnum.Birds
  },
  {
    content: `
绿蚁新醅酒，红泥小火炉。
晚来天欲雪，能饮一杯无？
`,
    audioSourceType: AudioSourceEnum.Fire
  },
  {
    content: `
蝉鸣空桑林，八月萧关道。
出塞入塞寒，处处黄芦草。
从来幽并客，皆共尘沙老。
莫学游侠儿，矜夸紫骝好。 
`,
    audioSourceType: AudioSourceEnum.Cicada
  },
  {
    content: `
空山新雨后，天气晚来秋。
明月松间照，清泉石上流。
竹喧归浣女，莲动下渔舟。
随意春芳歇，王孙自可留。 
            `,
    audioSourceType: AudioSourceEnum.Rain
  },
  {
    content: `
洞庭青草，近中秋，更无一点风色。
玉鉴琼田三万顷，着我扁舟一叶。
素月分辉，明河共影，表里俱澄澈。
悠然心会，妙处难与君说。
            `,
    audioSourceType: AudioSourceEnum.Water
  },
  {
    content: `
中岁颇好道，晚家南山陲。
兴来每独往，胜事空自知。
行到水穷处，坐看云起时。
偶然值林叟，谈笑无还期。 
            `,
    audioSourceType: AudioSourceEnum.Clock
  },
  {
    content: `
几回花下坐吹箫，银汉红墙入望遥。
似此星辰非昨夜，为谁风露立中宵。
缠绵思尽抽残茧，宛转心伤剥后蕉。
三五年时三五月，可怜杯酒不曾消。
            `,
    audioSourceType: AudioSourceEnum.Breeze
  },
  {
    content: `
知者乐水，仁者乐山。
知者动，仁者静。
知者乐，仁者寿。
            `,
    audioSourceType: AudioSourceEnum.People
  }
] as Array<PoemType>

/**
 * @description 随机获取诗
 * @export
 * @return {*}
 */
export function getPoem() {
  let len = Poem.length

  return Poem[Math.floor(Math.random() * (len - 0 + 1) + 0)]
}
