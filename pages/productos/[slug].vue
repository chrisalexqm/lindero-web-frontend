<script setup>
import { vZoomImg } from 'maz-ui'

const route = useRoute()
const config = useRuntimeConfig()
const { getItemById } = useDirectusItems()

const backofficeUrlItems = config.BACKOFFICE_URL + '/items'
const backofficeUrlAssets = config.BACKOFFICE_URL + '/assets/'

const slug = route.params.slug
const productId = slug.split('-')[slug.split('-').length - 1]

const product = ref({})

const tabSelected = ref(0)

const userName = ref('')
const companyName = ref('')
const userPhone = ref('')
const userEmail = ref('')
const sendingEmail = ref(false)
const sucess = ref(false)
const fail = ref(false)
const imageModalOpen = ref(false)
const imageZoomed = ref(false)
const productLoading = ref(true)

const productFieldParams = {
  fields: [
    'name,code,brand.name,images.directus_files_id,id,description,functions.name,technical_specifications'
  ]
}

const fetchProduct = async () => {
  productLoading.value = true
  try {
    product.value = await getItemById({
      collection: 'products',
      id: productId,
      params: productFieldParams
    })
    productLoading.value = false
  } catch (e) {
    productLoading.value = false
  }
}

useHead({
  title: computed(() => {
    return product.value.name
      ? `${product.value.name} | Lindero | Maquinaria y materias primas para el sector metalmecánico`
      : 'Cargando producto...'
  }),
  meta: [
    {
      property: 'og:title',
      content: product.value.name + ' | Lindero'
    },
    {
      property: 'og:description',
      content: product.value.description
    },
    {
      property: 'og:image',
      content: computed(() => {
        if (!product.value.images) return config.DOMAIN_URL + '/og-image.png'
        return product.value.images.length > 0
          ? backofficeUrlAssets +
              product.value.images[0].directus_files_id +
              '?height=200'
          : config.DOMAIN_URL + '/og-image.png'
      })
    },
    {
      property: 'og:url',
      content: config.DOMAIN_URL + '/productos/' + slug
    }
  ]
})

const onTabClick = (tab) => {
  tabSelected.value = tab
}

const getProductUrl = () => {
  return config.DOMAIN_URL + '/productos/' + route.params.slug
}

const submitWAForm = async () => {
  const baseWhatsAppUrl = 'https://api.whatsapp.com/send'
  const phone = '51987949016'
  const url = getProductUrl()

  await useAsyncQuotationRequest({
    baseURL: backofficeUrlItems,
    method: 'POST',
    body: {
      name: userName.value,
      company: companyName.value,
      contact: userPhone.value,
      contact_type: 'WhatsApp'
    }
  })

  const text =
    'Hola👋!%20Soy%20*' +
    userName.value +
    '(' +
    userPhone.value +
    ')' +
    '*%20de%20la%20empresa%20*' +
    companyName.value +
    '*%20y%20quiero%20cotizar%3A%0A%0A' +
    '👉%20' +
    product.value.name +
    '%20_(' +
    product.value.code +
    ')_%0A%0A' +
    url

  window.open(baseWhatsAppUrl + '?phone=' + phone + '&text=' + text)
}

const submitEMForm = async () => {
  sendingEmail.value = true

  await useAsyncQuotationRequest({
    baseURL: backofficeUrlItems,
    method: 'POST',
    body: {
      name: userName.value,
      company: companyName.value,
      contact: userEmail.value,
      contact_type: 'Email'
    }
  })

  const msg = {
    productName: product.value.name,
    brand: product.value.brand.name,
    code: product.value.code,
    description: product.value.description,
    image: computed(() => {
      if (!product.value.images) return config.DOMAIN_URL + '/og-image.png'
      product.value.images.length > 0
        ? backofficeUrlAssets + product.value.images[0].directus_files_id
        : config.DOMAIN_URL + '/og-image.png'
    }),
    userName: userName.value,
    userEmail: userEmail.value,
    companyName: companyName.value
  }
  emailjs.send('service_qtg4qwo', 'template_o8rb40k', msg).then(
    () => {
      sucess.value = true
      sendingEmail.value = false
      setTimeout(() => {
        sucess.value = false
      }, 5000)
    },
    () => {
      fail.value = true
      sendingEmail.value = false
      setTimeout(() => {
        fail.value = false
      }, 5000)
    }
  )
}

