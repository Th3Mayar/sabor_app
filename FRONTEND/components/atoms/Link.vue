<template>
  <a :href="href" :class="computedClass" @click="handleClick">
    <slot></slot>
  </a>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface LinkProps {
  href: string;
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "variant"
    | "variantSecondary"
    | "variantTertiary"
    | "default";
  external?: boolean;
}

const props = defineProps<LinkProps>();

const computedClass = computed(() => {
  switch (props.variant) {
    case "primary":
      return "text-buttonPrimary hover:text-buttonPrimary/90 font-bold dark:text-buttonPrimary dark:hover:text-buttonPrimary/90";
    case "secondary":
      return "text-buttonSecondary hover:text-buttonSecondary/90 font-bold dark:text-buttonSecondary dark:hover:text-buttonSecondary/90";
    case "success":
      return "text-buttonSuccess hover:text-buttonSuccess/90 font-bold dark:text-buttonSuccess dark:hover:text-buttonSuccess/90";
    case "danger":
      return "text-buttonDanger hover:text-buttonDanger/90 font-bold dark:text-buttonDanger dark:hover:text-buttonDanger/90";
    case "variant":
      return "text-buttonVariant hover:text-buttonVariant/90 font-bold dark:text-buttonVariant dark:hover:text-buttonVariant/90";
    case "variantSecondary":
      return "text-buttonVariantSecondary hover:text-buttonVariantSecondary/90 font-bold dark:text-buttonVariantSecondary dark:hover:text-buttonVariantSecondary/90";
    case "variantTertiary":
      return "text-buttonVariantTertiary hover:text-buttonVariantTertiary/90 font-bold dark:text-buttonVariantTertiary dark:hover:text-buttonVariantTertiary/90";
    case "default":
      return "text-black hover:underline dark:text-white dark:hover:underline";
    default:
      return "text-buttonPrimary hover:text-buttonPrimary/90 font-bold dark:text-buttonPrimary dark:hover:text-buttonPrimary/90";
  }
});

const handleClick = (event: MouseEvent) => {
  if (props.external) {
    return;
  }
  event.preventDefault();
};
</script>
