<script setup>

import PracticeWordCard from "@/components/word/practice-word-card.vue";
</script>

<template>
  <div class="practice container">
    <div class="word-tab w-100 d-flex justify-content-between align-items-center px-4">
      <div>显示</div>

      <div>
<!--        icon-yanjing_xianshi-->
        <i class="iconfont icon-yanjing_xianshi"></i>
<!--        icon-fanyi-->
        <i class="iconfont icon-fanyi"></i>
        <i class="iconfont icon-laba-xianxing"></i>
        <i class="iconfont icon-31shezhi"></i>
      </div>
    </div>
<!--    记忆单词的卡片-->
    <practice-word-card></practice-word-card>
  </div>
</template>

<style scoped lang="scss">
.practice{

  .word-tab{
    height: 70px;
    background: #f0f2f4;
    color: #209e85;
    border: 1px solid #e2e2e2;
    box-shadow: rgba(0, 0, 0, .08) 0 4px 12px;
    border-radius: 10px;
    font-size: 20px;
    .iconfont{
      padding: 2px;
      margin-left: 20px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 30px;
    }
    .iconfont:hover{
      color: white;
      background: #209e85;
    }
  }
}
</style>