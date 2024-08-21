<template>
  <div>
    <div
      class="absolute left-4 z-50 cursor-pointer text-background ml-5 top-7"
      @click="toggleMenu"
      :isDark="isDark ? 'dark' : 'light'"
    >
      <Icon name="Menu" size="24" class="icon-menu" />
    </div>

    <transition name="slide">
      <nav
        v-if="isMenuVisible"
        class="w-60 bg-dark-background text-background flex flex-col justify-start items-center h-screen py-8 relative"
      >
        <span class="border border-background w-[100%] top-3"></span>

        <!-- Logo -->
        <div class="mb-10 top-5">
          <ImageComponent name="saborApp2" size="200" />
        </div>

        <!-- Navigation Items -->
        <div class="flex flex-col space-y-4 w-full px-4">
          <List variant="default" route="/reservation" @click="reservation">
            <Icon name="PlusCircle" size="24" color="white" class="mr-2" />
            <span>Crear Reserva</span>
          </List>
          <List variant="default" route="/reservation/list" @click="reservationList">
            <Icon name="Search" size="24" color="white" class="mr-2" />
            <span>Mis Reservas</span>
          </List>
          <List variant="default" route="/letter" @click="letter">
            <Icon name="BookOpen" size="24" color="white" class="mr-2" />
            <span>Ver Carta</span>
          </List>
          <List variant="default" route="/settings">
            <Icon name="Settings" size="24" color="white" class="mr-2" />
            <span>Configuración</span>
          </List>
          <List variant="default" route="/auth/login" @click="logout">
            <Icon name="LogOut" size="24" color="white" class="mr-2" />
            <span>Cerrar Sesión</span>
          </List>
        </div>
      </nav>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import Icon from "@/components/atoms/IconByName.vue";
import ImageComponent from "@/components/atoms/ImageByName.vue";
import List from "@/components/molecule/List.vue";

const isMenuVisible = ref(true);
const isDark = ref(false); // Declare the 'isDark' property
const router = useRouter();

const toggleMenu = () => {
  isMenuVisible.value = !isMenuVisible.value;
  const iconMenu = document.querySelector(".icon-menu") as HTMLElement;
  if (!isMenuVisible.value) {
    iconMenu.style.color = "black";
  } else {
    iconMenu.style.color = "white";
  }
};

const logout = () => {
  sessionStorage.removeItem("authToken");
  router.push("/auth/login");
};

const reservation = () => {
  router.push("/reservation");
};

const letter = () => {
  router.push("/letter");
};

const reservationList = () => {
  router.push("/reservation/list");
};
</script>

<style scoped>
nav {
  background-image: url("../../public/images/dropDownMenu.svg");
  backdrop-filter: blur(10px);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  height: calc(100vh - 40px);
  margin-bottom: 0;
  transform: translateX(0);
  transition: transform 0.3s ease-in-out;
}

nav::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  pointer-events: none;
  border-radius: 20px;
  z-index: 1;
}

nav > * {
  position: relative;
  z-index: 2;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
