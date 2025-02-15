// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    typeCheck: true
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', "shadcn-nuxt", ['@nuxtjs/google-fonts', {
  families: {
    Roboto: {
      wght: [400, 700]
    }
  }
}], "@nuxt/icon", "@pinia/nuxt", '@vee-validate/nuxt', "@nuxt/image"],
  colorMode: {
    preference: 'light'
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: 'Ui',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  pinia: {
    storesDirs: ['./store/**'],
  }
})