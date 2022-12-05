export enum SeasonEnum {
  Spring,
  Summer,
  Autumn,
  Winter
}

export interface SeasonType {
  month: Array<number>
  enum: SeasonEnum
  text: string
}

export const Season = {
  Spring: { month: [3, 4, 5], enum: SeasonEnum.Spring, text: '春' } as SeasonType,
  Summer: { month: [6, 7, 8], enum: SeasonEnum.Summer, text: '夏' } as SeasonType,
  Autumn: { month: [9, 10, 11], enum: SeasonEnum.Autumn, text: '秋' } as SeasonType,
  Winter: { month: [12, 1, 2], enum: SeasonEnum.Winter, text: '冬' } as SeasonType
}

export enum DayPartsEnum {
  Morning,
  Noonday,
  Afternoon,
  Evening
}

export interface DayPartsType {
  enum: DayPartsEnum
  hours: Array<number>
  text: string
}

export const DayParts = {
  Morning: { hours: [5, 6, 7, 8, 9, 10, 11], enum: DayPartsEnum.Morning, text: '早' } as DayPartsType,
  Noonday: { hours: [12, 13, 14], enum: DayPartsEnum.Noonday, text: '中' } as DayPartsType,
  Afternoon: { hours: [15, 16, 17, 18], enum: DayPartsEnum.Afternoon, text: '下' } as DayPartsType,
  Evening: { hours: [19, 20, 21, 22, 23, 0, 1, 2, 3, 4], enum: DayPartsEnum.Evening, text: '晚' } as DayPartsType
}

/**
 * @description 获取当前季节
 * @export
 */
export function getSeason() {
  let d = new Date(),
    curMonth = d.getMonth() + 1
  return Object.values(Season).find((i: SeasonType) => i.month.some((j) => j === curMonth))
}

/**
 * @description 获取当前时段
 * @export
 */
export function getDayPart() {
  let d = new Date(),
    curHour = d.getHours()
  return Object.values(DayParts).find((i: DayPartsType) => i.hours.some((j) => j === curHour))
}

/**
 * @description 拿到背景图
 * @export
 */
export function getBackground() {
  let season = getSeason(),
    dayPart = getDayPart(),
    backgrounds = BackGroundImgList.filter((i) => i.season.enum === season?.enum)

  return backgrounds.find((i) => i.dayPart.enum === dayPart?.enum)
}

export interface BackGroundType {
  link: string
  type: 'video' | 'image'
  dayPart: DayPartsType
  season: SeasonType
}

export const BackGroundImgList = [
  { link: 'https://img.dpm.org.cn/Uploads/Picture/2022/08/05/s62ec73dcb08b6.jpg', dayPart: DayParts.Morning, season: Season.Spring },
  { link: 'https://img.dpm.org.cn/Uploads/Picture/dc/cegift/cegift7888.jpg', dayPart: DayParts.Noonday, season: Season.Spring },
  { link: 'https://img.dpm.org.cn/Uploads/Picture/2018/06/29/s5b35a6fe42cbf.jpg', dayPart: DayParts.Afternoon, season: Season.Spring },
  { link: 'https://img.dpm.org.cn/Uploads/Picture/2022/09/28/s63340bf6c2783.jpg', dayPart: DayParts.Evening, season: Season.Spring },

  { link: 'https://img.dpm.org.cn/Uploads/Picture/2020/04/28/s5ea7d0436684e.jpg', dayPart: DayParts.Morning, season: Season.Summer },
  { link: 'https://img.dpm.org.cn/Uploads/Picture/2019/05/31/s5cf0cd7d9b71a.jpg', dayPart: DayParts.Noonday, season: Season.Summer },
  { link: 'https://img.dpm.org.cn/Uploads/Picture/2022/05/31/s62956bf18d007.jpg', dayPart: DayParts.Afternoon, season: Season.Summer },
  { link: 'https://img.dpm.org.cn/Uploads/Picture/2022/09/28/s63340bf6c2783.jpg', dayPart: DayParts.Evening, season: Season.Summer },

  { link: 'https://img.dpm.org.cn/Uploads/Picture/2019/11/27/s5dddd0d6ecb2d.jpg', dayPart: DayParts.Morning, season: Season.Autumn },
  { link: 'https://img.dpm.org.cn/Uploads/Picture/2020/11/30/s5fc495a1c77e3.jpg', dayPart: DayParts.Noonday, season: Season.Autumn },
  { link: 'https://img.dpm.org.cn/Uploads/Picture/2018/11/29/s5bff7ee98bea9.jpg', dayPart: DayParts.Afternoon, season: Season.Autumn },
  { link: 'https://img.dpm.org.cn/Uploads/Picture/2021/03/30/s606296e88b584.jpg', dayPart: DayParts.Evening, season: Season.Autumn },

  { link: 'https://img.dpm.org.cn/Uploads/Picture/2021/11/29/s61a43abbe4317.jpg', dayPart: DayParts.Morning, season: Season.Winter },
  { link: 'https://img.dpm.org.cn/Uploads/Picture/2022/02/28/s621c360af37ae.jpg', dayPart: DayParts.Noonday, season: Season.Winter },
  { link: 'https://img.dpm.org.cn/Uploads/Picture/2020/11/30/s5fc4a02911dbe.jpg', dayPart: DayParts.Afternoon, season: Season.Winter },
  { link: 'https://img.dpm.org.cn/Uploads/Picture/2021/03/30/s606296e88b584.jpg', dayPart: DayParts.Evening, season: Season.Winter }
] as Array<BackGroundType>
