<script setup>
import {defineProps, ref, watch} from 'vue'
const props = defineProps({
  article: Object,
})
</script>

<template>
  <div class="article-item">
    <div class="article-item-info d-flex">
      <div class="article-item-img flex-lg-shrink-0">
        <img :src="article.image" alt="">
      </div>
      <div class="article-item-title">
        <div class="title_en">{{ article.title_en }}</div>
        <div class="title_cn">{{ article.title_cn }}</div>

      </div>
    </div>
    <div class="article-item-other d-flex justify-content-between px-3">
      <div>
        创建日期：{{ article.create_time.slice(0, 10) }}
      </div>
      <div>
        单词数：{{ article.length }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.article-item{
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,.2);

  &-info{
    display: flex;
    align-items: center;
  }

  &-img{
    width: 100px;
    height: 100px;
    padding: 10px;
    img{
      width: 100%;
      height: 100%;
      border-radius: 10px;
      object-fit: cover;
    }
  }

  &-title{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100px;
    .title_en{
      font-weight: bold;
    }
    .title_cn{
      font-size: 14px;
      color: #999;
    }
  }
  &-other{
    color: #999;
    font-size: 14px;
  }
}
</style>