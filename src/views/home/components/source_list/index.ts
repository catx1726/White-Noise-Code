import { Info } from '@/components/info_box'
import { G_DB } from '@/main'
import { getItem, setItem } from '@/utils/db'
import { reactive, toRaw } from 'vue'

export enum AudioSourceEnum {
  Birds = 1,
  Cicada,
  Breeze,
  Water,
  Fire,
  Clock,
  Rain,
  Enviroment,
  Custom
}

export interface AudioSourceListType {
  type: AudioSourceType
  link: string
  text: string
}

export interface AudioSourceType {
  enum: AudioSourceEnum
  title: string
  text: string
}

export const AudioSourceTypeList = {
  Birds: { enum: AudioSourceEnum.Birds, title: '鸟语', text: '决决水泉动，忻忻众鸟鸣。' } as AudioSourceType,
  Cicada: { enum: AudioSourceEnum.Cicada, title: '蝉鸣', text: '蝉鸣空桑林，八月萧关道。' } as AudioSourceType,
  Breeze: { enum: AudioSourceEnum.Breeze, title: '微风', text: '似此星辰非昨夜，为谁风露立中宵。' } as AudioSourceType,
  Water: { enum: AudioSourceEnum.Water, title: '流水', text: '素月分辉，明河共影，表里俱澄澈。' } as AudioSourceType,
  Fire: { enum: AudioSourceEnum.Fire, title: '柴火', text: '绿蚁新醅酒，红泥小火炉。' } as AudioSourceType,
  Clock: { enum: AudioSourceEnum.Clock, title: '钟声', text: '行到水穷处，坐看云起时。' } as AudioSourceType,
  Rain: { enum: AudioSourceEnum.Rain, title: '雨声', text: '空山新雨后，天气晚来秋。' } as AudioSourceType,
  Enviroment: { enum: AudioSourceEnum.Enviroment, title: '环境', text: '知者动，仁者静。' } as AudioSourceType,
  Custom: { enum: AudioSourceEnum.Custom, title: '自定', text: '随意春芳歇，王孙自可留。' } as AudioSourceType
}

