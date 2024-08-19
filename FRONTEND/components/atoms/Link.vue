<template>
  <a :href="href" :class="computedClass" @click="handleClick">
    <slot></slot>
  </a>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  href: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    default: "default", // Default to 'default' variant
  },
  external: {
    type: Boolean,
    default: false,
  },
});

const computedClass = computed(() => {
  switch (props.variant) {
    case "primary":
      return "text-buttonPrimary hover:text-buttonPrimary/90 font-bold";
    case "secondary":
      return "text-buttonSecondary hover:text-buttonSecondary/90";
    case "success":
      return "text-buttonSuccess hover:text-buttonSuccess/90";
    case "danger":
      return "text-buttonDanger hover:text-buttonDanger/90";
    case "variant":
      return "text-buttonVariant hover:text-buttonVariant/90";
    case "variantSecondary":
      return "text-buttonVariantSecondary hover:text-buttonVariantSecondary/90";
    case "variantTertiary":
      return "text-buttonVariantTertiary hover:text-buttonVariantTertiary/90";
    case "default":
      return "text-black hover:underline";
    default:
      return "text-buttonPrimary hover:text-buttonPrimary/90";
  }
});

const handleClick = (event) => {
  if (props.external) {
    return;
  }
  event.preventDefault();
};
</script>
