import { G_DB } from '@/main'
import { getItem, setItem, type DBImmerseInterface } from '@/utils/immerse'
import { reactive, toRaw } from 'vue'
import { getMonthDays } from '../../../../../../utils/index'

export const ImmerseConfig = {
  autoSave: true,
  autoSaveInterval: 10,
  defaultImmerseName: '万物萌生'
}

export interface ImmerseInterface {
  immerseName: string
  duration: { hour: number; min: number; sec: number }
  startTime: number
  endTime: number
}

/**
 *
 *
 * @export
 * @description 保存旧的 immerse 生成新的 immerse 返回
 * @param {string} immerseName
 * @param {ImmerseInterface} old
 * @return {*}  {ImmerseInterface}
 */
export function startNewImmerse(immerseName: string, old: ImmerseInterface): ImmerseInterface {
  let _d = new Date(),
    currentTime = _d.getTime()

  // save old
  saveImmerse({
    immerseName: toRaw(old.immerseName) || ImmerseConfig.defaultImmerseName,
    duration: old.duration,
    startTime: old.startTime,
    endTime: currentTime
  })

  // create new
  return Object.assign(old, { immerseName, startTime: currentTime, endTime: 0, duration: { hour: 0, min: 0, sec: 0 } })
}

/**
 *
 *
 * @export
 * @description 保存今天此时的 immerse 到本地
 * @param {ImmerseInterface} immerse
 */
export async function saveImmerse(immerse: ImmerseInterface) {
  let _d = new Date(),
    year = _d.getFullYear(),
    month = _d.getMonth() + 1,
    day = _d.getDate(),
    currentTime = _d.getTime(),
    find = await findImmerse(immerse.immerseName, year, month, day)

  // 存
  find.dayDBResult.push(toRaw({ ...immerse, duration: { ...immerse.duration }, endTime: currentTime }))

  console.log('saveImmerse:', immerse, year, month, day, currentTime, find)

  await setItem(G_DB.SOURCE_DB, '', toRaw(find.yearDBResult))
}

/**
 *
 *
 * @export
 * @description 根据配置的间隔自动保存
 * @param {ImmerseInterface} immerse
 */
export function autoSaveImmerse(immerse: ImmerseInterface) {
  if (!ImmerseConfig.autoSave || !ImmerseConfig.autoSaveInterval) return
  if (immerse.duration.min % ImmerseConfig.autoSaveInterval === 0 && immerse.duration.sec === 1) saveImmerse(immerse)
}

/**
 *
 *
 * @export
 * @description 根据年月日名称找到指定的 immerse
 * @param {string} immerseName
 * @param {number} year
 * @param {number} month
 * @param {number} day
 * @return {*}  {Promise<{ yearDBResult: any; immerseIndex: number; dayDBResult: Array<ImmerseInterface> }>}
 */
export async function findImmerse(
  immerseName: string,
  year: number,
  month: number,
  day: number
): Promise<{ yearDBResult: any; immerseIndex: number; dayDBResult: Array<ImmerseInterface> }> {
  // find year
  let yearDBResult: any = await getItem(G_DB.SOURCE_DB, `${year}_immerse`),
    monthDBResult = null,
    dayDBResult: Array<ImmerseInterface>,
    immerseIndex: number

  // find month
  monthDBResult = yearDBResult[month]

  // find day
  dayDBResult = monthDBResult[day]

  // find immerseName
  immerseIndex = dayDBResult.findIndex((i) => i.immerseName === immerseName)

  console.log('findImmerse:', yearDBResult, monthDBResult, dayDBResult, immerseIndex)

  return { yearDBResult, dayDBResult, immerseIndex }
}

/**
 *
 *
 * @export
 * @description 初始化本地数据库
 */
export async function initImmerseDB() {
  let _d = new Date(),
    year = _d.getFullYear(),
    yearDBResult: any = await getItem(G_DB.SOURCE_DB, `${year}_immerse`)

  if (yearDBResult) return

  // 生成年
  yearDBResult = {}

  // 生成月
  for (let mIndex = 1; mIndex <= 12; mIndex++) {
    yearDBResult[mIndex] = {}
    // 生成天
    for (let dIndex = 1; dIndex <= getMonthDays(year, mIndex); dIndex++) {
      yearDBResult[mIndex][dIndex] = []
    }
  }

  await setItem(G_DB.SOURCE_DB, '', yearDBResult)

  console.log('initImmerseDB:', await getItem(G_DB.SOURCE_DB, `${year}_immerse`))
}
