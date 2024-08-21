<template>
    <div
      class="menu-container bg-contentBackground p-6 rounded-lg shadow-lg h-[max-content]"
    >
      <!-- Título de la Carta -->
      <h1 class="text-3xl font-bold mb-4 text-textPrimary">{{ title }}</h1>
  
      <!-- Sección de Especialidad -->
      <div
        class="specialty-section bg-background rounded-lg p-4 mb-6 shadow-md border-l-4 border-buttonPrimary"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <h2 class="text-xl font-bold text-textPrimary">
              {{ specialty.title }}
            </h2>
            <Icon name="Star" size="20" class="mx-2 text-buttonPrimary" />
            <span class="text-xl font-bold text-textPrimary">
              {{ specialty.name }}
            </span>
            <Icon name="Star" size="20" class="ml-2 text-buttonPrimary" />
          </div>
          <ImageComponent :name="specialty.image" size="80" class="rounded" />
        </div>
        <p class="text-textVariant2 mt-2">{{ specialty.description }}</p>
      </div>
  
      <!-- Sección de Items -->
      <div class="menu-items-section grid grid-cols-2 gap-6">
        <div
          v-for="item in items"
          :key="item.name"
          class="item border-b-2 border-buttonPrimary pb-4"
        >
          <h3 class="text-lg font-bold text-textPrimary">{{ item.name }}</h3>
          <p class="text-textVariant2">{{ item.description }}</p>
          <Button
            variant="none"
            class="price-tag bg-buttonSecondary text-dark-background mt-2 py-1 px-3 rounded-full"
          >
            {{ item.price }}
          </Button>
        </div>
      </div>
  
      <!-- Sección de Otros Items -->
      <div class="other-items-section mt-6">
        <div v-for="category in categories" :key="category.name">
          <h3 class="text-lg font-bold text-textPrimary">{{ category.name }}</h3>
          <div
            v-for="item in category.items"
            :key="item.name"
            class="flex items-center mt-2"
          >
            <Icon :name="item.icon" size="20" class="mr-2 text-buttonDanger" />
            <p class="text-textVariant2 flex-grow">{{ item.description }}</p>
            <Button
              variant="none"
              class="price-tag bg-buttonSecondary text-dark-background ml-4 py-1 px-3 rounded-full"
            >
              {{ item.price }}
            </Button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { PropType } from 'vue';
  import Icon from "@/components/atoms/IconByName.vue";
  import ImageComponent from "@/components/atoms/ImageByName.vue";
  import Button from "@/components/atoms/Button.vue"; // Assuming you have a Button component
  
  interface Specialty {
    title: string;
    name: string;
    image: string;
    description: string;
  }
  
  interface MenuItem {
    name: string;
    description: string;
    price: string;
  }
  
  interface CategoryItem {
    name: PropertyKey;
    icon: string;
    description: string;
    price: string;
  }
  
  interface Category {
    name: string;
    items: CategoryItem[];
  }
  
  // Props to receive the necessary data
  defineProps<{
    title: string;
    specialty: Specialty;
    items: MenuItem[];
    categories: Category[];
  }>();
  </script>
  
  <style scoped>
  .price-tag {
    background-color: yellow;
    border-radius: 50%;
    padding: 8px 16px;
    font-weight: bold;
    text-align: center;
  }
  </style>
  