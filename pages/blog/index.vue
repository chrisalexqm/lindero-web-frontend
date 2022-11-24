<script setup lang="ts">
import * as slugify from '@sindresorhus/slugify'
import MazBtn from 'maz-ui/components/MazBtn'
import { DirectusQueryParams } from 'nuxt-directus/dist/runtime/types'

const config = useRuntimeConfig()
const { getItems } = useDirectusItems()

const title = 'Blog'

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${title} | ${titleChunk}` : title
  },
  meta: [
    {
      property: 'og:title',
      content: title + ' | Lindero'
    },
    {
      property: 'og:image',
      content: config.DOMAIN_URL + '/og-image.png'
    }
  ]
})

const backofficeUrlItems = config.BACKOFFICE_URL + '/items'
const backofficeUrlAssets = config.BACKOFFICE_URL + '/assets/'

const articlePages = ref(0)
const articlePage = ref(1)

const limit = 6

let articlesFieldsParams: DirectusQueryParams = {
  fields: ['title,cover_image,category.name,content,date_created,id'],
  page: articlePage.value,
  limit,
  meta: '*'
}

const articles = ref([])
const articlesLoading = ref(false)

const fetchArticles = async () => {
  try {
    const response: any = await getItems({
      collection: 'articles',
      params: articlesFieldsParams
    })

    articles.value = response.data
    articlePages.value = Math.ceil(response.meta.total_count / limit)
  } catch (e) {}
}

const onArticlePageUpdate = async (page: any) => {
  if (page == articlePage.value) return

  articlesLoading.value = true

  articlesFieldsParams = {
    ...articlesFieldsParams,
    ...{ page }
  }

  fetchArticles()
  articlePage.value = page
  articlesLoading.value = false
}

const convertToSlug = (name: string, id: string) => {
  return slugify.default(name + ' ' + id)
}

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

onMounted(() => {
  fetchArticles()
})
</script>

<template>
  <div>
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
        class="bg-blog absolute z-20 object-cover w-full min-w-full min-h-full max-w-none"
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
        class="flex flex-col items-center w-full max-w-[1200px] py-20 px-5 mx-auto"
      >
        <h2
          class="text-5xl font-medium font-teko text-lindero-blue-darken font-medium font-teko underline decoration-lindero-orange decoration-2 underline-offset-8 mb-16"
        >
          Últimas publicaciones
        </h2>

        <div class="flex flex-col items-center w-full">
          <div
            v-if="articles.length == 0"
            class="flex flex-col items-center justify-center py-8 h-60"
          >
            <span class="material-icons text-5xl text-lindero-gray-light"
              >precision_manufacturing</span
            >
            <span class="text-lindero-gray-light"
              >No hay coincidencias con tu busqueda</span
            >
          </div>
          <div class="w-full" v-else>
            <div
              v-if="!articlesLoading"
              class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 w-full py-8"
            >
              <div
                v-for="article in articles"
                :key="article.id"
                class="flex flex-col bg-lindero-white rounded border-lindero-gray-4 border overflow-hidden"
              >
                <img
                  v-if="article.cover_image"
                  class="h-44 object-cover"
                  :src="
                    backofficeUrlAssets + article.cover_image + '?height=200'
                  "
                />
                <div
                  v-else
                  class="bg-lindero-gray-4 h-44 flex flex-col items-center justify-center opacity-40"
                >
                  <span class="material-icons text-3xl text-lindero-gray-light"
                    >photo_camera</span
                  >
                  <span class="text-sm text-lindero-gray-light"
                    >Artículo sin portada</span
                  >
                </div>
                <div class="flex flex-col px-3 pb-3 pt-1">
                  <div class="flex justify-between">
                    <span class="text-sm font-teko">{{
                      article.category.name
                    }}</span>
                    <span class="text-sm font-teko">{{
                      formatDate(article.date_created)
                    }}</span>
                  </div>
                  <h5 class="text-xl font-teko mb-2">
                    {{ article.title }}
                  </h5>
                  <LButton
                    :to="'/blog/' + convertToSlug(article.title, article.id)"
                    link
                    class="self-center"
                    type="ghost"
                    size="small"
                    >Leer artículo</LButton
                  >
                </div>
              </div>
            </div>
            <div
              v-else
              class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 w-full py-8"
            >
              <div
                v-for="article in 6"
                :key="article"
                class="flex flex-col bg-lindero-white rounded border-lindero-gray-4 border overflow-hidden"
              >
                <div class="animate-pulse flex flex-col">
                  <div class="h-44 w-full flex justify-center items-center">
                    <span class="material-icons text-5xl text-lindero-gray-4">
                      image
                    </span>
                  </div>
                  <div class="flex flex-col px-3 pb-3 pt-1">
                    <span
                      class="h-3 bg-lindero-gray-4 my-1 w-20 rounded"
                    ></span>
                    <span
                      class="h-6 bg-lindero-gray-4 my-1 w-full rounded mb-2"
                    ></span>
                    <span
                      class="h-8 bg-lindero-gray-4 my-1 w-20 rounded self-center"
                    ></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="articles.length > 0" class="btn-group">
            <MazBtn
              v-for="page in articlePages"
              @click="onArticlePageUpdate(page)"
              size="xs"
              :pastel="articlePage != page"
              :color="articlePage != page ? 'transparent' : 'primary'"
              class="mr-1 last:mr-0"
            >
              {{ page }}
            </MazBtn>
          </div>
        </div>
      </div>
    </div>

    <LFooter></LFooter>
  </div>
</template>
