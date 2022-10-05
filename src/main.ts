import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/style/index.scss'
import 'virtual:svg-icons-register'

import autoRegisterInstall from '@/utils/global_components_auto_register'
import normalRegisterInstall from '@/utils/global_components_register'
import localForage from 'localforage'

const app = createApp(App)

export const G_UI = {},
  G_FN = {},
  G_BOM = { DOC: document, WIN: window },
  G_DB = { SOURCE_DB: localForage.createInstance({ name: 'source' }) }

app.config.globalProperties['G_UI'] = G_UI
app.config.globalProperties['G_FN'] = G_FN
app.config.globalProperties['G_BOM'] = G_BOM

app.use(router).use(autoRegisterInstall).use(normalRegisterInstall).mount('#app')
