<template>
  <div
    class="min-h-screen flex items-center justify-center p-4 bg-cover bgContent relative"
  >
    <div class="absolute inset-0 bg-black bg-opacity-60"></div>
    <div
      ref="container"
      class="bg-background/80 rounded-3xl shadow-lg w-full max-w-[700px] z-50 opacity-0"
    >
      <div class="flex flex-col justify-center items-center text-center">
        <ImageComponent name="saborApp2" size="150" class="sm:size-150" />
        <h2 class="text-2xl sm:text-3xl font-bold mt-4">Registro</h2>
        <p class="mt-2 text-sm sm:text-base text-textVariant2">
          Crea una cuenta en {{ appName }} y disfruta de nuestros servicios.
        </p>
      </div>
      <form
        @submit.prevent="registerUser"
        class="flex flex-col items-center p-3 sm:mt-5"
      >
        <section class="grid grid-cols-1 sm:grid-cols-2 w-full pl-4 pr-4">
          <div class="mb-4">
            <label
              for="full_name"
              class="block text-textVariant2 text-sm sm:text-base"
              >Nombre Completo</label
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
                v-model="user.full_name"
                placeholder="Nombre"
                class="w-[full] pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-buttonPrimary border-textVariant1 rounded text-sm sm:text-base"
                required
              />
            </div>
          </div>
          <div class="mb-4">
            <label
              for="contact_phone"
              class="block text-textVariant2 text-sm sm:text-base"
              >Teléfono de Contacto</label
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
                v-model="user.contact_phone"
                placeholder="Contacto"
                class="w-full pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-buttonPrimary border-textVariant1 rounded text-sm sm:text-base"
              />
            </div>
          </div>
          <div class="mb-4">
            <label
              for="email"
              class="block text-textVariant2 text-sm sm:text-base"
              >Correo Electrónico</label
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
                v-model="user.email"
                placeholder="Correo"
                type="email"
                class="w-full pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-buttonPrimary border-textVariant1 rounded text-sm sm:text-base"
                required
              />
            </div>
          </div>
          <div class="mb-4">
            <label
              for="password"
              class="block text-textVariant2 text-sm sm:text-base"
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
                v-model="user.password"
                placeholder="Contraseña"
                type="password"
                class="w-full pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-buttonPrimary border-textVariant1 rounded text-sm sm:text-base"
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
          <span
            class="group-hover:text-background transition duration-300 ease-in-out"
          >
            Registrarse
          </span>
        </Button>
      </form>
      <div
        class="flex justify-center sm:justify-end border-t pt-4 text-sm sm:text-base bg-contentButton p-5 rounded-b-3xl"
      >
        <Link
          href="/auth/login"
          @click="() => router.push('/auth/login')"
          variant="default"
          class="hover:underline flex gap-2 text-textPrimary"
        >
          ¿Ya tienes una cuenta? Inicia sesión
        </Link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import ImageComponent from "@/components/atoms/ImageByName.vue";
import InputComponent from "@/components/atoms/InputField.vue";
import Button from "@/components/atoms/Button.vue";
import Icon from "@/components/atoms/IconByName.vue";
import Link from "@/components/atoms/Link.vue";

const router = useRouter();

const appName = ref("SaborApp");

const user = ref({
  full_name: "",
  contact_phone: "",
  email: "",
  password: "",
});

const registerUser = async (e) => {
  e.preventDefault();
  console.log(user.value);
};

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
