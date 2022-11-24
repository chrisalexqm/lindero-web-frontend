<script setup>
import MazBtn from 'maz-ui/components/MazBtn'
import MazInput from 'maz-ui/components/MazInput'
import MazRadioButtons from 'maz-ui/components/MazRadioButtons'
import MazSelect from 'maz-ui/components/MazSelect'
import MazTextarea from 'maz-ui/components/MazTextarea'

import { ToasterHandler } from 'maz-ui'

const toast = new ToasterHandler()

const route = useRoute()
const config = useRuntimeConfig()

const title = 'Contáctanos'

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

const userName = ref('')
const companyName = ref('')
const userType = ref('Cliente')
const userEmail = ref('')
const userPhone = ref('')
const companyCategory = ref('')
const description = ref('')

const userTypes = [
  {
    label: 'Cliente',
    value: 'Cliente'
  },
  {
    label: 'Distribuidor',
    value: 'Distribuidor'
  }
]

const companyCategories = [
  {
    label: 'Metalmecánico',
    value: 'Metalmecánico'
  },
  {
    label: 'Cerámico',
    value: 'Cerámico'
  },
  {
    label: 'Plástico',
    value: 'Plástico'
  },
  {
    label: 'Otro',
    value: 'Otro'
  }
]

const sendingEmail = ref(false)
const sucess = ref(false)
const fail = ref(false)

const apiKey = 'AIzaSyDc4sNUE8ChDljA_6GjAvF05oqBVpJIPAg'
const map = ref(null)

const contentString = `
<div class="flex justify-between items-start">
  <div class="text-lindero-blue-darken text-base uppercase font-bold font-teko underline decoration-lindero-orange decoration-2 underline-offset-8 mb-2">Lindero SA</div>
  <a target="_blank" href="https://www.google.com/maps/dir//Monte+Azul+180,+Santiago+de+Surco+15038/@-12.0479105,-77.0290397,13z" class="flex items-center">
    <span class="text-xs text-lindero-blue font-poppins">Cómo llegar</span>
    <span class="material-icons text-sm text-lindero-blue">open_in_new</span>
  </a>
</div>
<div class="text-sm font-poppins text-lindero-gray-darken font-medium">Pasaje Monte Azul 180 Of. 215 A</div>
`

const submitForm = () => {
  sendingEmail.value = true
  const msg = {
    userName: userName.value,
    companyName: companyName.value,
    userType: userType.value,
    userEmail: userEmail.value,
    userPhone: userPhone.value,
    companyCategory: companyCategory.value,
    description: description.value
  }
  emailjs.send('service_qtg4qwo', 'template_pjgvwp9', msg).then(
    () => {
      sucess.value = true
      sendingEmail.value = false
      toast.success('Su solicitud ha sido enviada', {
        position: 'top',
        timeout: 4000
      })
    },
    () => {
      fail.value = true
      sendingEmail.value = false
      toast.error('Hubo un error inesperado', {
        position: 'top',
        timeout: 4000
      })
    }
  )
}

const onGmapLoad = () => {
  const mapInstance = new google.maps.Map(map.value, {
    center: { lat: -12.112473, lng: -76.99122823 },
    zoom: 16,
    maxZoom: 20,
    minZoom: 10,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    styles: [
      {
        featureType: 'poi.business',
        stylers: [
          {
            visibility: 'off'
          }
        ]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text',
        stylers: [
          {
            visibility: 'off'
          }
        ]
      }
    ]
  })
  const marker = new google.maps.Marker({
    position: { lat: -12.112473, lng: -76.99122823 },
    icon: '/lindero-logo.png',
    map: mapInstance
  })
  const infowindow = new google.maps.InfoWindow({
    content: contentString
  })
  marker.addListener('click', () => {
    if (!infowindow.getMap()) {
      infowindow.open({
        anchor: marker,
        map: mapInstance,
        shouldFocus: false
      })
    } else {
      infowindow.close()
    }
  })
}

const initEmailJS = () => {
  emailjs.init('rbqtxuZ7_gNqkXcJn')
}

