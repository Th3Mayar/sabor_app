<template>
  <div
    class="min-h-screen flex items-center justify-center p-4 bg-cover bgContent relative"
  >
    <div
      class="absolute inset-0 bg-dark-background bg-opacity-60 dark:bg-dark-background/20"
    ></div>
    <div
      class="bg-background/80 dark:bg-dark-background/80 rounded-3xl shadow-lg w-full max-w-md z-50 dark:shadow-inner dark:shadow-background/30"
      ref="container"
    >
      <div
        class="flex flex-col justify-center items-center text-center mb-6 pl-8 pr-8"
      >
        <ImageComponent name="saborApp2" size="150" />
        <h2
          class="text-3xl font-bold mt-4 text-textPrimary dark:text-dark-textPrimary"
        >
          Iniciar Sesión
        </h2>
        <p class="mt-2 text-textVariant2 dark:text-dark-textPrimary">
          ¡Ingresa a nuestra ventana de login y déjanos llevarte a un viaje
          gastronómico inolvidable en Restaurante <b>{{ name }}!</b>
        </p>
      </div>
      <section class="p-8">
        <form>
          <div class="mb-4">
            <label
              for="username"
              class="block text-textVariant2 dark:text-dark-textPrimary"
              >Nombre de Usuario</label
            >
            <div class="relative">
              <Icon
                name="User"
                size="20"
                color="gray"
                class="absolute left-3 top-1/2 transform -translate-y-1/2"
              />
              <InputComponent
                name="username"
                id="username"
                placeholder="Nombre de Usuario"
                class="w-full pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-buttonPrimary dark:focus:ring-dark-buttonPrimary border-textVariant1 dark:border-dark-textPrimary/20 rounded text-textPrimary dark:text-dark-textPrimary"
              />
            </div>
          </div>
          <div class="mb-4">
            <label
              for="password"
              class="block text-textVariant2 dark:text-dark-textPrimary"
              >Contraseña</label
            >
            <div class="relative">
              <Icon
                name="Lock"
                size="20"
                color="gray"
                class="absolute left-3 top-1/2 transform -translate-y-1/2"
              />
              <InputComponent
                name="password"
                id="password"
                type="password"
                placeholder="Contraseña"
                class="w-full pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-buttonPrimary dark:focus:ring-dark-buttonPrimary border-textVariant1 dark:border-dark-textPrimary/20 rounded text-textPrimary dark:text-dark-textPrimary"
              />
            </div>
          </div>
          <Button
            type="submit"
            variant="default"
            class="w-full mt-6 bg-buttonVariantTertiary dark:bg-dark-buttonVariantTertiary text-background dark:text-dark-background hover:bg-buttonPrimary dark:hover:bg-dark-buttonPrimary py-2 rounded-lg"
          >
            Ingresar
          </Button>
        </form>
      </section>
      <div class="flex justify-end items-end text-sm pr-5">
        <Link
          href="/forgot-password"
          @click="() => router.push('/forgot-password')"
          variant="default"
          class="hover:underline text-textVariant2 dark:text-dark-textPrimary"
        >
          ¿Olvidó su contraseña?
        </Link>
      </div>
      <div
        class="flex justify-between items-center mt-6 border-t p-3 text-sm bg-contentButton dark:bg-dark-contentBackground rounded-b-3xl"
      >
        <Link
          href="/auth/register"
          @click="() => router.push('/auth/register')"
          variant="default"
          class="hover:underline flex items-center gap-2 text-textPrimary dark:text-dark-textPrimary p-2"
        >
          Crea tu cuenta aquí
          <Icon
            name="ArrowRight"
            size="20"
            color="textPrimary dark:text-dark-textPrimary"
          />
        </Link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import ImageComponent from "@/components/atoms/ImageByName.vue";
import InputComponent from "@/components/atoms/InputField.vue";
import Button from "@/components/atoms/Button.vue";
import Icon from "@/components/atoms/IconByName.vue";
import Link from "@/components/atoms/Link.vue";

const name = ref("SaborApp");
const container = ref(null);
const router = useRouter();

onMounted(() => {
  if (container.value) {
    container.value.classList.add("fade-in-slide-left");
  }
});

definePageMeta({
  layout: "authLayout",
});
</script>

<style scoped>
.bgContent {
  background-image: url("../../../public/images/welcome.svg");
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

.fade-in-slide-left {
  animation: fadeInSlideLeft 0.5s ease-out forwards;
}

@keyframes fadeInSlideLeft {
  0% {
    opacity: 0;
    transform: translateX(-50px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
