<template>
  <div class="base">
    <h1>{{ error }}</h1>
    <h2>{{ title }}</h2>
    <h5>{{ message }}</h5>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  error: number;
  title: string;
  message: string;
}>();
</script>

<style scoped>
body {
  .base {
    width: 100%;
    height: 100vh;
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
        top: -10%;
        right: 34%;
        transform: rotate(180deg);
        font-size: 15vw;
        color: var(--button-primary);
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
      margin: 0;
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
      color: var(--text-variant-3);
      animation-delay: 3s;
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
</style>
