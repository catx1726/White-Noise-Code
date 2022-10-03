import SvgIcon from '@/components/svg_icon/index.vue'

export const components = [SvgIcon],
  install = function (app: any) {
    components.forEach((i) => {
      console.log('global_components_register looping:', i)
      app.component(i.name, i)
    })
  }

/* 为所有组件提供 install 方便按需引用 */
;(function (comps) {
  comps.forEach((i) => {
    i.install = function (app: any) {
      app.component(i.name, i)
    }
  })
})(components)

export default install
