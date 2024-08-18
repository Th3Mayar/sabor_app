<template>
  <component :is="Tag" :class="classes" tabindex="0" v-bind="otherProps">
    <slot />
  </component>
</template>

<script>
import { computed } from "vue";

const variantClasses = {
  Arial: "font-sans",
  default: "",
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

  // Dark mode colors
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
  h1: "text-3xl lg:text-6xl",
  h2: "text-3xl lg:text-4xl",
  h3: "text-2xl lg:text-3xl",
  h4: "text-xl lg:text-2xl",
  h5: "text-lg lg:text-xl",
  p: "text-base",
};

const caseType = {
  upper: "uppercase",
  lower: "lowercase",
  capital: "capitalize",
  normal: "normal-case",
};

export default {
  name: "TextComponent",
  props: {
    as: {
      type: String,
      default: "p",
    },
    variant: {
      type: String,
      default: "normal",
    },
    color: {
      type: String,
      default: "textPrimary",
    },
    className: {
      type: String,
      default: "",
    },
    caseType: {
      type: String,
      default: "normal",
    },
  },
  setup(props) {
    const classes = computed(() => {
      return [
        variantClasses[props.variant] || variantClasses.default,
        colorClasses[props.color] || colorClasses.textPrimary,
        tagClasses[props.as] || tagClasses.p,
        caseType[props.caseType],
        props.className,
      ].join(" ");
    });

    return {
      Tag: props.as,
      classes,
      otherProps: {
        ...props,
        as: undefined,
        variant: undefined,
        color: undefined,
        className: undefined,
        caseType: undefined,
      },
    };
  },
};
</script>