const SetupAudioSourceList = [
  { type: AudioSourceTypeList.Birds, link: 'https://cdn.freesound.org/previews/387/387978_6221013-lq.mp3', text: '忻忻众鸟鸣' },
  { type: AudioSourceTypeList.Birds, link: 'https://cdn.freesound.org/previews/463/463903_7241289-lq.mp3', text: '忻忻众鸟鸣' },
  { type: AudioSourceTypeList.Birds, link: 'https://cdn.freesound.org/previews/521/521360_7241289-lq.mp3', text: '忻忻众鸟鸣' },
  { type: AudioSourceTypeList.Birds, link: 'https://cdn.freesound.org/previews/345/345851_387219-lq.mp3', text: '忻忻众鸟鸣' },

  { type: AudioSourceTypeList.Water, link: 'https://cdn.freesound.org/previews/67/67884_634166-lq.mp3', text: '明河共影' },
  { type: AudioSourceTypeList.Water, link: 'https://cdn.freesound.org/previews/278/278883_8335-lq.mp3', text: '明河共影' },
  { type: AudioSourceTypeList.Water, link: 'https://cdn.freesound.org/previews/71/71262_806506-lq.mp3', text: '明河共影' },
  { type: AudioSourceTypeList.Water, link: 'https://cdn.freesound.org/previews/412/412941_4105649-lq.mp3', text: '明河共影' },

  { type: AudioSourceTypeList.Fire, link: 'https://cdn.freesound.org/previews/378/378641_7023777-lq.mp3', text: '红泥小火炉' },
  { type: AudioSourceTypeList.Fire, link: 'https://cdn.freesound.org/previews/624/624425_13582756-lq.mp3', text: '红泥小火炉' },
  { type: AudioSourceTypeList.Fire, link: 'https://cdn.freesound.org/previews/563/563766_6253486-lq.mp3', text: '红泥小火炉' },
  { type: AudioSourceTypeList.Fire, link: 'https://cdn.freesound.org/previews/363/363092_6612464-lq.mp3', text: '红泥小火炉' },

  { type: AudioSourceTypeList.Cicada, link: 'https://cdn.freesound.org/previews/400/400331_5121236-lq.mp3', text: '蝉鸣空桑林' },
  { type: AudioSourceTypeList.Cicada, link: 'https://cdn.freesound.org/previews/46/46636_453534-lq.mp3', text: '蝉鸣空桑林' },
  { type: AudioSourceTypeList.Cicada, link: 'https://cdn.freesound.org/previews/129/129475_2355772-lq.mp3', text: '蝉鸣空桑林' },
  { type: AudioSourceTypeList.Cicada, link: 'https://cdn.freesound.org/previews/529/529572_1030167-lq.mp3', text: '蝉鸣空桑林' },

  { type: AudioSourceTypeList.Breeze, link: 'https://cdn.freesound.org/previews/181/181801_3153523-lq.mp3', text: '为谁风露立中宵' },
  { type: AudioSourceTypeList.Breeze, link: 'https://cdn.freesound.org/previews/181/181252_499617-lq.mp3', text: '为谁风露立中宵' },
  { type: AudioSourceTypeList.Breeze, link: 'https://cdn.freesound.org/previews/181/181250_499617-lq.mp3', text: '为谁风露立中宵' },
  { type: AudioSourceTypeList.Breeze, link: 'https://cdn.freesound.org/previews/350/350725_97763-lq.mp3', text: '为谁风露立中宵' },
  { type: AudioSourceTypeList.Breeze, link: 'https://cdn.freesound.org/previews/492/492807_9624089-lq.mp3', text: '为谁风露立中宵' },

  { type: AudioSourceTypeList.Clock, link: 'https://cdn.freesound.org/previews/530/530583_7707368-lq.mp3', text: '云起时' },
  { type: AudioSourceTypeList.Clock, link: 'https://cdn.freesound.org/previews/458/458627_2553004-lq.mp3', text: '云起时' },

  { type: AudioSourceTypeList.Rain, link: 'https://cdn.freesound.org/previews/531/531947_7707368-lq.mp3', text: '空山新雨后' },
  { type: AudioSourceTypeList.Rain, link: 'https://cdn.freesound.org/previews/344/344430_6182353-lq.mp3', text: '空山新雨后' },
  { type: AudioSourceTypeList.Rain, link: 'https://cdn.freesound.org/previews/607/607070_11586060-lq.mp3', text: '空山新雨后' },
  { type: AudioSourceTypeList.Rain, link: 'https://cdn.freesound.org/previews/534/534363_11867884-lq.mp3', text: '空山新雨后' },

  { type: AudioSourceTypeList.Enviroment, link: 'https://cdn.freesound.org/previews/155/155589_2802105-lq.mp3', text: '雪地' },
  { type: AudioSourceTypeList.Enviroment, link: 'https://cdn.freesound.org/previews/518/518585_10201334-lq.mp3', text: '森林' },
  { type: AudioSourceTypeList.Enviroment, link: 'https://cdn.freesound.org/previews/155/155589_2802105-lq.mp3', text: '落叶林' },
  { type: AudioSourceTypeList.Enviroment, link: 'https://cdn.freesound.org/previews/625/625112_12946258-lq.mp3', text: '咖啡馆' },
  { type: AudioSourceTypeList.Enviroment, link: 'https://cdn.freesound.org/previews/339/339983_5984982-lq.mp3', text: '自习室' }
] as Array<AudioSourceListType>

export let AudioSourceList = reactive([] as Array<AudioSourceListType>)

export const PlayList = reactive([] as Array<AudioSourceListType>)

/**
 * @description 根据type拿到音源列表
 * @export
 * @param {AudioSourceType} type
 * @return {*}
 */
export function getAudioSourceListByType(type: AudioSourceType) {
  return AudioSourceList.filter((i) => i.type.enum === type.enum)
}

export function addAudioSourceToPlayList(source: AudioSourceListType) {
  PlayList.push(source)
  console.log('addAudioSourceToPlayList :', PlayList)
}

export function removeAudioSourceToPlayList(index: number) {
  console.log('removeAudioSourceToPlayList :', index, PlayList)
  PlayList.splice(index, 1)
  console.log('removeAudioSourceToPlayList done:', PlayList)
}

export function addSource(source: AudioSourceListType) {
  AudioSourceList.push(source)
  setItem(G_DB.SOURCE_DB, '', toRaw(AudioSourceList))
  console.log('addSource', source, AudioSourceList)
}

export function removeSource(index: number) {
  console.log('removeSource :', index)
  if (index === -1) return
  AudioSourceList.splice(index, 1)
  setItem(G_DB.SOURCE_DB, '', toRaw(AudioSourceList))
  console.log('removeSource done:', AudioSourceList)
}

export function resetAudioSource() {
  setItem(G_DB.SOURCE_DB, '', SetupAudioSourceList)
  AudioSourceList = reactive(SetupAudioSourceList)
  Info({ message: '已恢复', duration: 3000, type: 'info', show: true })
}

export async function getSource() {
  let db = (await getItem(G_DB.SOURCE_DB)) as Array<AudioSourceListType>,
    setUp = [...SetupAudioSourceList]
  AudioSourceList = db
  if (!db || !db.length) {
    setItem(G_DB.SOURCE_DB, '', setUp)
    AudioSourceList = setUp
    return setUp
  }

  return db
}
