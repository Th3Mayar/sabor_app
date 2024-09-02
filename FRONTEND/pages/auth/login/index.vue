<template>
  <div
    class="min-h-screen flex flex-col p-4 content-alert dark:bg-dark-bg-primary/80"
  >
    <!-- Loader Global -->
    <div v-if="authStore.isLoading" class="global-loader">
      <span></span>
    </div>

    <!-- Header -->
    <header class="relative w-full z-50">
      <div class="overflow-hidden rounded-t-3xl">
        <ImageComponent
          ref="headerImage"
          name="welcome"
          class="w-full h-40 sm:h-48 md:h-40 object-cover rounded-t-3xl"
        />
      </div>
      <div
        class="absolute inset-0 bg-dark-background bg-opacity-70 rounded-t-3xl"
      ></div>
    </header>

    <!-- Main Content -->
    <section
      class="flex-grow flex items-center justify-center bg-mainContent py-12 sm:py-10 md:py-16 opacity-0 z-0 text-sm dark:bg-dark-background/50 dark:bg-opacity-90"
      ref="mainSection"
    >
      <div
        class="bg-background rounded-3xl shadow-lg p-4 w-full max-w-xs sm:max-w-md md:max-w-md sm:text-base dark:bg-dark-background/70 dark:bg-opacity-90 dark:shadow-inner dark:shadow-background/30"
      >
        <div class="flex flex-col justify-center items-center text-center mb-5">
          <ImageComponent name="saborApp2" size="150" class="sm:size-200" />
          <h2 class="text-xl sm:text-2xl font-semibold mt-4">Bienvenido</h2>
        </div>
        <Form
          @submit="handleSubmit"
          :validation-schema="schema"
          v-slot="{ values, errors }"
        >
          <div class="mb-4">
            <label
              for="email"
              class="flex items-center text-xs sm:text-sm md:text-base"
            >
              Correo electrónico
              <Icon name="Asterisk" size="15" color="red" />
            </label>
            <div class="relative flex justify-center items-center">
              <Icon name="User" size="20" class="absolute left-3" />
              <InputComponent
                type="email"
                name="email"
                id="email"
                placeholder="Correo electrónico"
                class="w-full pl-10 py-2 text-xs sm:text-sm md:text-base"
                v-model="values.email"
              />
            </div>
          </div>
          <div class="mb-4">
            <label
              for="password"
              class="block flex items-center text-xs sm:text-sm md:text-base"
            >
              Contraseña
              <Icon name="Asterisk" size="15" color="red" />
            </label>
            <div class="relative flex justify-center items-center">
              <Icon name="Lock" size="20" class="absolute left-3" />
              <InputComponent
                name="password"
                id="password"
                type="password"
                placeholder="Contraseña"
                class="w-full pl-10 py-2 text-xs sm:text-sm md:text-base"
                v-model="values.password"
              />
            </div>
          </div>
          <Button
            type="submit"
            variant="default"
            size="full"
            class="max-w-[500px] flex items-center justify-center space-x-2 group relative overflow-hidden"
          >
            <Icon
              name="LogIn"
              size="23"
              color="white"
              class="transform transition-transform duration-500 ease-in-out mr-4"
              :class="{
                'translate-x-full': iconMove,
                '-translate-x-0': !iconMove,
              }"
            />
            <span class="transition duration-300 ease-in-out ml-8">
              Ingresar
            </span>
          </Button>
        </Form>
        <div
          class="flex flex-col sm:flex-row text-center mt-4 gap-2 justify-center"
        >
          <Link
            href="/home"
            variant="default"
            class="text-xs sm:text-sm md:text-base"
            >¿Olvidó Contraseña?</Link
          >
          <Link
            href="/home"
            variant="primary"
            class="text-xs sm:text-sm md:text-base"
            >Recuperar</Link
          >
        </div>
      </div>
    </section>

    <!-- Footer -->
    <Alert
      v-if="showAlert"
      type="error"
      title="Error al iniciar sesión"
      :content="alertMessage"
      iconColor="white"
      :isVisible="true"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore"; // Pinia store import
import * as yup from "yup";
import ImageComponent from "@/components/atoms/ImageByName.vue";
import InputComponent from "@/components/atoms/InputField.vue";
import Button from "@/components/atoms/Button.vue";
import Icon from "@/components/atoms/IconByName.vue";
import Link from "@/components/atoms/Link.vue";
import { Form } from "vee-validate";
import Alert from "@/components/atoms/AlertComponent.vue";

const schema = yup.object({
  email: yup.string().required("El correo electrónico es obligatorio"),
  password: yup.string().required("La contraseña es obligatoria"),
});

const router = useRouter();
const showAlert = ref(false);
const alertMessage = ref("");
const headerImage = ref(null);
const iconMove = ref(false);
const authStore = useAuthStore();

async function handleSubmit(values: { email: string; password: string }) {
  try {
    iconMove.value = true; // Activar animación de ícono
    showAlert.value = false;

    await authStore.login({ email: values.email, password: values.password });
    router.push("/reservation");
  } catch (error) {
    alertMessage.value = error as string;
    showAlert.value = true;
    iconMove.value = false; // Revertir animación de ícono en caso de error
  }
}

const mainSection = ref(null);

onMounted(() => {
  if (mainSection.value) {
    mainSection.value.classList.add("slide-down-fade-in");
  }
});

definePageMeta({
  layout: "auth-layout",
  middleware: "auth",
});
</script>

<style scoped>
@keyframes slideDownFadeIn {
  0% {
    opacity: 0;
    transform: translateY(-50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-down-fade-in {
  animation: slideDownFadeIn 0.6s ease-out forwards;
}

/* BEGIN ANIMATION TO BUTTON LOGIN */
@keyframes moveRight {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(5px);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes rotateIcon {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.group:hover .absolute {
  animation: moveRight 0.5s ease-in-out infinite;
}

.group:active .absolute {
  animation: rotateIcon 0.5s ease-in-out;
  color: var(--theme-color);
}
/* END ANIMATION */

/* ANIMATION TO SUCCESS REQUEST */

.translate-x-full {
  transform: translateX(100%);
}

.-translate-x-0 {
  transform: translateX(0);
}

@keyframes moveRight {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(10%);
  }
}

@keyframes moveLeft {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}

.group:active .translate-x-full {
  animation: moveRight 0.5s ease-in-out forwards;
}

.group.error .translate-x-full {
  animation: moveLeft 0.5s ease-in-out forwards;
}

/* END ANIMATION */
</style>
