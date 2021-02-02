import { handleDataIsUndefined } from '@/utils/validator/normal'

const CONSOLE_TAG = 'utils dom img.js'
/**
 *
 * @description 传入一个图片地址的数组，返回一个 promise 数组
 * @export
 */
export function handleImgLoaded(urlList) {
  const promiseList = []

  if (!handleDataIsUndefined(urlList)) return

  console.log(`${CONSOLE_TAG} handleImgLoaded:`, urlList)
  urlList.forEach((item) => {
    const i = new Promise((resolve, reject) => {
      const img = document.createElement('img')
      img.src = item
      img.onload = () => {
        return resolve(true)
      }
    })
    promiseList.push(i)
  })

  return promiseList
}
