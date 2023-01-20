import { Info } from '../components/info_box/index'
import { G_FN } from '@/main'
export function numberToCN(num: number) {
  let arr1 = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'],
    arr2 = ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万', '十', '百', '千', '亿'] // 可继续追加更高位转换值
  if (!num || isNaN(num)) {
    return '零'
  }
  let english = num.toString().split(''),
    result = '',
    eng: number,
    arrIndex: number | string // 倒序排列设值
  for (let i = 0; i < english.length; i++) {
    eng = english.length - 1 - i // 倒序排列设值
    result = arr2[i] + result
    arrIndex = english[eng]
    result = arr1[+arrIndex] + result
  }
  // 将【零千、零百】换成【零】 【十零】换成【十】
  result = result.replace(/零(千|百|十)/g, '零').replace(/十零/g, '十')
  // 合并中间多个零为一个零
  result = result.replace(/零+/g, '零')
  // 将【零亿】换成【亿】【零万】换成【万】
  result = result.replace(/零亿/g, '亿').replace(/零万/g, '万')
  // 将【亿万】换成【亿】
  result = result.replace(/亿万/g, '亿')
  // 移除末尾的零
  result = result.replace(/零+$/, '')
  // 将【零一十】换成【零十】
  // result = result.replace(/零一十/g, '零十');//貌似正规读法是零一十
  // 将【一十】换成【十】
  result = result.replace(/^一十/g, '十')
  return result
}

export async function copyThat(val: string) {
  if (!navigator.clipboard) return Info({ message: '请在 https 协议下访问，以使用完整功能。', type: 'info', duration: 3000, show: true })

  let text = await navigator.clipboard.writeText(val)

  console.log('copyChat:', text)

  Info({ message: '已复制!', type: 'info', duration: 3000, show: true })
}

export function timeFliesFast(receiver: { hour: number; min: number; sec: number }) {
  receiver.sec++
  if (receiver.sec > 60) {
    receiver.sec = 1
    receiver.min++
  }
  if (receiver.min > 60) {
    receiver.min = 1
    receiver.hour++
  }
  console.log('timeFliesFast:', receiver.hour, receiver.min, receiver.sec)
  return receiver
}

export function getMonthDays(year: number, month: number) {
  let d = new Date(year, month, 0)
  return d.getDate()
}

/**
 *
 *
 * @export
 * @description 拿到 昨日 上周 上月 的日期
 * @return {*}
 */
export function getLastDate() {
  return {
    yesterDay: G_FN.DAYJS().subtract(1, 'days').format('YYYY-M-D'),
    lastWeek: G_FN.DAYJS().add(-1, 'week').startOf('week').add(1, 'day').format('YYYY-M-D'),
    lastMonth: G_FN.DAYJS().add(-1, 'month').startOf('month').format('YYYY-M-D')
  }
}

/**
 *
 *
 * @export
 * @description 拿到年,本月第几天,本年第几月
 * @return {*}
 */
export function getCurrentDayMonthYear() {
  let _d = new Date()
  return {
    year: _d.getFullYear(),
    month: _d.getMonth() + 1,
    day: _d.getDate()
  }
}
