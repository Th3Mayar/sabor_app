<template>
  <div class="min-h-screen flex flex-col p-4 content-alert">
    <!-- Loader Global -->
    <div v-if="isLoading" class="global-loader">
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
      <div class="absolute inset-0 bg-black bg-opacity-60 rounded-t-3xl"></div>
    </header>

    <!-- Main Content -->
    <section
      class="flex-grow flex items-center justify-center bg-mainContent py-12 sm:py-10 md:py-16 opacity-0 z-0 text-sm"
      ref="mainSection"
    >
      <div class="bg-background rounded-3xl shadow-lg p-4 w-full max-w-xs sm:max-w-md md:max-w-md sm:text-base">
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
            <label for="email" class="flex items-center text-xs sm:text-sm md:text-base">
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
            <label for="password" class="block flex items-center text-xs sm:text-sm md:text-base">
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
          <Button type="submit" variant="default" class="w-full mt-4 py-2 text-xs sm:text-sm md:text-base">
            Ingresar
          </Button>
        </Form>
        <div class="flex flex-col sm:flex-row text-center mt-4 gap-2 justify-center">
          <Link href="/home" variant="default" class="text-xs sm:text-sm md:text-base">¿Olvidó Contraseña?</Link>
          <Link href="/home" variant="primary" class="text-xs sm:text-sm md:text-base">Recuperar</Link>
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
import { useLoading } from "@/composables/useLoading";
import * as yup from "yup";
import ImageComponent from "@/components/atoms/ImageByName.vue";
import InputComponent from "@/components/atoms/InputField.vue";
import Button from "@/components/atoms/Button.vue";
import Icon from "@/components/atoms/IconByName.vue";
import Link from "@/components/atoms/Link.vue";
import { authenticate } from "~/services/auth/authenticate";
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
const headerImage = ref(null);

const { isLoading, startLoading, stopLoading } = useLoading();
const isAuthenticated = ref(false);

async function handleSubmit(values: { email: string; password: string }) {
  const user: User = {
    email: values.email,
    password: values.password,
  };

  try {
    startLoading();
    showAlert.value = false;

    const minLoaderTime = new Promise<void>((resolve) =>
      setTimeout(resolve, 1000)
    );

    const [response] = await Promise.all([authenticate(user), minLoaderTime]);

    if (response) {
      isAuthenticated.value = true;
      router.push("/reservation");
    }
  } catch (error) {
    alertMessage.value = error as string;
    showAlert.value = true;
  } finally {
    stopLoading();
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
</style>