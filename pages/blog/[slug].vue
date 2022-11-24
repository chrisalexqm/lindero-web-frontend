<script setup lang="ts">
import * as mrk from 'marked'

const route = useRoute()
const config = useRuntimeConfig()
const { getItemById } = useDirectusItems()

const backofficeUrlAssets = config.BACKOFFICE_URL + '/assets/'

const slug = route.params.slug as string
const articleId = slug.split('-')[slug.split('-').length - 1]

const article: any = ref({})
const articleLoading = ref(true)

const articleFieldParams = {
  fields: ['title,cover_image,category.name,content,date_created,id']
}

const fetchProduct = async () => {
  articleLoading.value = true
  try {
    article.value = await getItemById({
      collection: 'articles',
      id: articleId,
      params: articleFieldParams
    })
    articleLoading.value = false
  } catch (e) {
    articleLoading.value = false
  }
}

const parsedMDContent = (content: any) => {
  return mrk.marked.parse(content)
}

const getDescriptionFromContent = (content: any) => {
  const regex = /(<\/?(?:a|p)[^>]*>)|<[^>]+>/gi
  const body = content
  const result = body.replace(/<h1>.*?<\/h1>/is, '').replace(regex, '')

  return result.split('.')[0]
}

useHead({
  title: computed(() => {
    return article.value.title
      ? `${article.value.title} | Lindero | Maquinaria y materias primas para el sector metalmecánico`
      : 'Cargando artículo...'
  }),
  meta: [
    {
      property: 'og:title',
      content: article.value.title + ' | Lindero'
    },
    {
      property: 'og:description',
      content: computed(() => {
        return article.value.content
          ? getDescriptionFromContent(article.value.content)
          : ''
      })
    },
    {
      property: 'og:image',
      content: computed(() => {
        if (!article.value.images) return config.DOMAIN_URL + '/og-image.png'
        return article.value.cover_image
          ? backofficeUrlAssets + article.value.cover_image + '?height=200'
          : config.DOMAIN_URL + '/og-image.png'
      })
    },
    {
      property: 'og:url',
      content: config.DOMAIN_URL + '/blog/' + slug
    }
  ]
})

const capitalize = (str: any) => {
  const lower = str.toLowerCase()
  return str.charAt(0).toUpperCase() + lower.slice(1)
}

const formatDate = (date: any) => {
  const dateParsed = new Date(date)

  dateParsed.setHours(dateParsed.getHours() - 5)

  const month = dateParsed.getMonth()
  const monthNames = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Setiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ]
  const monthName = monthNames[month]

  return `${dateParsed.getDate()} de ${capitalize(
    monthName
  )}, ${dateParsed.getFullYear()}`
}

const getArticleUrl = () => {
  return config.DOMAIN_URL + '/blog/' + route.params.slug
}

const buildFBShareLink = () => {
  return (
    'https://www.linkedin.com/sharing/share-offsite/?url=' + getArticleUrl()
  )
}

const buildWAShareLink = () => {
  const baseWhatsAppUrl = 'https://api.whatsapp.com/send'
  const url = getArticleUrl()

  const text = article.value.title + '%0A%0A' + url

  return baseWhatsAppUrl + '?text=' + text
}

onMounted(() => {
  fetchProduct()
})
</script>

<template>
  <div>
    <!-- <Title>{{ product.name }}</Title> -->
    <header class="max-w-[1200px] mx-auto">
      <LMenu />
    </header>

    <div class="relative flex flex-col justify-center items-center h-60">
      <div class="z-30 w-full max-w-[1200px] px-5">
        <div>
          <h1
            class="text-5xl font-bold font-teko uppercase text-lindero-white underline decoration-lindero-blue-light decoration-2 underline-offset-8"
          >
            Blog
          </h1>
        </div>
      </div>
      <div
        v-if="article.cover_image"
        class="absolute z-20 object-cover w-full min-w-full min-h-full bg-top max-w-none"
        :style="{
          'background-image':
            'url(' + backofficeUrlAssets + article.cover_image + ')'
        }"
      ></div>
      <div
        v-else
        class="bg-products absolute z-20 object-cover w-full min-w-full min-h-full max-w-none"
      ></div>
      <div
        class="bg-hero-pattern absolute z-20 object-cover w-full min-w-full min-h-full max-w-none"
      ></div>
      <div
        class="bg-lindero-dark-blue-cover absolute z-20 object-cover w-full min-w-full min-h-full max-w-none opacity-10"
      ></div>
    </div>

    <div class="flex flex-col items-center">
      <div
        v-if="!articleLoading"
        class="flex flex-col items-center w-full max-w-[1200px] pt-16 pb-5 px-5 mx-auto"
      >
        <div class="w-full">
          <span
            class="text-sm uppercase font-bold bg-lindero-blue-light text-lindero-white py-1 px-2 rounded"
            >{{ article.category.name }}</span
          >
          <h1
            class="text-5xl font-bold font-teko uppercase text-lindero-gray-darken my-5"
          >
            {{ article.title }}
          </h1>
          <img
            v-if="article.cover_image"
            class="h-96 w-full object-cover rounded"
            :src="backofficeUrlAssets + article.cover_image"
          />
        </div>
        <!-- <div class="relative h-96 w-full rounded overflow-hidden">
          <img
            v-if="article.cover_image"
            class="absolute h-full w-full object-cover"
            :src="backofficeUrlAssets + article.cover_image"
          />
          <div
            class="w-full h-1/2 absolute bottom-0 bg-gradient-to-t from-lindero-gray-darken to-transparent"
          ></div>
          <h1
            class="absolute bottom-5 left-5 text-4xl font-bold font-teko uppercase text-lindero-white underline decoration-lindero-blue-light decoration-2 underline-offset-8"
          >
            {{ article.title }}
          </h1>
        </div> -->

        <div class="flex flex-col w-full mt-2">
          <div class="flex justify-between">
            <div class="flex items-center opacity-50">
              <span class="text-sm font-semibold mr-1">Publicado:</span>
              <span class="text-sm">{{
                formatDate(article.date_created)
              }}</span>
            </div>
            <div>
              <span class="text-sm font-semibold opacity-50 mr-1"
                >Compartir:</span
              >
              <a
                :href="buildFBShareLink()"
                target="_blank"
                class="py-0.5 px-1.5 text-xs font-semibold text-lindero-white bg-[#0077B5] rounded cursor-pointer mr-2"
                >LinkedIn</a
              >
              <a
                :href="buildWAShareLink()"
                target="_blank"
                class="py-0.5 px-1.5 text-xs font-semibold text-lindero-white bg-[#25D366] rounded cursor-pointer"
                >Whatsapp</a
              >
            </div>
          </div>
        </div>

        <div class="mrk-parsed mt-5" v-html="article.content"></div>
      </div>
    </div>

    <LFooter></LFooter>
  </div>
</template>
