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
      ref="container"
      class="bg-background/70 rounded-3xl shadow-lg w-full max-w-[400px] z-50 opacity-0 dark:bg-dark-background/80 dark:bg-opacity-80 shadow-background/40 dark:shadow-inner dark:shadow-background/30"
    >
      <div class="flex flex-col justify-center items-center text-center">
        <ImageComponent name="saborApp2" size="150" class="sm:size-150" />
        <Typography
          as="h2"
          variant="poppins"
          color="darkBackground"
          caseType="capital"
          class="font-bold mt-2 text-2xl sm:text-3xl"
          >Restablecer Contraseña</Typography
        >
      </div>
      <Form
        @submit="handleSubmit"
        class="flex flex-col items-center p-5"
        :validation-schema="schema"
        v-slot="{ values, errors }"
      >
        <div class="flex flex-col mb-4 w-full p-2">
          <label for="email" class="flex items-center">
            <Typography
              as="h4"
              variant="poppins"
              color="darkBackground"
              caseType="capital"
              >Correo electrónico</Typography
            >
            <Icon name="Asterisk" size="15" color="red" />
          </label>
          <div class="relative flex justify-center items-center">
            <Icon name="Mail" size="20" class="absolute left-3" />
            <InputComponent
              type="email"
              name="email"
              id="email"
              placeholder="Ingrese su correo"
              class="w-full pl-10 py-2"
              v-model="values.email"
              :class="{ 'border-red-500': errors.password }"
              :hasError="!!errors.email"
            />
          </div>
        </div>
        <Button
          type="submit"
          variant="default"
          size="full"
          class="flex items-center justify-center space-x-2 group relative"
        >
          <Icon
            name="KeyRound"
            size="23"
            color="white"
            class="absolute left-3 top-1/2 transform -translate-y-1/2 text-buttonVariantTertiary group-hover:text-background transition duration-300 ease-in-out font-bold"
          />
          <Typography
            as="p"
            variant="poppins"
            color="darkBackground"
            caseType="capital"
            class="transition duration-300 ease-in-out fixColor"
            >Restablecer</Typography
          >
        </Button>
      </Form>
      <div
        class="flex justify-center sm:justify-end border-t pt-4 gap-3 bg-contentButton p-5 rounded-b-3xl dark:bg-dark-background dark:bg-opacity-90"
      >
        <Typography
          as="h4"
          variant="poppins"
          color="darkBackground"
          caseType="capital"
          >Don't have an account?</Typography
        >
        <Link
          href="/auth/SigIn"
          @click="() => router.push('/auth/SigIn')"
          variant="primary"
          class="underline flex justify-center items-center gap-1 text-buttonPrimary dark:text-dark-buttonPrimary"
        >
          <Typography as="h4" variant="poppins" color="bu" caseType="capital"
            >Sign up now</Typography
          >
          <Icon name="LogIn" size="20" color="buttonPrimary" />
        </Link>
      </div>
    </div>
    <!-- Alert -->
    <Alert
      v-if="showAlert"
      type="error"
      title="Error al restablecer contraseña"
      :content="alertMessage"
      iconColor="white"
      :isVisible="true"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import * as yup from "yup";
import { useAuthStore } from "@/stores/authStore";
import ImageComponent from "@/components/atoms/ImageByName.vue";
import InputComponent from "@/components/atoms/InputField.vue";
import Button from "@/components/atoms/Button.vue";
import Icon from "@/components/atoms/IconByName.vue";
import Link from "@/components/atoms/Link.vue";
import { Form } from "vee-validate";
import Alert from "@/components/atoms/AlertComponent.vue";
import Typography from "@/components/atoms/Typography.vue";

const router = useRouter();
const appName = ref("SaborApp");
const authStore = useAuthStore();
const showAlert = ref(false);
const alertMessage = ref("");
const container = ref(null);

const schema = yup.object({
  email: yup
    .string()
    .email("Debe ser un correo válido")
    .required("Correo es requerido"),
});

const handleSubmit = async (values) => {
  try {
    showAlert.value = false;

    await authStore.requestPasswordResetAction(values.email);
    alertMessage.value =
      "Se ha enviado un enlace de restablecimiento a tu correo";
    showAlert.value = true;
  } catch (error) {
    alertMessage.value = "Error al enviar el correo de restablecimiento";
    showAlert.value = true;
  }
};

onMounted(() => {
  if (container.value) {
    container.value.classList.add("fade-in-slide-down");
  }
});

definePageMeta({
  layout: "homeLayout",
});
</script>

<style>
.bgContent {
  background-image: url("../../../public/images/welcome.svg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  animation: moveBackground 15s infinite linear;
}

.fixColor {
  color: var(--color-textPrimary);
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

@keyframes fadeInSlideDown {
  0% {
    opacity: 0;
    transform: translateY(-50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-slide-down {
  animation: fadeInSlideDown 0.5s ease-out forwards;
}
</style>
