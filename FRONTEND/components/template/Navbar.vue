<template>
  <div>
    <!-- Toggle button, visible only on mobile -->
    <div
      class="absolute left-4 z-50 cursor-pointer text-dark-background ml-5 top-5 lg:hidden toggle"
      @click="toggleMenu"
      :isDark="isDark ? 'dark' : 'light'"
    >
      <Icon name="Menu" size="24" class="icon-menu" />
    </div>

    <!-- Navigation Menu -->
    <transition name="slide">
      <nav
        v-if="isMenuVisible"
        ref="menu"
        class="w-60 bg-dark-background text-background flex flex-col justify-start items-center h-screen py-8 fixed top-0 left-0 lg:relative"
      >
        <span class="border border-background top-5 w-full"></span>

        <!-- Logo -->
        <div class="mb-10 top-5 justify-center flex">
          <ImageComponent name="saborApp2" size="200" />
        </div>

        <!-- Navigation Items -->
        <div class="flex flex-col space-y-4 w-full px-4">
          <List
            variant="default"
            route="/reservation"
            @click="navigateTo('/reservation')"
          >
            <Icon name="PlusCircle" size="24" color="white" class="mr-2" />
            <span>Crear Reserva</span>
          </List>
          <List
            variant="default"
            route="/reservation/list"
            @click="navigateTo('/reservation/list')"
          >
            <Icon name="Search" size="24" color="white" class="mr-2" />
            <span>Mis Reservas</span>
          </List>
          <List
            variant="default"
            route="/letter"
            @click="navigateTo('/letter')"
          >
            <Icon name="BookOpen" size="24" color="white" class="mr-2" />
            <span>Ver Carta</span>
          </List>
          <List
            variant="default"
            route="/settings"
            @click="navigateTo('/settings')"
          >
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
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import Icon from "@/components/atoms/IconByName.vue";
import ImageComponent from "@/components/atoms/ImageByName.vue";
import List from "@/components/molecule/List.vue";

const isMenuVisible = ref(window.innerWidth >= 1024); // Initialized when is mobile
const isDark = ref(false);
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

const handleResize = () => {
  if (window.innerWidth >= 1024) {
    isMenuVisible.value = true; // Allays visible on desktop
  } else {
    isMenuVisible.value = false; // Hidden on mobile
  }
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
  handleResize(); // Initialize the menu visibility
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});

const navigateTo = (route: string) => {
  if (window.innerWidth < 1024) {
    isMenuVisible.value = false; // Close the menu on mobile
  }
  router.push(route);
};

const logout = () => {
  sessionStorage.removeItem("authToken");
  router.push("/auth/login");
};
</script>

<style scoped>
nav {
  background-image: url("../../public/images/dropDownMenu.svg");
  backdrop-filter: blur(10px);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 0px 5% 5% 0px;
  z-index: 9999;

  &::before {
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

  & > * {
    position: relative;
    z-index: 2;
  }
}

.toggle {
  z-index: 99999;
}

/* BEGIN TRANSITIONS */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-enter-to,
.slide-leave {
  transform: translateX(0);
  opacity: 1;
}
/* END TRANSITIONS */
</style>
