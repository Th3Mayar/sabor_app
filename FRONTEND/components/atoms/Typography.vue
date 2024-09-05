<template>
  <component :is="Tag" :class="classes" tabindex="0" v-bind="otherProps">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface TypographyProps {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "p" | "div" | "span";
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
  background: "text-background",
  mainContent: "text-mainContent",
  buttonPrimary: "text-buttonPrimary",
  buttonSecondary: "text-buttonSecondary",
  dropdownButton: "text-dropdownButton",
  contentBackground: "text-contentBackground",
  buttonVariant: "text-buttonVariant",
  buttonSuccess: "text-buttonSuccess",
  buttonDanger: "text-buttonDanger",
  textVariant1: "text-textVariant1",
  textVariant2: "text-textVariant2",
  textPrimary: "text-textPrimary",
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

  darkBackground: "text-dark-background",
  darkMainContent: "text-dark-mainContent",
  darkButtonPrimary: "text-dark-buttonPrimary",
  darkButtonSecondary: "text-dark-buttonSecondary",
  darkDropdownButton: "text-dark-dropdownButton",
  darkContentBackground: "text-dark-contentBackground",
  darkTextPrimary: "text-dark-textPrimary",
  darkAlertSuccessBg: "text-dark-alertSuccessBg",
  darkAlertErrorBg: "text-dark-alertErrorBg",
  darkAlertInfoBg: "text-dark-alertInfoBg",
  darkAlertWarningBg: "text-dark-alertWarningBg",
  darkShadow: "text-dark-shadow",
};

const tagClasses = {
  h1: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl",
  h2: "text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl",
  h3: "text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl",
  h4: "text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl",
  h5: "text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl",
  p: "text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl",
  div: "text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl",
  span: "text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl",
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
