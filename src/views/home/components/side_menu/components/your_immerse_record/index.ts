import { G_DB } from '@/main'
import { getLastDate, getMonthDays, numberToCN } from '../../../../../../utils/index'
import { getItem } from '@/utils/immerse'
import type { ImmerseInterface } from '../immerse/index'
import { ImmerseConfig } from '../immerse/index'

export const { yesterDay, lastWeek, lastMonth } = getLastDate()

let yearDBResult: any, year, month, day

export async function getYesterdayRecord(): Promise<{ [date: string]: Array<ImmerseInterface> }> {
  let yesterdayData = {},
    // 2023-1-19 / 2023-1-9 / 2022-12-1
    HandlerMode = {
      day: { enum: 1, loopVal: 1 },
      week: { enum: 2, loopVal: 7 },
      month: { enum: 3, loopVal: 0 } // 在 handler 中确定
    },
    // 去重,传入当天的数据,然后根据 startTime 和 endTime 去重
    dedupHandler = (data: Array<ImmerseInterface>, date: string) => {
      console.log('dedupHandler after:', data, date)

      let backData: Array<ImmerseInterface> = [],
        finded,
        findedIndex
      for (const item of data) {
        finded = backData.find((fItem) => fItem.startTime === item.startTime)
        findedIndex = backData.findIndex((fItem) => fItem.startTime === item.startTime)
        if (item.duration.min < ImmerseConfig.autoSaveInterval) continue
        if (!finded) backData.push(item)
        if (!finded?.endTime) continue
        if (finded.endTime >= item.endTime) continue
        // 找到自动备份的项 且 item.endTime > fItem.endTime ,就进行更新
        backData.splice(findedIndex, 1, item)
      }
      console.log('dedupHandler:', backData)
      return backData
    },
    getHandler = async(date: string, mode: typeof HandlerMode.day) => {
      let backData: any = {}
      year = +date.split('-')[0]
      month = +date.split('-')[1]
      day = +date.split('-')[2]
      yearDBResult = await getItem(G_DB.SOURCE_DB, `${year}_immerse`)

      // nodata
      if (!yearDBResult) return

      // 单独处理 month 的天数,周的量是固定的,月则不同
      if (mode.enum === HandlerMode.month.enum) mode.loopVal = getMonthDays(+year, +month)

      // day mode
      if (mode.enum === HandlerMode.day.enum) {
        backData[date] = dedupHandler(yearDBResult[month][day], date)
        return backData
      }

      // span mode
      // for (; day <= mode.loopVal; day++) {
      //   backData[date] = dedupHandler(yearDBResult[month][day], date)
      // }

      return backData
    }

  for (const item of [{ data: yesterdayData, date: yesterDay, handlerMode: HandlerMode.day }]) {
    // {`${year}-${month}-${day}`:[{}:immerse]}
    item.data = Object.assign(item.data, await getHandler(item.date, item.handlerMode))
    console.log('looping:', item)
  }

  console.log('getYesterdayRecord done:', yesterDay, yesterdayData)

  return yesterdayData
}

export function handleDataShow(immerse: ImmerseInterface) {
  let immerseTime = `${numberToCN(immerse.duration.hour)}时${numberToCN(immerse.duration.min)}分${numberToCN(immerse.duration.sec)}秒`,
    str = `专注于"${immerse.immerseName}",共专注了${immerseTime}`

  if (!immerse.immerseName || immerse.immerseName === ImmerseConfig.defaultImmerseName) {
    str = `并未写明专注于什么事,但你听了${immerseTime}的白噪音`
  }

  console.log('handleDataShow:', immerse)
  return str
}
