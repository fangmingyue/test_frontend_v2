export default {
  lazy: true, // 延迟加载语言文件
  langDir: 'i18n/', // 指向包含 JSON 的資料夾
  strategy: 'prefix_except_default', // 默认语言不加前缀，其他语言加前缀
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: 'i18n_redirected',
    alwaysRedirect: true,
    fallbackLocale: 'zh-TW',
  },
  vueI18n: {
    legacy: false, // Composition API
    fallbackLocale: 'zh-TW',
  },
}
