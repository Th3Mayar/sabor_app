<template>
  <button :class="buttonClasses" :disabled="disabled" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface ButtonProps {
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
    | "tableActionBg"
    | "whiteWithOrange";
  size?: "default" | "sm" | "lg" | "icon" | "xl" | "xlWide" | "full" | "wide";
  disabled?: boolean;
  onClick?: (event: MouseEvent) => void;
}

const props = defineProps<ButtonProps>();

const buttonVariants = {
  variant: {
    default: "bg-buttonPrimary text-white hover:bg-buttonPrimary/90",
    secondary: "bg-buttonSecondary text-white hover:bg-buttonSecondary/90",
    success: "bg-buttonSuccess text-white hover:bg-buttonSuccess/90",
    danger: "bg-buttonDanger text-white hover:bg-buttonDanger/90",
    variant: "bg-buttonVariant text-white hover:bg-buttonVariant/90",
    outline: "border-2 border-gray-300 text-gray-800 hover:border-gray-400",
    ghost: "bg-transparent text-textPrimary hover:bg-gray-200",
    link: "text-buttonPrimary underline-offset-4 hover:underline",
    none: "bg-transparent border-none p-0",
    variantSecondary:
      "bg-buttonVariantSecondary text-white hover:bg-buttonVariantSecondary/90",
    variantTertiary:
      "bg-buttonVariantTertiary text-white hover:bg-buttonVariantTertiary/90",
    orange: "bg-orange text-white hover:bg-orange/90",
    tableActionBg: "bg-tableActionBg text-white hover:bg-tableActionBg/90",
    whiteWithOrange:
  "bg-background text-buttonPrimary border border-orange hover:bg-tableActionBg/40 hover:text-white hover:border-background transition-all duration-300 ease-in-out",
  },
  size: {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3",
    lg: "h-11 px-8",
    icon: "w-10 h-10 inline-flex items-center justify-center",
    xl: "h-12 px-10",        
    xlWide: "h-12 px-16",       
    full: "h-11 w-full px-4",       
    wide: "h-11 px-20",             
  },
};

const buttonClasses = computed(() => {
  const variantClass = buttonVariants.variant[props.variant || "default"];
  const sizeClass = buttonVariants.size[props.size || "default"];

  return [
    "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    "rounded-[30px]", // Corner radius de 30px
    variantClass,
    sizeClass,
    'dark:bg-dark-buttonPrimary dark:text-dark-textPrimary',
  ];
});

const handleClick = (event: MouseEvent) => {
  // event.preventDefault();
  if (props.onClick) {
    props.onClick(event);
  }
};
</script>
