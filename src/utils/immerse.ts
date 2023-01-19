import type LocalForage from 'localforage'
import type { ImmerseInterface } from '../views/home/components/side_menu/components/immerse/index'

export interface DBImmerseInterface {
  year: { month: { day: Array<ImmerseInterface> } }
}

const _d = new Date(),
  KEY = `${_d.getFullYear()}_immerse`

export async function setItem<T>(instance: LocalForage, key: string = KEY, value: T) {
  return await instance.setItem(key || KEY || Date.now().toString(), value)
}

export async function getItem(instance: LocalForage, key: string = KEY) {
  return await instance.getItem(key || KEY || Date.now().toString())
}

export async function initSet<T>(instance: LocalForage, key: string = KEY, value: T) {
  return await instance.setItem(key || KEY || Date.now().toString(), value)
}
