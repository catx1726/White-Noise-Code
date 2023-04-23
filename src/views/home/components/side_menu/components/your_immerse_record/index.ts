import { G_FN } from '@/main'
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
        if (item.duration.min < ImmerseConfig.autoSaveInterval) continue
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

// OK 增加专注回顾类别: 专注事件与时间统计 / 专注事件比例 / 专注回忆
// OK 增加专注回顾项: 专注回忆 - 过去七天最长时间 / 过去七天最早一次 / 过去七天最晚一次
// TODO 增加专注回顾图表: 专注事件比例 - 用 饼图 表示过去七天专注的事项比例

export const RecordSelect = {
  pastSevenDaysMostLong: {
    title: '恒心',
    show: true,
    getData(list: Array<ImmerseInterface>) {
      let maxTime = { hour: 0, min: 0 },
        maxImmerse = null,
        loopItemTime = null

      for (const item of list) {
        loopItemTime = { hour: +item.duration.hour, min: +item.duration.min }

        console.log('most long loop:', list, item, loopItemTime, maxTime)

        if (loopItemTime.hour < maxTime.hour) continue

        if (loopItemTime.min < maxTime.min) continue

        maxImmerse = item
        maxTime = loopItemTime
      }

      if (!maxImmerse) {
        this.show = false
        return
      }

      return this.showData(maxImmerse)
    },
    showData(immerse: ImmerseInterface) {
      let str = this.str.join('')
      str = str.replace('${immerseName}', `"${immerse.immerseName === ImmerseConfig.defaultImmerseName ? '未写明' : immerse.immerseName}"`)
      str = str.replace('${durationStr}', `${numberToCN(immerse.duration.hour)}时${numberToCN(immerse.duration.min)}分`)
      return str
    },
    str: ['在过去七天中,你专注的最久的是', '${immerseName}', ',一共${durationStr}', ',相信你的恒心,终会给予你回报']
  },
  pastSevenDaysMostNight: {
    title: '静夜',
    condition: { hour: '19', min: '00' },
    show: true,
    getData(list: Array<ImmerseInterface>) {
      let nightImmerse = null,
        loopItemTime = null,
        mostNightTime = null

      for (const item of list) {
        loopItemTime = Number(G_FN.DAYJS(item.endTime).format('HH') + G_FN.DAYJS(item.endTime).format('mm'))
        if ((!nightImmerse || !mostNightTime || loopItemTime >= mostNightTime) && loopItemTime >= Number(this.condition.hour + this.condition.min)) {
          nightImmerse = item
          mostNightTime = loopItemTime
        }
      }

      if (!nightImmerse) {
        this.show = false
        return
      }

      return this.showData(nightImmerse)
    },
    showData(immerse: ImmerseInterface) {
      let str = this.str.join('')
      str = str.replace('${endTime}', `${G_FN.DAYJS(immerse.endTime).format('HH:mm')}`)
      str = str.replace('${immerseName}', `"${immerse.immerseName === ImmerseConfig.defaultImmerseName ? '未写明' : immerse.immerseName}"`)
      return str
    },
    str: ['在过去七天中,你在', '${endTime}', '仍然专注于', '${immerseName}', ',那一定是个宁静且愉悦的夜晚']
  },
  pastSevenDaysMostMorning: {
    title: '朝阳',
    show: true,
    condition: { hour: '9', min: '00' },
    getData(list: Array<ImmerseInterface>) {
      let morningImmerse = null,
        loopItemTime = null,
        mostMorningTime = null

      for (const item of list) {
        loopItemTime = Number(G_FN.DAYJS(item.startTime).format('HH') + G_FN.DAYJS(item.startTime).format('mm'))
        if ((!morningImmerse || !mostMorningTime || loopItemTime <= mostMorningTime) && loopItemTime <= Number(this.condition.hour + this.condition.min)) {
          morningImmerse = item
          mostMorningTime = loopItemTime
        }
      }

      if (!morningImmerse) {
        this.show = false
        return
      }

      return this.showData(morningImmerse)
    },
    showData(immerse: ImmerseInterface) {
      let str = this.str.join('')
      str = str.replace('${startTime}', `${G_FN.DAYJS(immerse.startTime).format('HH:mm')}`)
      str = str.replace('${immerseName}', `"${immerse.immerseName === ImmerseConfig.defaultImmerseName ? '未写明' : immerse.immerseName}"`)
      return str
    },
    str: ['在过去七天中,你在', '${startTime}', '就已经开始专注于', '${immerseName}']
  },
  pastSevenDays: {
    title: '往昔',
    show: true,
    getData(immerse: ImmerseInterface) {
      let immerseTime = `${numberToCN(immerse.duration.hour)}时${numberToCN(immerse.duration.min)}分`,
        str = `专注于"${immerse.immerseName}",共专注了${immerseTime}`

      if (!immerse.immerseName || immerse.immerseName === ImmerseConfig.defaultImmerseName) {
        str = `并未写明专注于什么事,但你听了${immerseTime}的白噪音`
      }

      console.log('handleDatashowData:', immerse)

      return str
    },
    handleImmerseSumTime(list: Array<ImmerseInterface>) {
      let hour = 0,
        min = 0
      for (const item of list) {
        hour += item.duration.hour
        min += item.duration.min
        if (min >= 60) {
          hour++
          min -= 60
        }
      }

      return this.str.join('').replace('${immerseSumTime}', `${numberToCN(hour)}时${numberToCN(min)}分`)
    },
    str: ['在过去的七天中,你一共专注了', '${immerseSumTime}', ',具体事件分别如下:']
  }
}
