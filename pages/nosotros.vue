<script setup>
const config = useRuntimeConfig();

const title = 'Nosotros'

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${title} | ${titleChunk}` : title
  },
  meta: [
    {
      property: 'og:title',
      content: title + ' | Lindero',
    },
    {
      property: 'og:description',
      content:
        'Somos una empresa que brinda servicios y soluciones a distintos sectores empresariales con maquinaria especializada y materias primas.',
    },
    {
      property: 'og:image',
      content: config.DOMAIN_URL + '/og-image.png',
    },
  ],
});

const timeLine = [
  {
    year: 2000,
    event:
      'Se creó la empresa LINDERO SA con la finalidad de suministrar equipos de granallado de turbinas y aire comprimido de CYM Materiales, así como también granalla de acero al carbón.',
  },
  {
    year: 2005,
    event:
      'Incorporamos Peddinghaus Corporation para atender el sector metalmecánico, en particular, enfocado en empresas dedicadas a la fabricación de estructuras metálicas, torres de telecomunicaciones y distribución de energía.',
  },
  {
    year: 2008,
    event:
      'Se incorporó y vendió el primer equipo de taladrado de perfiles de OCEAN MACHINERY.',
  },
  {
    year: 2010,
    event: 'Instalamos la primera mesa de corte AMG con plasma Kjellberg de 440 A.',
  },
  {
    year: 2014,
    event:
      'Fuimos nombrados por Hypertherm socios comerciales para suministrar las mesas de corte con sus equipos.',
  },
  {
    year: 2020,
    event: 'Se instaló la cuarta mesa de corte con el nuevo plasma XPR300.',
  },
];
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
            Nosotros
          </h1>
        </div>
      </div>
      <div
        class="bg-us absolute z-20 object-cover w-full min-w-full min-h-full max-w-none"
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
        class="flex flex-col flex-col-reverse md:flex-row items-center max-w-[1200px] py-20 px-5 mx-auto"
      >
        <div class="flex w-full mt-7 md:mr-7 md:mt-0">
          <img
            class="h-[440px] object-cover rounded"
            src="~/assets/images/lindero-bruno.jpg"
          />
        </div>
        <div class="flex flex-col w-full">
          <h2
            class="text-lindero-orange text-base uppercase font-bold font-teko text-center md:text-left underline decoration-lindero-orange decoration-2 underline-offset-8 mb-5"
          >
            Nuestra historia
          </h2>
          <p
            class="text-5xl font-medium font-teko text-center md:text-left text-lindero-blue-darken mb-5"
          >
            Lindero SA
          </p>
          <p class="text-center md:text-left">
            Somos una empresa que brinda servicios y soluciones a distintos sectores
            empresariales con maquinaria especializada y materias primas.
          </p>
          <br />
          <p class="text-center md:text-left">
            Contamos con equipo de profesionales capacitados quienes le brindaran la
            asesoría necesaria a fin de satisfacer sus necesidades.
          </p>
        </div>
      </div>
    </div>

    <div class="flex flex-col items-center bg-lindero-body-2">
      <div class="flex flex-col items-center max-w-[1200px] w-full py-20 px-5 mx-auto">
        <div class="flex flex-col w-full">
          <h2
            class="text-lindero-orange text-base uppercase font-bold font-teko text-center underline decoration-lindero-orange decoration-2 underline-offset-8 mb-5"
          >
            Línea de tiempo Lindero
          </h2>
          <p
            class="text-5xl font-medium font-teko text-center text-lindero-blue-darken mb-0"
          >
            Nuestro paso a través de los años
          </p>
        </div>

        <div class="flex w-full mt-7">
          <div
            class="flex flex-col lg:flex-row items-center justify-between relative w-full lg:h-[500px]"
          >
            <div
              class="absolute border-dashed border-r-4 lg:border-t-4 lg:border-r-0 w-[1px] h-full lg:h-[1px] lg:w-full bottom-1/2 translate-y-1/2 border-lindero-gray-darken"
            ></div>
            <template v-for="(point, idx) in timeLine" key="idx">
              <div
                v-if="idx % 2 == 0"
                class="z-10 flex flex-row-reverse lg:flex-col-reverse items-center w-[120px] lg:h-[88px] lg:w-auto"
              >
                <span
                  class="text-2xl min-w-[40px] font-teko text-lindero-gray-darker ml-2 lg:ml-0"
                  >{{ point.year }}</span
                >
                <div
                  class="h-6 w-6 min-h-[24px] min-w-[24px] bg-lindero-blue-light rounded-xl"
                ></div>
                <div
                  class="h-[2px] w-16 min-h-[2px] min-w-[24px] lg:w-[2px] lg:h-16 lg:min-w-[2px] lg:min-h-[64px] bg-lindero-blue-light"
                ></div>
                <p
                  class="flex text-xs text-center text-lindero-gray-light min-w-[130px] md:min-w-[220px] lg:min-w-[130px] w-full lg:max-w-[180px] m-2"
                >
                  {{ point.event }}
                </p>
              </div>
              <div
                v-else
                class="z-10 flex flex-row lg:flex-col items-center w-[120px] lg:h-[88px] lg:w-auto"
              >
                <span
                  class="text-2xl min-w-[40px] font-teko text-lindero-gray-darker mr-2 lg:mr-0"
                  >{{ point.year }}</span
                >
                <div
                  class="h-6 w-6 min-h-[24px] min-w-[24px] bg-lindero-orange rounded-xl"
                ></div>
                <div
                  class="h-[2px] w-16 min-h-[2px] min-w-[24px] lg:w-[2px] lg:h-16 lg:min-w-[2px] lg:min-h-[64px] bg-lindero-orange"
                ></div>
                <p
                  class="flex text-xs text-center text-lindero-gray-light min-w-[130px] md:min-w-[220px] lg:min-w-[130px] w-full lg:max-w-[180px] m-2"
                >
                  {{ point.event }}
                </p>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col items-center">
      <div class="flex flex-col lg:flex-row w-full max-w-[1200px] py-20 px-5 mx-auto">
        <div class="flex flex-col items-center w-full mb-20 lg:mb-0">
          <h2
            class="text-lindero-blue-darken text-4xl font-medium font-teko text-center underline decoration-lindero-orange decoration-2 underline-offset-8 mb-2"
          >
            Nuestra visión
          </h2>
          <p class="text-center max-w-[500px]">
            Ofrecer a nuestros clientes y socios comerciales soluciones efectivas que
            generen valor agregado en sus procesos.
          </p>
        </div>
        <div class="flex flex-col items-center w-full">
          <h2
            class="text-lindero-blue-darken text-4xl font-medium font-teko text-center underline decoration-lindero-orange decoration-2 underline-offset-8 mb-2"
          >
            Nuestra misión
          </h2>
          <p class="text-center max-w-[500px]">
            Ser reconocida como una de las mejores empresas del mercado en brindar
            soluciones profesionales en las diversas unidades de negocio que ofrecemos.
          </p>
        </div>
      </div>
    </div>

    <LFooter></LFooter>
  </div>
</template>
