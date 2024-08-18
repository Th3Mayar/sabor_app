<template>
  <div
    class="relative w-full flex flex-col items-center justify-center bg-cover bgContent h-[100vh]"
  >
    <div class="text-center z-50">
      <h1 class="text-background text-xl md:text-2xl">
        Restaurante de {{ country }}
      </h1>

      <h2 class="text-background md:text-6xl font-bold mt-2">
        {{ name }}
      </h2>

      <!-- Buttons -->
      <div class="mt-8 flex justify-center space-x-4">
        <Button
          variant="default"
          size="xlWide"
          @click="reservation"
          class="bg-gradient-to-r from-buttonVariantSecondary to-buttonPrimary text-background hover:from-buttonPrimary hover:to-buttonVariantSecondary hover:scale-105 hover:shadow-lg transition-all duration-300"
        >
          Reservar
        </Button>

        <Button
          variant="whiteWithOrange"
          size="xlWide"
          @click="viewletter"
          class="hover:scale-105 hover:shadow-lg transition-all duration-300"
          >Ver Carta</Button
        >
      </div>
    </div>

    <div
      class="absolute bottom-4 right-4 z-50 transition-all duration-300 ease-in-out hover:brightness-0 hover:invert"
    >
      <ImageComponent name="saborApp2" size="250" />
    </div>
  </div>
</template>

<script setup>
import Button from "@/components/atoms/Button.vue";
import ImageComponent from "@/components/atoms/ImageByName.vue";
import Typography from "@/components/atoms/Typography.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const country = ref("Pais");
const name = ref("Nombre");

country.value = "Colombia";
name.value = "SaborApp";

const reservation = () => {
  // console.log("View letter");
  router.push("/reservation");
};

const viewletter = () => {
  // console.log("View letter");
  router.push("/letter");
};

definePageMeta({
  layout: "homeLayout",
});
</script>

<style scoped>
.bgContent {
  background-image: url("../public/images/welcome.svg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  animation: moveBackground 15s infinite linear;
}

@keyframes moveBackground {
  0% {
    background-position: center top;
  }
  50% {
    background-position: center bottom;
  }
  100% {
    background-position: center top;
  }
}

.bgContent::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  pointer-events: none;
  z-index: 1;
}

h2 {
  text-shadow: 5px 2px 20px rgba(255, 255, 255, 0.5);
  font-weight: bolder;
  font-size: 150px;
  box-shadow: rgba(0, 0, 0, 0.5) inset;
}
</style>
