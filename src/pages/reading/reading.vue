<script setup>
import {ref} from "vue";
import ArticleTab from "@/pages/reading/article-tab.vue";
import BookTab from "@/pages/reading/book-tab.vue";
import MagazineTab from "@/pages/reading/magazine-tab.vue";

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
  <div class="container">
    <el-tabs v-model="active_name" class="demo-tabs">
      <el-tab-pane v-for="tab in tabs" :label="tab.label" :name="tab.label">
        <component :is="tab.component"></component>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped lang="scss">
</style>