<template>
  <div class="min-h-screen flex flex-col p-4 content-alert">
    <div v-if="isLoading" class="loader">
      <span></span>
    </div>

    <!-- Header -->
    <header class="relative w-full">
      <div class="overflow-hidden rounded-t-3xl">
        <ImageComponent
          name="welcome"
          class="w-full h-44 object-cover rounded-t-3xl"
        />
      </div>
      <div class="absolute inset-0 bg-black bg-opacity-60 rounded-t-3xl"></div>
    </header>

    <!-- Main Content -->
    <section
      class="flex-grow flex items-center justify-center bg-mainContent py-12"
    >
      <div class="bg-background rounded-3xl shadow-lg p-4 w-full max-w-md">
        <div class="flex flex-col justify-center items-center text-center mb-6">
          <ImageComponent name="saborApp2" size="200" />
          <h2 class="text-2xl font-semibold mt-4">Bienvenido</h2>
        </div>
        <Form
          @submit="handleSubmit"
          :validation-schema="schema"
          v-slot="{ values, errors }"
        >
          <div class="mb-4">
            <label for="email" class="block">Correo electrónico</label>
            <div class="relative flex justify-center items-center">
              <Icon
                name="User"
                size="20"
                color="gray"
                class="absolute left-3"
              />
              <InputComponent
                type="email"
                name="email"
                id="email"
                placeholder="Correo electrónico"
                class="w-full pl-10"
                v-model="values.email"
              />
            </div>
          </div>
          <div class="mb-4">
            <label for="password" class="block">Contraseña</label>
            <div class="relative flex justify-center items-center">
              <Icon
                name="Lock"
                size="20"
                color="gray"
                class="absolute left-3"
              />
              <InputComponent
                name="password"
                id="password"
                type="password"
                placeholder="Contraseña"
                class="w-full pl-10"
                v-model="values.password"
              />
            </div>
          </div>
          <Button type="submit" variant="default" class="w-full mt-4">
            Ingresar
          </Button>
        </Form>
        <div class="flex flex-row text-center mt-4 gap-2 justify-center">
          <Link href="/home" variant="default">¿Olvidó Contraseña?</Link>
          <Link href="/home" variant="primary">Recuperar</Link>
        </div>
      </div>
    </section>

    <!-- Mostrar alerta en caso de error -->
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import * as yup from "yup";
import ImageComponent from "@/components/atoms/ImageByName.vue";
import InputComponent from "@/components/atoms/InputField.vue";
import Button from "@/components/atoms/Button.vue";
import Icon from "@/components/atoms/IconByName.vue";
import Link from "@/components/atoms/Link.vue";
import { autenticate } from "@/services/auth/autenticate";
import { Form } from "vee-validate";
import Alert from "@/components/atoms/AlertComponent.vue";
import User from "@/types/User";

const schema = yup.object({
  email: yup.string().required("El correo electrónico es obligatorio"),
  password: yup.string().required("La contraseña es obligatoria"),
});

const router = useRouter();
const showAlert = ref(false);
const alertMessage = ref("");
const isLoading = ref(false);

async function handleSubmit(values: { email: string; password: string }) {
  const user: User = {
    email: values.email,
    password: values.password,
  };

  try {
    isLoading.value = true; // View loader
    const response = await autenticate(user);
    console.log(response);
    if (response) {
      router.push("/reservation");
    }
  } catch (error) {
    showAlert.value = true;
    alertMessage.value = error as string;
  } finally {
    isLoading.value = false; // Hidde loader
  }
}

definePageMeta({
  layout: "authLayout",
});
</script>

<style scoped>
.loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.loader span {
  height: 80px;
  aspect-ratio: 1;
  display: grid;
}

.loader span:before,
.loader span:after {
  content: "";
  --c: no-repeat linear-gradient(var(--button-primary) 0 0);
  background: var(--c), var(--c);
  background-size: 25% 50%;
  animation: l5 1.5s infinite linear;
}

.loader span:after {
  transform: scale(-1);
}

@keyframes l5 {
  0%,
  5% {
    background-position: 33.4% 100%, 66.6% 100%;
  }
  25% {
    background-position: 33.4% 100%, 100% 0;
  }
  50% {
    background-position: 0 0, 100% 0;
  }
  75% {
    background-position: 0 0, 66.6% 100%;
  }
  95%,
  100% {
    background-position: 33.4% 100%, 66.6% 100%;
  }
}
</style>
