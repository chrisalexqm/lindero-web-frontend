<script setup>
import { computed } from 'vue';

const props = defineProps({
  size: {
    type: String,
    default: 'default',
  },
  type: {
    type: String,
    default: 'default',
  },
  link: {
    type: Boolean,
    default: false,
  },
  to: {
    type: String,
  },
});

const classSize = computed(() => {
  let className = 'text-sm py-3 px-6';

  switch (props.size) {
    case 'small':
      className = 'text-xs py-2 px-5';
      break;
    case 'large':
      className = 'text-base py-4 px-8';
      break;
  }

  return className;
});

const classType = computed(() => {
  let className =
    'text-lindero-white bg-lindero-orange hover:bg-lindero-orange-500 active:bg-lindero-orange-500';

  switch (props.type) {
    case 'ghost':
      className =
        'text-lindero-orange hover:bg-lindero-orange-100 active:bg-lindero-orange-100';
      break;
    case 'secondary':
      className =
        'text-lindero-orange bg-lindero-white hover:bg-[#FFF8F0] active:bg-[#FFF8F0]';
      break;
  }

  return className;
});
</script>

<template>
  <NuxtLink
    role="button"
    v-if="props.link"
    :to="props.to"
    class="select-none flex items-center font-medium rounded transition active:scale-95"
    :class="[classSize, classType]"
  >
    <slot></slot>
  </NuxtLink>
  <button
    v-else
    class="select-none flex items-center font-medium rounded transition active:scale-95"
    :class="[classSize, classType]"
  >
    <slot></slot>
  </button>
</template>