onMounted(() => {
  const productName = route.params.productName
  const productCode = route.params.productCode
  const productUrl = route.params.productUrl

  if (productName && productCode) {
    description.value = `Hola quiero cotizar:
  - ${productName} (${productCode})
  ${productUrl}`
  }

  if (process.client) {
    if (!window.google) {
      const head = document.getElementsByTagName('head')[0]
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.defer = true
      script.async = true
      script.onload = function () {
        onGmapLoad()
      }
      script.src =
        'https://maps.googleapis.com/maps/api/js?key=' +
        apiKey +
        '&libraries=places'
      head.appendChild(script)
    } else {
      onGmapLoad()
    }
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
          <h1
            class="text-5xl font-bold font-teko uppercase text-lindero-white underline decoration-lindero-blue-light decoration-2 underline-offset-8"
          >
            Contáctanos
          </h1>
        </div>
      </div>
      <div
        class="bg-contact absolute z-20 object-cover w-full min-w-full min-h-full max-w-none"
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
        class="flex flex-col flex-col w-full max-w-[1200px] py-20 px-5 mx-auto"
      >
        <div>
          <h2
            class="text-lindero-orange text-base uppercase font-bold font-teko underline decoration-lindero-orange decoration-2 underline-offset-8 mb-5"
          >
            Información sobre nuestros productos
          </h2>
          <p
            class="text-5xl font-medium font-teko text-lindero-blue-darken mb-5"
          >
            Solicita una cotización
          </p>
        </div>
        <div class="flex flex-col md:flex-row">
          <form
            @submit.stop.prevent="submitForm()"
            @keyup.enter="submitForm"
            class="flex flex-col w-full mr-0 mb-16 md:mr-7 md:mb-0"
          >
            <div class="form-control mb-4">
              <MazInput
                type="text"
                name="user_name"
                v-model="userName"
                required
                placeholder="Nombre"
              />
            </div>

            <div class="form-control mb-4">
              <MazInput
                type="text"
                name="company_name"
                v-model="companyName"
                required
                placeholder="Compañia"
              />
            </div>

            <div class="form-control mb-4">
              <label class="inline-block mb-2">
                <span class="label-text text-lindero-gray-darken">Soy:</span>
              </label>
              <MazRadioButtons v-model="userType" :options="userTypes" />
            </div>

            <div class="form-control mb-4">
              <MazInput
                type="email"
                name="email"
                v-model="userEmail"
                required
                placeholder="Correo"
              />
            </div>

            <div class="form-control mb-4">
              <MazInput
                type="tel"
                name="phone"
                v-model="userPhone"
                required
                placeholder="Teléfono"
              />
            </div>

            <div class="form-control mb-4">
              <label>
                <span>Rubro:</span>
              </label>
              <MazSelect
                name="company_category"
                v-model="companyCategory"
                :options="companyCategories"
                placeholder="Seleccione un rubro"
                :required="true"
              />
            </div>

            <div class="form-control mb-8">
              <label>Tienes alguna consulta:</label>
              <MazTextarea
                name="description"
                v-model="description"
                placeholder="Detalla tu consulta"
              ></MazTextarea>
            </div>
            <MazBtn type="submit" :loading="sendingEmail">Enviar</MazBtn>
          </form>
          <div
            class="relative bg-after-sales flex flex-col w-full items-center rounded overflow-hidden"
          >
            <div
              class="bg-lindero-blue-darken absolute z-20 object-cover w-full min-w-full min-h-full max-w-none opacity-90"
            ></div>
            <div
              class="z-30 flex flex-col items-center justify-center w-full max-w-[500px] h-full px-5 py-20"
            >
              <h2
                class="text-lindero-white text-xl uppercase font-bold font-teko underline decoration-lindero-orange decoration-2 underline-offset-8 mb-5"
              >
                Sobre nuestra atención
              </h2>
              <p class="text-lindero-white text-lg text-center font-medium">
                Los mensajes serán respondidos en un plazo máximo de 24 horas.
              </p>
              <br />
              <p
                class="text-lindero-white text-lg text-center font-medium mb-5"
              >
                Horario de Atención: Lunes a Viernes de 8:30am a 5:30pm
              </p>

              <div class="flex">
                <LButton
                  class="mr-5"
                  size="small"
                  link
                  :to="'tel:+51987949016'"
                >
                  <span class="material-icons text-sm mr-2">phone</span>
                  <span>987949016</span>
                </LButton>
                <LButton size="small" link :to="'tel:+51981079689'">
                  <span class="material-icons text-sm mr-2">phone</span>
                  <span>981079689</span>
                </LButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full h-96" ref="map"></div>

    <LFooter></LFooter>
  </div>
</template>
