<script setup lang="ts">
import * as slugify from '@sindresorhus/slugify'
import MazTransitionExpand from 'maz-ui/components/MazTransitionExpand'
import MazBtn from 'maz-ui/components/MazBtn'
import { DirectusQueryParams } from 'nuxt-directus/dist/runtime/types'

const config = useRuntimeConfig()
const { getItems } = useDirectusItems()

const title = 'Productos'

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

const backofficeUrlAssets = config.BACKOFFICE_URL + '/assets/'

const productPages = ref(0)
const productPage = ref(1)

const limit = 6

let productsFieldsParams: DirectusQueryParams = {
  fields: ['name', 'brand.name', 'images.directus_files_id', 'id'],
  page: productPage.value,
  limit,
  meta: '*'
}
const brandsFieldsParams = {
  fields: ['name,id']
}
const categoriesFieldsParams = {
  fields: ['name,id,business_line.name,business_line.id']
}

let brandsSelected: any[] = []
let categoriesSelected: any[] = []

const products = ref([])
const productsLoading = ref(false)

const brandFilterCollapsed = ref(false)
const businessLinesFilterCollapsed = ref(false)
const consumablesFilterCollapsed = ref(false)

let brands: any[] = []
let categories: any[] = []
let businessLines: any[] = []

const fetchBrands = async () => {
  try {
    brands = await getItems({
      collection: 'brands',
      params: brandsFieldsParams
    })
  } catch (e) {}
}

const fetchCategories = async () => {
  try {
    categories = await getItems({
      collection: 'categories',
      params: categoriesFieldsParams
    })
  } catch (e) {}
}

const fetchBusinessLines = async () => {
  try {
    businessLines = await getItems({
      collection: 'business_lines',
      params: brandsFieldsParams
    })
  } catch (e) {}
}

const fetchProducts = async () => {
  try {
    const response: any = await getItems({
      collection: 'products',
      params: productsFieldsParams
    })

    products.value = response.data
    productPages.value = Math.ceil(response.meta.total_count / limit)
  } catch (e) {}
}

const filtersCollapsed = ref(Array(businessLines.length).fill(false))

const consumablesCategories = computed(() => {
  return categories.filter((category) => category.business_line.id == 4)
})

const businessLinesMapped = computed(() => {
  return businessLines
    .filter((bl) => bl.id != 4)
    .map((bl) => {
      return {
        name: bl.name,
        id: bl.id,
        categories: categories.filter((c) => c.business_line.id == bl.id)
      }
    })
})

const onBrandFilterUpdate = async (event: any) => {
  productsLoading.value = true

  if (event.target.checked) {
    brandsSelected.push(event.target.value)
  } else {
    brandsSelected = brandsSelected.filter((v) => v != event.target.value)
  }

  productPage.value = 1

  productsFieldsParams = {
    ...productsFieldsParams,
    ...{ 'filter[brand][_in]': brandsSelected },
    ...{ page: productPage.value }
  }

  fetchProducts()
  productsLoading.value = false
}

const onCategoryFilterUpdate = async (event: any) => {
  productsLoading.value = true

  if (event.target.checked) {
    categoriesSelected.push(event.target.value)
  } else {
    categoriesSelected = categoriesSelected.filter(
      (v) => v != event.target.value
    )
  }

  productPage.value = 1

  productsFieldsParams = {
    ...productsFieldsParams,
    ...{ 'filter[category][_in]': categoriesSelected },
    ...{ page: productPage.value }
  }

  fetchProducts()
  productsLoading.value = false
}

const onProductPageUpdate = async (page: any) => {
  if (page == productPage.value) return

  productsLoading.value = true

  productsFieldsParams = {
    ...productsFieldsParams,
    ...{ page }
  }

  fetchProducts()
  productPage.value = page
  productsLoading.value = false
}

const convertToSlug = (name: string, id: string) => {
  return slugify.default(name + ' ' + id)
}

