<template>
  <div class="base">
    <h1>{{ error }}</h1>
    <h2>{{ title }}</h2>
    <h5>{{ message }}</h5>
    <Button
      type="submit"
      variant="whiteWithOrange"
      class="mt-5 w-32 animationReboot"
      @click="loginPage"
    >
      Go Back <Icon name="ArrowLeft" size="24" />
    </Button>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import Button from "@/components/atoms/Button.vue";
import Icon from "@/components/atoms/IconByName.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps<{
  error: string;
  title: string;
  message: string;
}>();

const loginPage = () => {
  router.push("auth/login");
};
</script>

<style scoped>
body {
  .base {
    width: 100%;
    height: 90vh;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-direction: column;

    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    h1 {
      -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
      font-family: "Ubuntu", sans-serif;
      text-transform: uppercase;
      text-align: center;
      font-size: 20vw;
      display: block;
      margin: 0;
      color: var(--alert-info-bg);
      position: relative;
      z-index: 0;
      animation: colors 0.4s ease-in-out forwards;
      animation-delay: 1.7s;
      &:before {
        content: "U";
        position: absolute;
        top: -15%;
        right: 34%;
        transform: rotate(180deg);
        font-size: 15.05vw;
        color: var(--alertWarningBg);
        z-index: -1;
        text-align: center;
        animation: lock 0.2s ease-in-out forwards;
        animation-delay: 1.5s;
      }
    }
    h2 {
      font-family: "Cabin", sans-serif;
      color: var(--button-primary);
      font-size: 5vw;
      margin-top: -100px;
      text-transform: uppercase;
      text-align: center;
      animation: colors 0.4s ease-in-out forwards;
      animation-delay: 2s;
      -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    }
    h5 {
      font-family: "Cabin", sans-serif;
      color: var(--button-primary);
      font-size: 2vw;
      margin: 0;
      text-align: center;
      opacity: 0;
      animation: show 2s ease-in-out forwards;
      color: var(--state-variant);
      animation-delay: 2s;
      -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    }
  }
}

@keyframes lock {
  50% {
    top: -4%;
  }
  100% {
    top: -6%;
  }
}

@keyframes colors {
  50% {
    transform: scale(1.1);
  }
  100% {
    color: var(--button-primary);
  }
}

@keyframes show {
  100% {
    opacity: 1;
  }
}

.animationReboot {
  animation: reboot 1s ease-in-out infinite;
}

@keyframes reboot {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
