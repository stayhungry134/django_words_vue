<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  card: {
    type: Object,
    required: true
  }
})

</script>

<template>
  <div class="select-card mt-5 mx-5">
    <div class="header all-center h2">{{ card.title }}</div>
    <div class="info all-center">{{ card.info }}</div>
  </div>
</template>

<style scoped lang="scss">
.select-card{
  width: 350px;
  height: 240px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: #ccc 2px 2px 8px;
  .header{
    height: 40%;
    background: white;
  }
  .info{
    height: 60%;
    background: #f0f0f0;
  }
}
.select-card:hover{
  cursor: pointer;
  box-shadow: #aaa 2px 2px 8px;
}
</style>