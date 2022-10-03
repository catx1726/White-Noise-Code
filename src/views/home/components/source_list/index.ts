export enum AudioSourceEnum {
  Birds = 1,
  Cicada,
  Breeze,
  Water,
  Fire,
  Clock,
  Rain,
  People
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
  People: { enum: AudioSourceEnum.People, title: '人声', text: '知者动，仁者静。' } as AudioSourceType
}

export const AudioSourceList = [
  { type: AudioSourceTypeList.Birds, link: 'https://cdn.freesound.org/previews/387/387978_6221013-lq.mp3' },
  { type: AudioSourceTypeList.Water, link: 'https://cdn.freesound.org/previews/442/442492_5902878-lq.mp3' },
  { type: AudioSourceTypeList.Fire, link: 'https://cdn.freesound.org/previews/378/378641_7023777-lq.mp3' },
  { type: AudioSourceTypeList.Cicada, link: 'https://cdn.freesound.org/previews/400/400331_5121236-lq.mp3' },
  { type: AudioSourceTypeList.Breeze, link: 'https://cdn.freesound.org/previews/181/181801_3153523-lq.mp3' },
  { type: AudioSourceTypeList.Clock, link: 'https://cdn.freesound.org/previews/530/530583_7707368-lq.mp3' },
  { type: AudioSourceTypeList.Rain, link: 'https://cdn.freesound.org/previews/531/531947_7707368-lq.mp3' },
  { type: AudioSourceTypeList.People, link: 'https://cdn.freesound.org/previews/625/625112_12946258-lq.mp3' },
  { type: AudioSourceTypeList.People, link: 'https://cdn.freesound.org/previews/339/339983_5984982-lq.mp3' }
] as Array<AudioSourceListType>
