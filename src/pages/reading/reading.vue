<script setup>
import {ref} from "vue";
import ArticleTab from "@/pages/reading/article.vue";
import BookTab from "@/pages/reading/book.vue";
import MagazineTab from "@/pages/reading/magazine.vue";

/** tab相关*/
const tabs = ref([
  {
    label: "Article",
    name: "Article",
    component: ArticleTab,
  },
  {
    label: "Book",
    name: "Book",
    component: BookTab,
  },
  {
    label: "Magazine",
    name: "Magazine",
    component: MagazineTab,
  },
]);
let active_name = ref("Article");

</script>

<template>
  <router-view></router-view>
</template>

<style scoped lang="scss">
</style>