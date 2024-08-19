<script setup lang="ts">
import { defineProps, computed } from "vue";
import { routes } from "@/public/routeImg";

interface ImageProps {
  name: string;
  size?: number | string;
  strokeWidth?: number | string;
  className?: string;
}

const props = defineProps<ImageProps>();

const imageSrc = computed(() => {
  const imageName = props.name;
  const modifyUrl = "/";

  if (routes.logos[imageName as keyof typeof routes.logos]) {
    return modifyUrl + routes.logos[imageName as keyof typeof routes.logos];
  } else if (routes.images[imageName as keyof typeof routes.images]) {
    return (
      modifyUrl + routes.images[imageName as keyof typeof routes.images]
    );
  } else {
    console.error(`Image not found for name: ${imageName}`);
    return "";
  }
});
</script>

<template>
  <img
    :src="imageSrc"
    :alt="props.name"
    :width="props.size"
    :height="props.size"
    :class="props.className"
    loading="lazy"
    rel="prefetch"
    :style="{
      'stroke-width': props.strokeWidth ? props.strokeWidth + 'px' : undefined,
    }"
  />
</template>
