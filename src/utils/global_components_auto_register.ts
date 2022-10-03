import { defineAsyncComponent } from 'vue'

const componentsName = import.meta.globEager('../components/auto_regsiter_global_comp/*/index.vue')
const components = import.meta.glob('../components/auto_regsiter_global_comp/*/index.vue')

console.log('auto_regsiter_global_comp :', componentsName, components)

export default function install(app: any) {
  for (const [key, value] of Object.entries(components)) {
    // 注册组件名字   没有抛出Name， 引用文件组件文件夹名字
    const name = componentsName[key].default.name || key.slice(31, key.lastIndexOf('/'))
    app.component(name, defineAsyncComponent(value))
  }
}
