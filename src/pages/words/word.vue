<script setup>
import mp3_url from '@/assets/video/keyboard/machine/机械1.mp3'

</script>

<template>
  <div class="bg-info">
    <audio controls :src="mp3_url"></audio>
  </div>
  <router-view></router-view>
</template>

<style scoped lang="scss">

</style>