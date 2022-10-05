export enum InfoTypeEnum {
  success,
  error,
  warning,
  info
}

export interface InfoInterface {
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  duration: number
  show: boolean
  style?: string
}

import InfoComp from './index.vue'
import { createVNode, isVNode, render, type VNode, type VNodeNormalizedChildren } from 'vue'
let vNodes: Array<VNode> = [],
  vNodeWrapper: VNode | null,
  container = document.createElement('div'),
  body = document.querySelector('body')

container.classList.add('flex', 'flex-col', 'fixed', 'w-full', 'top-0')

export function Info(info: InfoInterface) {
  let timer = -1,
    children

  console.log('Info:', info, vNodes, vNodeWrapper)

  const cleanContainer = () => {
    vNodeWrapper = null
    render(null, container)
    container.remove()
    clearTimeout(timer)
  }

  if (vNodeWrapper) cleanContainer()

  vNodes.push(createVNode(InfoComp, { info, id: Date.now() }))

  vNodeWrapper = createVNode('div', { class: ['flex', 'flex-col', 'fixed', 'w-full', 'top-0'] }, vNodes)

  render(vNodeWrapper, container)

  body?.appendChild(container)

  timer = setTimeout(() => {
    console.log('setTimeout:', info)

    children = vNodes.splice(0, 1)[0]
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    children.component?.exposed?.close(() => {
      if (!vNodes.length) return container.remove()
    })
    clearTimeout(timer)
  }, info.duration)
}
