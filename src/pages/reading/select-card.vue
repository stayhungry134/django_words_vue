<script setup>
import { reactive } from "vue";
import SelectCardItem from "@/components/select-card-item.vue";

const select_card = reactive({
  'Article': {
    'title': '短文',
    'info': '扇贝精选短文！',
  },
  'Book': {
    'title': '书籍',
    'info': '快来阅读书籍吧！',
  },
  'Magazine': {
    'title': '杂志',
    'info': '国际知名杂志，精彩不错过！',
  }
})
</script>

<template>
  <!--  选项卡列表-->
  <div class="select-cards d-flex justify-content-around flex-wrap">
    <select-card-item v-for="(card, key) in select_card"
                     :key="key"
                     :card="card" @click="$router.push({ name: key })"></select-card-item>
  </div>
</template>

<style scoped lang="scss">

</style>