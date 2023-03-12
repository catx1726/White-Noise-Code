import { G_DB } from '@/main'
import { getItem, setItem } from '@/utils/immerse'
import { toRaw } from 'vue'

export const ImmerseConfig = {
  autoSave: true,
  autoSaveInterval: 10,
  defaultImmerseName: '万物萌生',
  // 获取过去过久的记录,默认为 7 天
  recordPastSpan: 7,
  immerseVersion: '1.0.0'
}

export const ImmerseText = {
  explanation: `专注会每隔${ImmerseConfig.autoSaveInterval}分钟自动保存,在统计界面会过滤掉小于${ImmerseConfig.autoSaveInterval}分钟的专注`
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
    find = await findImmerse(immerse.immerseName, year, `${year}-${month}-${day}`)

  find.dayDBResult.push(toRaw({ ...immerse, duration: { ...immerse.duration }, endTime: currentTime }))

  console.log('saveImmerse:', immerse, year, currentTime, find)

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
  if (immerse.duration.min >= ImmerseConfig.autoSaveInterval && immerse.duration.min % ImmerseConfig.autoSaveInterval === 0 && immerse.duration.sec === 1) {
    saveImmerse(immerse)
  }
}

/**
 *
 *
 * @export
 * @description 根据年月日名称找到指定的 immerse
 * @param {string} immerseName
 * @param {number} year
 * @return {{Promise<{ yearDBResult: any; dayDBResult: Array<ImmerseInterface>; immerseIndex: number;}>}}
 */
export async function findImmerse(
  immerseName: string,
  year: number,
  date: string
): Promise<{ yearDBResult: any; dayDBResult: Array<ImmerseInterface>; immerseIndex: number }> {
  // find year
  let yearDBResult: any = await getItem(G_DB.SOURCE_DB, `${year}_immerse`),
    dayDBResult: Array<ImmerseInterface>,
    immerseIndex: number

  if (!yearDBResult) await initImmerseDB()

  if (!yearDBResult[date]) yearDBResult[date] = []

  // find day
  dayDBResult = yearDBResult[date]

  // find immerseName
  immerseIndex = dayDBResult.findIndex((i) => i.immerseName === immerseName)

  console.log('findImmerse:', yearDBResult, dayDBResult, immerseIndex)

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
    yearDBResult: any = await getItem(G_DB.SOURCE_DB, `${year}_immerse`),
    immerseDBVersion = await getItem(G_DB.SOURCE_DB, `immerse_version_${ImmerseConfig.immerseVersion}`)

  // yearDB 存在 并且 version 相同,则无需 init
  if (yearDBResult && ImmerseConfig.immerseVersion === immerseDBVersion) return

  yearDBResult = {}

  // 生成 version
  await setItem(G_DB.SOURCE_DB, `immerse_version_${ImmerseConfig.immerseVersion}`, ImmerseConfig.immerseVersion)

  // 生成 yearDB
  await setItem(G_DB.SOURCE_DB, '', yearDBResult)

  console.log('initImmerseDB:', await getItem(G_DB.SOURCE_DB, `${year}_immerse`))
}
