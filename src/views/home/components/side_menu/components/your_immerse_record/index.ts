import { getLastDate, numberToCN, getPastDateSpan } from '../../../../../../utils/index'
import { findImmerse, type ImmerseInterface } from '../immerse/index'
import { ImmerseConfig } from '../immerse/index'

export const { yesterDay, lastWeek, lastMonth } = getLastDate()

export async function getPastDateSpanImmerseRecord(span: number) {
  let dates = getPastDateSpan(span, 'YYYY-M-D'),
    year = null,
    find = null,
    backData: Array<ImmerseInterface> = [],
    dedupHandler = (data: Array<ImmerseInterface>, date: string) => {
      console.log('dedupHandler after:', data, date)

      if (!data) return

      let backData: Array<ImmerseInterface> = [],
        finded,
        findedIndex
      for (const item of data) {
        finded = backData.find((fItem) => fItem.startTime === item.startTime)
        findedIndex = backData.findIndex((fItem) => fItem.startTime === item.startTime)
        // if (item.duration.min < ImmerseConfig.autoSaveInterval) continue
        if (!finded) backData.push(item)
        if (!finded?.endTime) continue
        if (finded.endTime >= item.endTime) continue
        // 找到自动备份的项 且 item.endTime > fItem.endTime ,就进行更新
        backData.splice(findedIndex, 1, item)
      }
      console.log('dedupHandler:', backData)
      return backData
    }

  for await (const date of dates) {
    // 只有当跨年时才去重新获取db
    if (!year || year !== Number(date.split('-')[0])) {
      year = Number(date.split('-')[0])
      find = await findImmerse('', year, date)
    }
    backData = backData.concat(dedupHandler(find?.yearDBResult[date], date) || [])
  }

  console.log(
    'getPastDateSpanImmerseRecord:',
    backData.filter((i) => i)
  )

  return backData.filter((i) => i)
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
