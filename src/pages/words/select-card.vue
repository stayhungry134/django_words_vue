<script setup>
import {reactive} from "vue";
import SelectCardItem from "@/components/select-card-item.vue";

const select_card = reactive({
  'WordList': {
    'title': '快速浏览',
    'info': '通过单词列表的形式快速浏览单词',
  },
  'WordEbbinghaus': {
    'title': '艾宾浩斯抗遗忘',
    'info': '通过艾宾浩斯遗忘曲线来记忆单词',
  },
  'WordReview': {
    'title': '单词回顾',
    'info': '通过回顾单词来巩固记忆',
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