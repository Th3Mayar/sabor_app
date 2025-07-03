<template>
  <MenuCard
    title="Carta"
    :specialty="specialtyData"
    :items="itemsData"
    :categories="categoriesData"
  />
</template>

<script setup lang="ts">
import MenuCard from "@/components/template/LetterItem.vue";

const specialtyData = {
  title: "NUESTRA ESPECIALIDAD",
  name: "DORISAK",
  image: "saborApp2",
  description:
    "Porciones de variedad de alimentos cocinados y servidos sobre una bandeja en divisiones",
};

const itemsData = [
  {
    name: "DORISAK ESPECIAL",
    description: "Arroz blanco, donkasu, chapche, bulgogui, kimbab, keranmari",
    price: "S/. 24.00",
  },
  {
    name: "DORISAK SAMYUPSAL",
    description: "Arroz blanco, donkasu, chapche, bulgogui, kimbab, keranmari",
    price: "S/. 19.00",
  },
  {
    name: "DORISAK SAMYUPSAL",
    description: "Arroz blanco, donkasu, chapche, bulgogui, kimbab, keranmari",
    price: "S/. 19.00",
  },
  {
    name: "DORISAK SAMYUPSAL",
    description: "Arroz blanco, donkasu, chapche, bulgogui, kimbab, keranmari",
    price: "S/. 19.00",
  },
];

const categoriesData = [
  {
    name: "PARA PICAR",
    items: [
      {
        name: "Item 1",
        icon: "Fire",
        description: "Kimbab, keranmari, camote frito, pollo dulce y ensalada",
        price: "S/. 14.00",
      },
    ],
  },
  {
    name: "BEBIDAS",
    items: [
      {
        name: "Item 2",
        icon: "Fire",
        description: "Kimbab, keranmari, camote frito, pollo dulce y ensalada",
        price: "S/. 14.00",
      },
    ],
  },
];

definePageMeta({
  // middleware: "auth",
});
</script>
