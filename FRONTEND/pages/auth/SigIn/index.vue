<template>
  <div
    class="min-h-screen flex items-center justify-center p-4 bg-cover bgContent relative"
  >
    <!-- Loader Global -->
    <div v-if="authStore.isLoading" class="global-loader">
      <span></span>
    </div>
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
        <Form
          @submit="handleSubmit"
          :validation-schema="schema"
          v-slot="{ values, errors }"
        >
          <div class="mb-4">
            <label
              for="username"
              class="block text-textVariant2 dark:text-dark-textPrimary"
              >Correo Electrónico</label
            >
            <div class="relative">
              <Icon
                name="User"
                size="20"
                class="absolute left-3 top-1/2 transform -translate-y-1/2"
              />
              <InputComponent
                type="email"
                name="email"
                id="email"
                placeholder="Correo electrónico"
                v-model="values.email"
                class="w-full pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-buttonPrimary dark:focus:ring-dark-buttonPrimary border-textVariant1 dark:border-dark-textPrimary/20 rounded text-textPrimary dark:text-dark-textPrimary"
                :class="{ 'border-red-500': errors.email }"
                :hasError="!!errors.email"
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
                class="absolute left-3 top-1/2 transform -translate-y-1/2"
              />
              <InputComponent
                name="password"
                id="password"
                type="password"
                placeholder="Contraseña"
                v-model="values.password"
                class="w-full pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-buttonPrimary dark:focus:ring-dark-buttonPrimary border-textVariant1 dark:border-dark-textPrimary/20 rounded text-textPrimary dark:text-dark-textPrimary"
                :class="{ 'border-red-500': errors.password }"
                :hasError="!!errors.password"
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
          <Icon name="ArrowRight" size="20" />
        </Link>
      </div>
    </div>
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
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/authStore";
import * as yup from "yup";
import ImageComponent from "@/components/atoms/ImageByName.vue";
import InputComponent from "@/components/atoms/InputField.vue";
import Button from "@/components/atoms/Button.vue";
import Icon from "@/components/atoms/IconByName.vue";
import Link from "@/components/atoms/Link.vue";
import { Form } from "vee-validate";
import Alert from "@/components/atoms/AlertComponent.vue";

const name = ref("SaborApp");
const container = ref(null);
const router = useRouter();
const showAlert = ref(false);
const alertMessage = ref("");
const iconMove = ref(false);
const authStore = useAuthStore();

const schema = yup.object({
  email: yup.string().required("El correo electrónico es obligatorio"),
  password: yup.string().required("La contraseña es obligatoria"),
});

async function handleSubmit(values: { email: string; password: string }) {
  try {
    iconMove.value = true; // Activate icon animation
    showAlert.value = false;

    await authStore.login({ email: values.email, password: values.password });
    router.push("/reservation");
  } catch (error) {
    alertMessage.value = error as string;
    showAlert.value = true;
    iconMove.value = false; // Deactivate icon animation
  }
}

onMounted(() => {
  if (container.value) {
    container.value.classList.add("fade-in-slide-left");
  }
});

definePageMeta({
  layout: "auth-layout",
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