const initEmailJS = () => {
  emailjs.init('rbqtxuZ7_gNqkXcJn')
}

const carousel = ref(null)
const useImageSrc = () => useState('imageSrc', () => '')
const imageSrc = useImageSrc()

const goToImage = (imageIndex) => {
  const itemWidth = carousel.value.children[0].clientWidth
  carousel.value.scrollTo({
    left: itemWidth * imageIndex,
    top: 0,
    behavior: 'smooth'
  })
}

const openZoomImageModal = (imageSelectedSrc) => {
  imageSrc.value = imageSelectedSrc
  imageModalOpen.value = true
}

const closeZoomImageModal = () => {
  imageModalOpen.value = false
}

const handleImageZoomed = () => {
  imageZoomed.value = !imageZoomed.value
}

onMounted(() => {
  fetchProduct()
  if (process.client) {
    if (!window.emailjs) {
      const head = document.getElementsByTagName('head')[0]
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.defer = true
      script.async = true
      script.onload = function () {
        initEmailJS()
      }
      script.src =
        'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js'
      head.appendChild(script)
    } else {
      initEmailJS()
    }
  }
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
          <h2
            class="text-5xl font-bold font-teko uppercase text-lindero-white underline decoration-lindero-blue-light decoration-2 underline-offset-8"
          >
            Detalle del producto
          </h2>
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

    <div v-if="!productLoading" class="flex flex-col items-center">
      <div
        class="flex flex-col items-center w-full max-w-[1200px] py-20 px-5 mx-auto"
      >
        <div class="flex flex-col md:flex-row w-full">
          <div class="w-full mb-5 md:mb-0 md:mr-5">
            <h1
              class="md:hidden text-4xl font-teko text-lindero-gray-darken mb-5"
            >
              {{ product.name }}
            </h1>
            <div
              v-if="product.images.length > 0"
              ref="carousel"
              class="carousel overscroll-none w-full bg-lindero-white rounded border-lindero-gray-4 border"
            >
              <div
                v-for="(image, idx) in product.images"
                :id="'image' + (idx + 1)"
                class="carousel-item w-full h-80 scroll-mt-24"
              >
                <img
                  :src="
                    backofficeUrlAssets +
                    image.directus_files_id +
                    '?height=320'
                  "
                  v-zoom-img="{
                    src: backofficeUrlAssets + image.directus_files_id
                  }"
                  class="w-full object-cover"
                />
              </div>
            </div>
            <div
              v-else
              class="carousel bg-lindero-white rounded border-lindero-gray-4 border"
            >
              <div
                class="w-full h-80 bg-lindero-gray-4 h-44 flex flex-col items-center justify-center opacity-40"
              >
                <span class="material-icons text-3xl text-lindero-gray-light"
                  >photo_camera</span
                >
                <span class="text-sm text-lindero-gray-light"
                  >Producto sin imagen</span
                >
              </div>
            </div>
            <div class="flex justify-center w-full py-2 gap-2">
              <NuxtLink
                v-for="(image, idx) in product.images"
                @click="goToImage(idx)"
                :replace="true"
                class="bg-lindero-white rounded border-lindero-gray-4 border overflow-hidden"
              >
                <img
                  :src="
                    backofficeUrlAssets +
                    image.directus_files_id +
                    '?height=320'
                  "
                  class="w-10 h-10 object-cover"
              /></NuxtLink>
            </div>
          </div>
          <div class="w-full">
            <h1
              class="hidden md:block text-4xl font-teko text-lindero-gray-darken mb-2"
            >
              {{ product.name }}
            </h1>
            <div class="tabs mb-5">
              <button
                @click="onTabClick(0)"
                class="tab tab-bordered"
                :class="{ 'tab-active': tabSelected == 0 }"
              >
                Descripción
              </button>
              <button
                @click="onTabClick(1)"
                :class="{ 'tab-active': tabSelected == 1 }"
                class="tab tab-bordered"
              >
                Especificaciones
              </button>
            </div>
            <div :class="{ hidden: tabSelected != 0 }">
              <h2 class="text-xl font-teko font-semibold mb-2">Descripción</h2>
              <p class="text-sm mb-4">{{ product.description }}</p>
              <h2 class="text-xl font-teko font-semibold mb-2">Funciones</h2>
              <p class="text-sm">{{ product.functions.name }}</p>
            </div>
            <div :class="{ hidden: tabSelected != 1 }">
              <h2 class="text-xl font-teko font-semibold mb-2">
                Especificaciones técnicas
              </h2>
              <div class="overflow-x-auto">
                <table class="table-fixed w-full">
                  <tbody>
                    <tr v-for="te in product.technical_specifications">
                      <td class="p-2 text-sm">{{ te.title }}</td>
                      <td class="p-2 text-sm">{{ te.description }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="flex mt-7">
              <label
                for="whatsapp-modal"
                class="flex items-center bg-[#25D366] hover:bg-[#3ADE77] transition active:scale-95 rounded py-2 px-4 mr-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#FFFFFF"
                >
                  <path
                    d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"
                  />
                </svg>
                <span class="text-sm text-lindero-white ml-2"
                  >Cotiza ahora</span
                >
              </label>

              <label
                for="email-modal"
                class="flex items-center bg-lindero-blue hover:bg-[#2687CF] transition active:scale-95 rounded py-2 px-4"
              >
                <span class="material-icons text-lindero-white">email</span>
                <span class="text-sm text-lindero-white ml-2"
                  >Cotiza ahora</span
                >
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <LFooter></LFooter>
    <!-- Modal Whatsapp -->
    <input type="checkbox" id="whatsapp-modal" class="modal-toggle" />
    <div class="modal modal-bottom sm:modal-middle">
      <div class="modal-box rounded relative">
        <label
          for="whatsapp-modal"
          class="btn btn-primary btn-xs btn-circle absolute right-2 top-2"
          >✕</label
        >
        <h2
          class="text-3xl text-center font-medium font-teko text-lindero-blue-darken font-medium font-teko underline decoration-lindero-orange decoration-2 underline-offset-8"
        >
          Estas a un paso de cotizar tu producto
        </h2>
        <p class="py-4">Por favor, ingresa tus datos:</p>
        <form
          @submit.stop.prevent="submitWAForm()"
          @keyup.enter="submitWAForm"
          class="flex flex-col w-full mr-0 mb-16 md:mr-7 md:mb-0"
        >
          <div class="form-control mb-4">
            <input
              type="text"
              name="user_name"
              v-model="userName"
              required
              placeholder="Nombre"
              class="input input-bordered w-full border-lindero-gray-4"
            />
          </div>

          <div class="form-control mb-4">
            <input
              type="text"
              name="company_name"
              v-model="companyName"
              required
              placeholder="Compañia"
              class="input input-bordered w-full border-lindero-gray-4"
            />
          </div>

          <div class="form-control mb-8">
            <input
              type="tel"
              name="phone"
              v-model="userPhone"
              required
              placeholder="Teléfono"
              class="input input-bordered w-full border-lindero-gray-4"
            />
          </div>

          <input type="submit" class="btn btn-primary" />
        </form>
      </div>
    </div>

    <!-- Modal Email -->
    <input type="checkbox" id="email-modal" class="modal-toggle" />
    <div class="modal modal-bottom sm:modal-middle">
      <div class="modal-box rounded relative">
        <label
          for="email-modal"
          class="btn btn-primary btn-xs btn-circle absolute right-2 top-2"
          >✕</label
        >
        <h2
          class="text-3xl text-center font-medium font-teko text-lindero-blue-darken font-medium font-teko underline decoration-lindero-orange decoration-2 underline-offset-8"
        >
          Estas a un paso de cotizar tu producto
        </h2>
        <p class="py-4">Por favor, ingresa tus datos:</p>
        <form
          @submit.stop.prevent="submitEMForm()"
          @keyup.enter="submitEMForm"
          class="flex flex-col items-center w-full mr-0 mb-16 md:mr-7 md:mb-0"
        >
          <div class="form-control w-full mb-4">
            <input
              type="text"
              name="user_name"
              v-model="userName"
              required
              placeholder="Nombre"
              class="input input-bordered w-full border-lindero-gray-4"
            />
          </div>

          <div class="form-control w-full mb-4">
            <input
              type="text"
              name="company_name"
              v-model="companyName"
              required
              placeholder="Compañia"
              class="input input-bordered w-full border-lindero-gray-4"
            />
          </div>

          <div class="form-control w-full mb-8">
            <input
              type="email"
              name="email"
              v-model="userEmail"
              required
              placeholder="Correo electrónico"
              class="input input-bordered w-full border-lindero-gray-4"
            />
          </div>

          <input
            type="submit"
            class="btn btn-primary w-full"
            :class="{ 'btn-disabled': sendingEmail }"
            :value="sendingEmail ? 'Enviando' : 'Enviar solicitud'"
          />
        </form>
      </div>
    </div>

    <div
      v-if="sucess"
      class="fixed top-0 right-1/2 translate-x-1/2 w-full max-w-[375px] px-5 z-[999]"
    >
      <div
        class="transition ease-in-out delay-250 translate-y-0 bg-blue-500 alert alert-success text-lindero-white shadow-lg mt-10"
        :class="{ 'translate-y-10': sucess }"
      >
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Su solicitud ha sido enviada</span>
        </div>
      </div>
    </div>

    <div
      v-if="fail"
      class="fixed top-0 right-1/2 translate-x-1/2 w-full max-w-[375px] px-5 z-[999]"
    >
      <div
        class="transition ease-in-out delay-250 translate-y-0 bg-blue-500 alert alert-error text-lindero-white shadow-lg mt-10"
        :class="{ 'translate-y-10': fail }"
      >
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Hubo un error inesperado</span>
        </div>
      </div>
    </div>

    <div class="modal flex-col py-2" :class="{ 'modal-open': imageModalOpen }">
      <div
        class="modal-box overflow-hidden relative w-11/12 max-h-screen max-w-7xl p-2 rounded"
      >
        <button
          @click="closeZoomImageModal()"
          class="btn btn-xs btn-primary btn-circle absolute right-4 top-4"
        >
          ✕
        </button>
        <div class="absolute bottom-4 flex justify-center w-full">
          <div
            class="bg-lindero-white flex items-center text-[10px] leading-[10px] rounded px-2 md:hidden"
          >
            <span class="text-gray-light"
              >Toca para {{ imageZoomed ? 'alejar' : 'acercar' }}</span
            >
            <span class="material-icons text-base ml-1">{{
              imageZoomed ? 'zoom_out' : 'zoom_in'
            }}</span>
          </div>
        </div>
        <div
          class="overflow-y-auto overflow-x-auto overscroll-none rounded"
          :class="{ 'h-full': imageZoomed }"
        >
          <img
            v-if="imageModalOpen"
            class="cursor-zoom-in"
            :class="{ 'max-w-none cursor-zoom-out': imageZoomed }"
            @click="handleImageZoomed()"
            :src="backofficeUrlAssets + imageSrc"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>
