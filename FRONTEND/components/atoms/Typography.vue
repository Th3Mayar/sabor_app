<template>
  <component :is="Tag" :class="classes" tabindex="0" v-bind="otherProps">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface TypographyProps {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "p" | "div" | "span" | "sm" | "md" | "lg" | "h0";
  variant?: "Arial" | "poppins" | "default";
  color?: keyof typeof colorClasses;
  className?: string;
  caseType?: "upper" | "lower" | "capital" | "normal";
}

const variantClasses = {
  Arial: "font-sans",
  poppins: "poppins",
  default: "poppins",
};

const colorClasses = {
  background: "text-background dark:text-dark-background",
  darkBackground: "text-dark-background dark:text-background",
  mainContent: "text-mainContent dark:text-dark-mainContent",
  buttonPrimary: "text-buttonPrimary dark:text-dark-buttonPrimary",
  buttonSecondary: "text-buttonSecondary dark:text-dark-buttonSecondary",
  dropdownButton: "text-dropdownButton dark:text-dark-dropdownButton",
  contentBackground: "text-contentBackground dark:text-dark-contentBackground",
  buttonVariant: "text-buttonVariant dark:text-dark-textPrimary",
  buttonSuccess: "text-buttonSuccess dark:text-dark-alertSuccessBg",
  buttonDanger: "text-buttonDanger dark:text-dark-alertErrorBg",
  textVariant1: "text-textVariant1 dark:text-dark-alertInfoBg",
  textVariant2: "text-textVariant2 dark:text-dark-alertWarningBg",
  textPrimary: "text-textPrimary dark:text-dark-shadow",
  alertSuccessBg: "text-alertSuccessBg",
  alertSuccessEffect: "text-alertSuccessEffect",
  alertErrorBg: "text-alertErrorBg",
  alertErrorEffect: "text-alertErrorEffect",
  alertInfoBg: "text-alertInfoBg",
  alertInfoEffect: "text-alertInfoEffect",
  alertWarningBg: "text-alertWarningBg",
  alertWarningEffect: "text-alertWarningEffect",
  shadow: "text-shadow",
  listOption: "text-listOption",
  listOptionEffect: "text-listOptionEffect",
  orderSuccessBg: "text-orderSuccessBg",
  tableCellBg: "text-tableCellBg",
  stateOptionBg: "text-stateOptionBg",
  tableActionBg: "text-tableActionBg",
  buttonVariantSecondary: "text-buttonVariantSecondary",
  textVariant3: "text-textVariant3",
  textVariant4: "text-textVariant4",
  stateVariant: "text-stateVariant",
  buttonVariantTertiary: "text-buttonVariantTertiary",
};

const tagClasses = {
  sm: "text-sm",
  md: "text-2xl",
  lg: "text-4xl",
  h0: "text-3xl",
  h1: "text-2xl",
  h2: "text-xl",
  h3: "text-lg",
  h4: "text-base",
  h5: "text-sm",
  p: "text-base",
  div: "text-xs",
  span: "text-md",
};

const caseTypeClasses = {
  upper: "uppercase",
  lower: "lowercase",
  capital: "capitalize",
  normal: "normal-case",
};

const props = defineProps<TypographyProps>();

const classes = computed(() => {
  const variantClass = variantClasses[props.variant || "default"];
  const colorClass = colorClasses[props.color || "textPrimary"];
  const tagClass = tagClasses[props.as || "p"];
  const caseTypeClass = caseTypeClasses[props.caseType || "normal"];

  return [
    variantClass,
    colorClass,
    tagClass,
    caseTypeClass,
    props.className || "",
  ].join(" ");
});

const otherProps = computed(() => {
  const { as, variant, color, className, caseType, ...rest } = props;
  return rest;
});

const Tag = props.as || "p";
</script>
