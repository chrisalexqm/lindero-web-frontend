<script setup lang="ts">
import * as slugify from '@sindresorhus/slugify'

import { onMounted } from 'vue'

const { getItems, getSingletonItem } = useDirectusItems()
const runtimeConfig = useRuntimeConfig()

const backofficeUrlItems = runtimeConfig.BACKOFFICE_URL + '/items'
const backofficeUrlAssets = runtimeConfig.BACKOFFICE_URL + '/assets/'

const articles = ref<any[]>([])
const projectVariables = ref<any>({})
const videoSrc = ref('')
const videoEl = ref<any>(null)

const articlesFieldsParams = {
  fields: ['title,cover_image,category.name,content,date_created,id'],
  page: 1,
  limit: 3
}

const fetchArticles = async () => {
  try {
    articles.value = await getItems({
      collection: 'articles',
      params: articlesFieldsParams
    })
  } catch (e) {}
}

const fetchProjectVariables = async () => {
  try {
    projectVariables.value = await getSingletonItem({
      collection: 'project_variables'
    })
  } catch (e) {}
}

const convertToSlug = (name: any, id: any) => {
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

useHead({
  meta: [
    {
      property: 'og:title',
      content:
        'Lindero | Maquinaria y materias primas para el sector metalmecánico'
    },
    {
      property: 'og:description',
      content:
        'Más de 20 años de experiencia brindando servicios y soluciones al sector metalmecánico'
    },
    {
      property: 'og:image',
      content: runtimeConfig.DOMAIN_URL + '/og-image.png'
    }
  ]
})

onMounted(() => {
  fetchProjectVariables()
  // fetchArticles()
  let isMobile = false

  if (process.client) {
    isMobile = window.matchMedia('only screen and (max-width: 480px)').matches
  }

  videoSrc.value = isMobile ? '/480264.mp4' : '/1080264.mp4'
  videoEl.value.load()
  videoEl.value.play()
})
</script>

<template>
  <div>
    <header
      class="relative flex flex-col items-center h-screen overflow-hidden"
    >
      <LMenu light />
      <div
        class="relative flex flex-col justify-center z-40 h-full max-w-[1200px] px-5"
      >
        <h2
          class="text-lindero-white text-xl md:text-2xl uppercase font-bold font-teko underline decoration-lindero-blue-light decoration-2 underline-offset-8 mb-3"
        >
          Tus aliados de confianza
        </h2>
        <h1
          class="text-lindero-white text-4xl md:text-5xl font-semibold w-full md:w-3/4 mb-5"
        >
          Más de 20 años de experiencia brindando servicios y soluciones al
          sector metalmecánico
        </h1>
        <div class="flex flex-col items-start sm:flex-row">
          <LButton link :to="'/contactanos'" class="sm:mr-5">
            <span class="material-icons">request_quote</span>
            <span class="ml-2">Solicitar cotización</span>
          </LButton>
          <LButton
            link
            :to="'/productos'"
            type="secondary"
            class="mt-5 sm:mt-0"
          >
            <span class="material-icons">precision_manufacturing</span>
            <span class="ml-2">Ver productos</span>
          </LButton>
        </div>
      </div>
      <div
        class="bg-lindero-dark-blue-cover absolute z-20 object-cover w-full min-w-full min-h-full max-w-none opacity-10"
      ></div>
      <div
        class="bg-hero-pattern absolute z-20 object-cover w-full min-w-full min-h-full max-w-none"
      ></div>
      <div
        class="bg-video-poster bg-cover absolute z-10 object-cover w-full min-w-full min-h-full max-w-none"
      ></div>
      <video
        ref="videoEl"
        loop
        muted
        playsinline
        poster="~/assets/images/video-poster.jpg"
        class="absolute select-none z-10 object-cover w-full min-w-full min-h-full max-w-none"
      >
        <source :src="videoSrc" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </header>

    <div class="flex flex-col items-center">
      <div
        class="flex flex-col md:flex-row justify-between md:flex-row max-w-[1200px] py-20 px-5 mx-auto"
      >
        <div class="md:w-1/3 mb-10 md:mr-6 md:mb-0">
          <h2
            class="text-lindero-orange text-center md:text-left text-base uppercase font-bold font-teko underline decoration-lindero-orange decoration-2 underline-offset-8 mb-5"
          >
            Nuestros aliados
          </h2>
          <p
            class="text-5xl text-center md:text-left font-medium font-teko text-lindero-blue-darken m-0"
          >
            Contamos con las marcas más competitivas del mercado
          </p>
        </div>
        <div>
          <div
            class="self-center grid grid-cols-2 lg:grid-cols-3 gap-x-10 md:gap-x-16 gap-y-16 md:gap-y-10 lg:gap-y-16"
          >
            <div class="flex justify-center">
              <img
                class="saturate-0 hover:saturate-100 opacity-70 hover:opacity-100 brightness-125 h-10"
                src="~/assets/images/logos/peddinghaus.png"
                alt="Logo Peddinghaus"
              />
            </div>
            <div class="flex justify-center">
              <img
                class="saturate-0 hover:saturate-100 opacity-70 hover:opacity-100 brightness-125 h-10"
                src="~/assets/images/logos/hypertherm.png"
                alt="Logo Hypertherm"
              />
            </div>
            <div class="flex justify-center">
              <img
                class="saturate-0 hover:saturate-100 opacity-70 hover:opacity-100 brightness-125 h-10"
                src="~/assets/images/logos/nitto_kohki.png"
                alt="Logo Nitto Kohki"
              />
            </div>
            <div class="flex justify-center">
              <img
                class="saturate-0 hover:saturate-100 opacity-70 hover:opacity-100 brightness-125 h-10"
                src="~/assets/images/logos/cevisa.png"
                alt="Logo Cevisa"
              />
            </div>
            <div class="flex justify-center">
              <img
                class="saturate-0 hover:saturate-100 opacity-70 hover:opacity-100 brightness-125 h-10"
                src="~/assets/images/logos/asia_machine_group.png"
                alt="Logo AMG"
              />
            </div>
            <div class="flex justify-center">
              <img
                class="saturate-0 hover:saturate-100 opacity-70 hover:opacity-100 brightness-125 h-10"
                src="~/assets/images/logos/kjellberg_finsterwalde.png"
                alt="Logo Kjellberg Finsterwalde"
              />
            </div>
          </div>
          <div
            v-if="projectVariables.brochure"
            class="flex justify-center mt-10"
          >
            <LButton
              link
              :to="backofficeUrlAssets + projectVariables.brochure"
              target="_blank"
              size="small"
            >
              <span class="material-icons">download</span>
              <span class="ml-2">Descargar catálogo</span>
            </LButton>
          </div>
        </div>
      </div>
    </div>

    <div class="relative bg-after-sales flex flex-col items-center">
      <div
        class="bg-lindero-blue-darken absolute z-20 object-cover w-full min-w-full min-h-full max-w-none opacity-90"
      ></div>
      <div class="z-30 flex flex-col items-center max-w-[1200px] px-5 py-20">
        <h2
          class="text-lindero-white text-base uppercase font-bold font-teko underline decoration-lindero-blue-light decoration-2 underline-offset-8 mb-5"
        >
          El mejor servicio post venta
        </h2>
        <span class="text-lindero-white text-3xl text-center font-semibold">
          Tenemos el respaldo de un equipo de técnicos quienes se encuentran
          constantemente actualizados y capacitados
        </span>
      </div>
    </div>

    <div class="flex flex-col items-center bg-lindero-body-2">
      <div
        class="flex flex-col flex-col-reverse md:flex-row items-center max-w-[1200px] py-20 px-5 mx-auto"
      >
        <div class="grid grid-rows-3 md:grid-rows-2 grid-flow-col gap-5 w-full">
          <NuxtLink
            to="/productos"
            class="relative flex flex-col col-span-2 md:row-span-2 bg-metalworking-industry h-40 md:h-96 rounded cursor-pointer overflow-hidden"
          >
            <div
              class="z-30 flex justify-center items-center w-full h-full px-3 pt-3"
            >
              <span
                class="text-lindero-white text-4xl text-center font-medium font-teko"
                >Industria metalmécanica</span
              >
            </div>
            <div class="z-30 w-full flex justify-end items-center px-3 pb-3">
              <span class="text-lindero-white text-sm uppercase font-semibold"
                >Ver productos</span
              >
              <span class="material-icons text-lindero-white ml-1">east</span>
            </div>
            <div
              class="bg-lindero-dark-blue-cover absolute z-20 object-cover w-full min-w-full min-h-full max-w-none opacity-70"
            ></div>
          </NuxtLink>
          <NuxtLink
            to="/productos"
            class="relative flex flex-col col-span-2 bg-ceramic-industry h-auto rounded cursor-pointer overflow-hidden"
          >
            <div
              class="z-30 flex justify-center items-center w-full h-full px-3 pt-3"
            >
              <span
                class="text-lindero-white text-4xl text-center font-medium font-teko"
                >Industria cerámica</span
              >
            </div>
            <div class="z-30 w-full flex justify-end items-center px-3 pb-3">
              <span class="text-lindero-white text-sm uppercase font-semibold"
                >Ver productos</span
              >
              <span class="material-icons text-lindero-white ml-1">east</span>
            </div>
            <div
              class="bg-lindero-dark-blue-cover absolute z-20 object-cover w-full min-w-full min-h-full max-w-none opacity-70"
            ></div>
          </NuxtLink>
          <NuxtLink
            to="/productos"
            class="relative flex flex-col col-span-2 bg-plastic-industry h-auto rounded cursor-pointer overflow-hidden"
          >
            <div
              class="z-30 flex justify-center items-center w-full h-full px-3 pt-3"
            >
              <span
                class="text-lindero-white text-4xl text-center font-medium font-teko"
                >Industria plástica</span
              >
            </div>
            <div class="z-30 w-full flex justify-end items-center px-3 pb-3">
              <span class="text-lindero-white text-sm uppercase font-semibold"
                >Ver productos</span
              >
              <span class="material-icons text-lindero-white ml-1">east</span>
            </div>
            <div
              class="bg-lindero-dark-blue-cover absolute z-20 object-cover w-full min-w-full min-h-full max-w-none opacity-70"
            ></div>
          </NuxtLink>
        </div>
        <div class="flex flex-col w-full md:w-2/5 mb-10 md:mb-0 md:ml-6">
          <h2
            class="text-lindero-orange text-base uppercase font-bold font-teko text-center md:text-right underline decoration-lindero-orange decoration-2 underline-offset-8 mb-5"
          >
            Líneas de negocio
          </h2>
          <p
            class="text-5xl font-medium font-teko text-center md:text-right text-lindero-blue-darken m-0"
          >
            Estamos presentes en diversos rubros
          </p>
        </div>
      </div>
    </div>

    <!-- <div class="flex flex-col items-center">
      <div class="z-30 flex flex-col items-center max-w-[1200px] px-5 py-12">
        <h2
          class="text-lindero-orange text-base uppercase font-bold font-teko underline decoration-lindero-orange decoration-2 underline-offset-8 mb-5"
        >
          Últimos articulos publicados
        </h2>
        <p
          class="text-5xl font-medium text-center font-teko text-lindero-blue-darken mb-7"
        >
          Mantente informado a traves de nuestro blog
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-9">
          <div
            v-for="article in articles"
            :key="article.id"
            class="flex flex-col bg-lindero-white rounded border-lindero-gray-4 border overflow-hidden"
          >
            <img
              v-if="article.cover_image"
              class="h-44 object-cover"
              :src="backofficeUrlAssets + article.cover_image + '?height=200'"
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
      </div>
    </div> -->

    <LFooter></LFooter>
  </div>
</template>
