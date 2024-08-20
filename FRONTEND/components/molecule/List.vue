<template>
  <div :class="listClasses" @click="handleClick">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface ListProps {
  variant?:
    | "default"
    | "secondary"
    | "success"
    | "danger"
    | "variant"
    | "outline"
    | "ghost"
    | "link"
    | "none"
    | "variantSecondary"
    | "variantTertiary"
    | "orange"
    | "tableActionBg";
  active?: boolean;
  disabled?: boolean;
  route?: string;
  onClick?: (event: MouseEvent) => void;
}

const props = defineProps<ListProps>();

const route = useRoute();

const listVariants = {
  variant: {
    default:
      "bg-white/10 text-white hover:bg-white/20 border border-transparent rounded-xl backdrop-blur-md shadow-lg p-4 transition duration-300 ease-in-out transform hover:translate-y-[-2px] hover:shadow-2xl",
    secondary: "bg-buttonSecondary text-white hover:bg-buttonSecondary/90",
    success: "bg-buttonSuccess text-white hover:bg-buttonSuccess/90",
    danger: "bg-buttonDanger text-white hover:bg-buttonDanger/90",
    variant: "bg-buttonVariant text-white hover:bg-buttonVariant/90",
    outline: "border-2 border-gray-300 text-gray-800 hover:border-gray-400",
    ghost: "bg-transparent text-textPrimary hover:bg-mainContent",
    link: "text-buttonPrimary underline-offset-4 hover:underline",
    none: "bg-transparent border-none p-0",
    variantSecondary:
      "bg-buttonVariantSecondary text-white hover:bg-buttonVariantSecondary/90",
    variantTertiary:
      "bg-buttonVariantTertiary text-white hover:bg-buttonVariantTertiary/90",
    orange: "bg-listOption text-white hover:bg-orange/90",
    tableActionBg: "bg-tableActionBg text-white hover:bg-tableActionBg/90",
  },
};

const listClasses = computed(() => {
  const variantClass = listVariants.variant[props.variant || "default"];
  const isActiveRoute = route.path === props.route;
  const activeClass = props.active || isActiveRoute
    ? "bg-buttonPrimary/40 hover:bg-buttonPrimary/50"
    : "";

  return [
    "flex items-center p-4 rounded-lg cursor-pointer transition-colors focus:outline-none",
    variantClass,
    activeClass,
    props.disabled ? "opacity-50 cursor-not-allowed" : "",
  ].join(" ");
});


const handleClick = (event: MouseEvent) => {
  if (!props.disabled && props.onClick) {
    const path = event.view.location.pathname;
    props.onClick(event);
  }
};
</script>
