// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['nuxt-directus', '@nuxtjs/tailwindcss'],
  directus: {
    url: 'https://directus-production-257f.up.railway.app/'
  },
  runtimeConfig: {
    public: {
      BACKOFFICE_URL:
        process.env.NODE_ENV == 'development'
          ? 'http://0.0.0.0:8055'
          : 'https://directus-production-257f.up.railway.app',
      DOMAIN_URL:
        process.env.NODE_ENV == 'development'
          ? 'http://0.0.0.0:3000'
          : 'https://lindero.pe'
    }
  },
  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }]
    }
  },
  css: ['maz-ui/css/main.css', '@/assets/css/main.scss'],
  build: {
    transpile: ['maz-ui']
  }
})
