<script setup>
const route = useRoute()

const siteName =
  'Lindero | Maquinaria especializada y materias primas para el sector metalmecánico'

useHead({
  title: computed(() => {
    return siteName
  }),
  meta: [
    {
      property: 'og:site_name',
      content: 'Lindero'
    }
  ]
})
</script>

<template>
  <div>
    <Html lang="es">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </Html>
  </div>
</template>