onMounted(() => {
  fetchBrands()
  fetchBusinessLines()
  fetchCategories()
  fetchProducts()
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
            Productos
          </h1>
        </div>
      </div>
      <div
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
        class="flex flex-col items-center w-full max-w-[1200px] py-20 px-5 mx-auto"
      >
        <h2
          class="text-5xl font-medium font-teko text-lindero-blue-darken font-medium font-teko underline decoration-lindero-orange decoration-2 underline-offset-8 mb-16"
        >
          Cotiza en 3 pasos
        </h2>
        <div class="flex justify-between w-full max-w-[800px]">
          <div class="flex flex-col items-center">
            <span class="material-icons text-lindero-orange text-[54px] mb-2"
              >search</span
            ><span class="text-2xl text-lindero-blue-darken font-medium"
              >Busca</span
            >
          </div>
          <div class="flex flex-col items-center">
            <span class="material-icons text-lindero-orange text-[54px] mb-2"
              >touch_app</span
            ><span class="text-2xl text-lindero-blue-darken font-medium"
              >Selecciona</span
            >
          </div>
          <div class="flex flex-col items-center">
            <span class="material-icons text-lindero-orange text-[54px] mb-2"
              >request_quote</span
            ><span class="text-2xl text-lindero-blue-darken font-medium"
              >Cotiza</span
            >
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col items-center">
      <div
        class="flex flex-col items-center w-full max-w-[1200px] pb-20 px-5 mx-auto"
      >
        <div class="flex flex-col lg:flex-row items-start w-full">
          <div class="w-full lg:w-auto mr-9">
            <h5
              class="text-2xl text-lindero-blue-darken font-semibold font-teko"
            >
              Filtros
            </h5>
            <div
              class="bg-lindero-white rounded border-lindero-gray-4 border w-full sm:w-1/2 lg:w-full lg:max-w-[325px] lg:min-w-[325px]"
            >
              <div>
                <div
                  @click="brandFilterCollapsed = !brandFilterCollapsed"
                  class="py-2 px-4 flex items-center cursor-pointer"
                >
                  <span
                    class="material-icons transition-transform duration-200 text-sm"
                    :class="{ 'rotate-90': brandFilterCollapsed }"
                    >arrow_forward_ios</span
                  >
                  <span class="text-sm text-lindero-gray-darken ml-2"
                    >Marcas</span
                  >
                </div>
                <MazTransitionExpand>
                  <div v-if="brandFilterCollapsed">
                    <div
                      v-for="brand in brands"
                      :key="brand.id"
                      class="form-control ml-10"
                    >
                      <label class="flex items-center cursor-pointer mb-3">
                        <input
                          @change="onBrandFilterUpdate"
                          :value="brand.id"
                          type="checkbox"
                          class="checkbox checkbox-primary checkbox-xs mr-2"
                        />
                        <span class="text-sm text-lindero-gray select-none">{{
                          brand.name
                        }}</span>
                      </label>
                    </div>
                  </div>
                </MazTransitionExpand>
              </div>

              <div class="w-full h-[1px] bg-lindero-gray-4"></div>

              <div>
                <div
                  @click="
                    businessLinesFilterCollapsed = !businessLinesFilterCollapsed
                  "
                  class="collapse-title py-2 px-4 flex items-center cursor-pointer"
                >
                  <span
                    class="material-icons transition-transform duration-200 text-sm"
                    :class="{ 'rotate-90': businessLinesFilterCollapsed }"
                    >arrow_forward_ios</span
                  >
                  <span class="text-sm text-lindero-gray-darken ml-2"
                    >Líneas de fabricación</span
                  >
                </div>
                <MazTransitionExpand>
                  <div class="pl-5" v-if="businessLinesFilterCollapsed">
                    <div v-for="(bl, idx) in businessLinesMapped" :key="bl.id">
                      <div
                        @click="filtersCollapsed[idx] = !filtersCollapsed[idx]"
                        class="collapse-title py-2 px-4 flex items-center cursor-pointer"
                      >
                        <span
                          class="material-icons transition-transform duration-200 text-sm"
                          :class="{ 'rotate-90': filtersCollapsed[idx] }"
                          >arrow_forward_ios</span
                        >
                        <span class="text-sm text-lindero-gray-darken ml-2">{{
                          bl.name
                        }}</span>
                      </div>
                      <MazTransitionExpand>
                        <div v-if="filtersCollapsed[idx]">
                          <div
                            v-for="c in bl.categories"
                            :key="c.id"
                            class="form-control ml-10"
                          >
                            <label
                              class="flex items-center cursor-pointer mb-3"
                            >
                              <input
                                @change="onCategoryFilterUpdate"
                                :value="c.id"
                                type="checkbox"
                                class="checkbox checkbox-primary checkbox-xs mr-2"
                              />
                              <span
                                class="text-sm text-lindero-gray select-none"
                                >{{ c.name }}</span
                              >
                            </label>
                          </div>
                        </div>
                      </MazTransitionExpand>
                    </div>
                  </div>
                </MazTransitionExpand>
              </div>

              <div class="w-full h-[1px] bg-lindero-gray-4"></div>

              <div>
                <div
                  @click="
                    consumablesFilterCollapsed = !consumablesFilterCollapsed
                  "
                  class="collapse-title py-2 px-4 flex items-center cursor-pointer"
                >
                  <span
                    class="material-icons transition-transform duration-200 text-sm"
                    :class="{ 'rotate-90': consumablesFilterCollapsed }"
                    >arrow_forward_ios</span
                  >
                  <span class="text-sm text-lindero-gray-darken ml-2"
                    >Consumibles</span
                  >
                </div>
                <MazTransitionExpand>
                  <div v-if="consumablesFilterCollapsed">
                    <div
                      v-for="c in consumablesCategories"
                      :key="c.id"
                      class="form-control ml-10"
                    >
                      <label class="flex items-center cursor-pointer mb-3">
                        <input
                          @change="onCategoryFilterUpdate"
                          :value="c.id"
                          type="checkbox"
                          class="checkbox checkbox-primary checkbox-xs mr-2"
                        />
                        <span class="text-sm text-lindero-gray select-none">{{
                          c.name
                        }}</span>
                      </label>
                    </div>
                  </div>
                </MazTransitionExpand>
              </div>
            </div>
          </div>
          <div class="flex flex-col items-center w-full">
            <div
              v-if="products.length == 0"
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
                v-if="!productsLoading"
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 w-full py-8"
              >
                <div
                  v-for="product in products"
                  :key="product.id"
                  class="flex flex-col bg-lindero-white rounded border-lindero-gray-4 border overflow-hidden"
                >
                  <img
                    v-if="product.images.length > 0"
                    class="h-44 object-cover"
                    :src="
                      backofficeUrlAssets +
                      product.images[0].directus_files_id +
                      '?height=200'
                    "
                  />
                  <div
                    v-else
                    class="bg-lindero-gray-4 h-44 flex flex-col items-center justify-center opacity-40"
                  >
                    <span
                      class="material-icons text-3xl text-lindero-gray-light"
                      >photo_camera</span
                    >
                    <span class="text-sm text-lindero-gray-light"
                      >Producto sin imagen</span
                    >
                  </div>
                  <div class="flex flex-col px-3 pb-3 pt-1">
                    <span class="text-sm font-teko">{{
                      product.brand.name
                    }}</span>
                    <h5 class="text-xl font-teko mb-2">
                      {{ product.name }}
                    </h5>
                    <LButton
                      :to="
                        '/productos/' + convertToSlug(product.name, product.id)
                      "
                      link
                      class="self-center"
                      type="ghost"
                      size="small"
                      >Ver más</LButton
                    >
                  </div>
                </div>
              </div>
              <div
                v-else
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 w-full py-8"
              >
                <div
                  v-for="product in 6"
                  :key="product"
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
            <div v-if="products.length > 0" class="btn-group">
              <MazBtn
                v-for="page in productPages"
                @click="onProductPageUpdate(page)"
                size="xs"
                :pastel="productPage != page"
                :color="productPage != page ? 'transparent' : 'primary'"
                class="mr-1 last:mr-0"
              >
                {{ page }}
              </MazBtn>
            </div>
          </div>
        </div>
      </div>
    </div>

    <LFooter></LFooter>
  </div>
</template>
