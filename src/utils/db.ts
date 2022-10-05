import type LocalForage from 'localforage'

const KEY = 'newest'

export async function setItem<T>(instance: LocalForage, key: string = KEY, value: T) {
  return await instance.setItem(key || KEY || Date.now().toString(), value)
}

export async function getItem(instance: LocalForage, key: string = KEY) {
  return await instance.getItem(key || KEY || Date.now().toString())
}

export async function initSet<T>(instance: LocalForage, key: string = KEY, value: T) {
  return await instance.setItem(key || KEY || Date.now().toString(), value)
}
