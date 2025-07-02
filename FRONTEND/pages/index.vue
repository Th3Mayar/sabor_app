<template>
  <div
    class="relative w-full flex flex-col items-center justify-center bg-cover bgContent min-h-screen"
  >
    <!-- Center Content -->
    <div class="text-center z-50 p-4">
      <h1
        ref="title"
        class="text-background text-xl sm:text-2xl md:text-3xl lg:text-4xl"
      >
        Restaurante de {{ country }}
      </h1>

      <h2
        ref="subtitle"
        class="text-background text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mt-2"
      >
        {{ name }}
      </h2>

      <!-- Main Buttons -->
      <div
        class="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
      >
        <Button
          variant="default"
          size="xlWide"
          @click="reservation"
          class="bg-gradient-to-r from-buttonVariantSecondary/60 to-buttonPrimary text-background hover:from-buttonPrimary hover:to-buttonVariantSecondary hover:scale-105 hover:shadow-lg transition-all duration-300"
        >
          Reservar
        </Button>

        <Button
          variant="whiteWithOrange"
          size="xlWide"
          @click="viewletter"
          class="hover:scale-105 hover:shadow-lg transition-all duration-300"
        >
          Ver Carta
        </Button>
      </div>
    </div>

    <!-- Bottom Right Image -->
    <div
      class="absolute bottom-4 right-4 z-50 transition-all duration-300 transform hover:scale-105 w-[150px] sm:w-[200px] md:w-[250px]"
    >
      <ImageComponent name="saborApp2" />
    </div>
  </div>
</template>

<script setup>
import Button from "@/components/atoms/Button.vue";
import ImageComponent from "@/components/atoms/ImageByName.vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const country = ref("Pais");
const name = ref("Nombre");
const validationToken = ref(false);

onMounted(() => {
  const token = localStorage.getItem("token");
  validationToken.value = token !== null;

  subtitle.value.classList.add("zoom-bounce");
});

const title = ref(null);
const subtitle = ref(null);

country.value = "Colombia";
name.value = "SaborApp";

const reservation = () => {
  // if (!validationToken.value) return router.push("/auth/register");
  router.push("/reservation");
};

const viewletter = () => {
  // if (!validationToken.value) return router.push("/auth/register");
  router.push("/letter");
};

const register = () => {
  if (localStorage.getItem("token") === null) {
    router.push("/auth/register");
  } else {
    router.push("/auth/register");
  }
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
  min-height: 100vh;
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

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

@keyframes pulse-active {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.animate-pulse {
  animation: pulse 2s infinite;
}

.focus\:animate-pulse-active {
  animation: pulse-active 0.5s forwards;
}

@keyframes zoomBounce {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  70% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateX(-5px);
  }
  20%,
  40%,
  60%,
  80% {
    transform: translateX(5px);
  }
}

.zoom-bounce {
  animation: zoomBounce 0.6s ease-out forwards, shake 0.6s ease-in-out 0.6s;
}

h2 {
  text-shadow: 5px 2px 20px rgba(255, 255, 255, 0.5);
  font-weight: bolder;
  font-size: 10vw;
  box-shadow: rgba(0, 0, 0, 0.5) inset;
}
</style>
