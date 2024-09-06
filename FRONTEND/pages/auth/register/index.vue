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
      class="bg-background/70 rounded-3xl shadow-lg w-full max-w-[700px] z-50 opacity-0 dark:bg-dark-background/80 dark:bg-opacity-80 shadow-background/40 dark:shadow-inner dark:shadow-background/30"
    >
      <div class="flex flex-col justify-center items-center text-center">
        <ImageComponent name="saborApp2" size="150" class="sm:size-150" />
        <Typography
          as="h0"
          variant="poppins"
          color="darkBackground"
          caseType="capital"
          class="font-bold mt-2 text-2xl sm:text-3xl"
          >Registro</Typography
        >
        <Typography
          as="p"
          variant="poppins"
          color="darkBackground"
          caseType="capital"
          class="mt-2 text-textVariant2"
          >Crea una cuenta en {{ appName }} y disfruta de nuestros
          servicios.</Typography
        >
      </div>
      <Form
        @submit="handleSubmit"
        class="flex flex-col items-center p-3 sm:mt-5"
        :validation-schema="schema"
        v-slot="{ values, errors }"
      >
        <section class="grid grid-cols-1 sm:grid-cols-2 w-full pl-4 pr-4">
          <div class="mb-2">
            <label
              for="full_name"
              class="block text-textVariant2 text-sm sm:text-base"
            >
              <Typography
                as="h4"
                variant="poppins"
                color="darkBackground"
                caseType="capital"
                >Nombre Completo</Typography
              ></label
            >
            <div class="relative">
              <Icon
                name="User"
                size="20"
                color="gray"
                class="absolute left-3 top-1/2 transform -translate-y-1/2"
              />
              <InputComponent
                name="full_name"
                id="full_name"
                v-model="values.full_name"
                placeholder="Nombre"
                class="w-[full] pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-buttonPrimary border-textVariant1 rounded text-sm sm:text-base"
                required
                :class="{ 'border-red-500': errors.full_name }"
                :hasError="!!errors.full_name"
              />
            </div>
          </div>
          <div class="mb-2">
            <label
              for="contact_phone"
              class="block text-textVariant2 text-sm sm:text-base"
            >
              <Typography
                as="h4"
                variant="poppins"
                color="darkBackground"
                caseType="capital"
                >Teléfono de Contacto</Typography
              ></label
            >
            <div class="relative">
              <Icon
                name="Phone"
                size="20"
                color="gray"
                class="absolute left-3 top-1/2 transform -translate-y-1/2"
              />
              <InputComponent
                name="contact_phone"
                id="contact_phone"
                v-model="values.contact_phone"
                placeholder="Contacto"
                class="w-full pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-buttonPrimary border-textVariant1 rounded text-sm sm:text-base"
                :class="{ 'border-red-500': errors.contact_phone }"
                :hasError="!!errors.contact_phone"
              />
            </div>
          </div>
          <div class="mb-2">
            <label
              for="email"
              class="block text-textVariant2 text-sm sm:text-base"
              ><Typography
                as="h4"
                variant="poppins"
                color="darkBackground"
                caseType="capital"
                >Correo Electrónico</Typography
              ></label
            >
            <div class="relative">
              <Icon
                name="Mail"
                size="20"
                color="gray"
                class="absolute left-3 top-1/2 transform -translate-y-1/2"
              />
              <InputComponent
                name="email"
                id="email"
                v-model="values.email"
                placeholder="Correo"
                type="email"
                class="w-full pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-buttonPrimary border-textVariant1 rounded text-sm sm:text-base"
                required
                :class="{ 'border-red-500': errors.email }"
                :hasError="!!errors.email"
              />
            </div>
          </div>
          <div class="mb-2">
            <label
              for="password"
              class="block text-textVariant2 text-sm sm:text-base"
              ><Typography
                as="h4"
                variant="poppins"
                color="darkBackground"
                caseType="capital"
                >Contraseña</Typography
              ></label
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
                v-model="values.password"
                placeholder="Contraseña"
                type="password"
                class="w-full pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-buttonPrimary border-textVariant1 rounded text-sm sm:text-base"
                :class="{ 'border-red-500': errors.password }"
                :hasError="!!errors.password"
                required
              />
            </div>
          </div>
        </section>
        <Button
          type="submit"
          variant="default"
          size="full"
          class="max-w-[500px] flex items-center justify-center space-x-2 group relative"
        >
          <Icon
            name="User"
            size="23"
            color="white"
            class="absolute left-3 top-1/2 transform -translate-y-1/2 text-buttonVariantTertiary group-hover:text-background transition duration-300 ease-in-out font-bold"
          />
          <Typography
            as="h4"
            variant="poppins"
            color="buttonPrimary"
            caseType="capital"
            class="group-hover:text-background transition duration-300 ease-in-out"
            >Registrarse</Typography
          >
        </Button>
      </Form>
      <div
        class="flex justify-center sm:justify-end border-t pt-4 text-sm sm:text-base bg-contentButton p-5 rounded-b-3xl dark:bg-dark-background dark:bg-opacity-90"
      >
        <Link
          href="/auth/SigIn"
          @click="() => router.push('/auth/SigIn')"
          variant="default"
          class="flex gap-2 text-textPrimary"
        >
          ¿Ya tienes una cuenta?
          <b>Inicia sesión</b>
        </Link>
      </div>
    </div>
    <!-- Alert -->
    <Alert
      v-if="showAlert"
      type="error"
      title="Error en el registro"
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

const router = useRouter();
const appName = ref("SaborApp");
const authStore = useAuthStore();
const showAlert = ref(false);
const alertMessage = ref("");

const schema = yup.object({
  full_name: yup.string().required("El nombre es obligatorio"),
  contact_phone: yup.string().required("El teléfono es obligatorio"),
  email: yup
    .string()
    .required("El correo electrónico es obligatorio")
    .email("Debe ser un correo válido"),
  password: yup.string().required("La contraseña es obligatoria"),
});

async function handleSubmit(values) {
  try {
    showAlert.value = false;

    // Register user and get token
    const token = await authStore.register({
      full_name: values.full_name,
      contact_phone: values.contact_phone,
      email: values.email,
      password: values.password,
      role_id: 4,
    });

    console.log("Token recibido:", token);

    // Redirect to reservation page
    router.push("/reservation");
  } catch (error) {
    alertMessage.value = error.message || "Error en el registro";
    showAlert.value = true;
  }
}

const container = ref(null);

onMounted(() => {
  if (container.value) {
    container.value.classList.add("fade-in-slide-down");
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

/* Animation to Button Register */
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
  color: white;
}
/* End animation */
</style>
