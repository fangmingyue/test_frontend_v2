// plugins/element-plus.ts
import { defineNuxtPlugin } from '#app'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(ElementPlus, {
    messageBox: {
      zIndex: 3000, // 全局 MessageBox 層級
    },
  } as any)
})
