<template>
  <div
    class="menu-container bg-contentBackground dark:bg-dark-contentBackground p-6 shadow-lg h-[max-content] md:rounded-[28px]"
  >
    <!-- Title of card -->
    <h1 class="text-left font-bold text-xl md:text-2xl mb-5 pl-2 font-poppins">
      {{ title }}
    </h1>

    <!-- Section to specializes-->
    <div
      class="specialty-section bg-background rounded-lg p-4 mb-6 shadow-md border-l-4 border-buttonPrimary"
    >
      <div class="flex flex-col md:flex-row items-center justify-between">
        <div
          class="flex items-center flex-wrap justify-center md:justify-start"
        >
          <h2 class="text-lg md:text-xl font-bold text-textPrimary">
            {{ specialty.title }}
          </h2>
          <Icon name="Star" size="16" class="mx-2 text-buttonPrimary" />
          <span class="text-lg md:text-xl font-bold text-textPrimary">
            {{ specialty.name }}
          </span>
          <Icon name="Star" size="16" class="ml-2 text-buttonPrimary" />
        </div>
        <ImageComponent
          :name="specialty.image"
          size="64 md:80"
          class="rounded mt-4 md:mt-0"
        />
      </div>
      <p class="text-textVariant2 mt-2 text-sm md:text-base">
        {{ specialty.description }}
      </p>
    </div>

    <!-- Section of Items -->
    <div class="menu-items-section grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="item in items"
        :key="item.name"
        class="item border-b-2 border-buttonPrimary pb-4"
      >
        <h3 class="text-base md:text-lg font-bold text-textPrimary">
          {{ item.name }}
        </h3>
        <p class="text-sm md:text-base text-textVariant2">
          {{ item.description }}
        </p>
        <Button
          variant="none"
          class="price-tag bg-buttonSecondary text-dark-background mt-2 py-1 px-3 rounded-full text-sm md:text-base"
        >
          {{ item.price }}
        </Button>
      </div>
    </div>

    <!-- Section to others Items -->
    <div class="other-items-section mt-6">
      <div v-for="category in categories" :key="category.name">
        <h3 class="text-lg md:text-xl font-bold text-textPrimary">
          {{ category.name }}
        </h3>
        <div
          v-for="item in category.items"
          :key="item.name"
          class="flex items-center mt-2"
        >
          <Icon
            :name="item.icon"
            size="16 md:20"
            class="mr-2 text-buttonDanger"
          />
          <p class="text-sm md:text-base text-textVariant2 flex-grow">
            {{ item.description }}
          </p>
          <Button
            variant="none"
            class="price-tag bg-buttonSecondary text-dark-background ml-4 py-1 px-3 rounded-full text-sm md:text-base"
          >
            {{ item.price }}
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from "@/components/atoms/IconByName.vue";
import ImageComponent from "@/components/atoms/ImageByName.vue";
import Button from "@/components/atoms/Button.vue";

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
  padding: 6px 12px;
  font-weight: bold;
  text-align: center;
  transition: all 0.3s;
}

@media (min-width: 768px) {
  .price-tag {
    padding: 8px 16px;
  }
}
</style>
